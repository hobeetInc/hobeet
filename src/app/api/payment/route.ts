import browserClient from "@/utils/supabase/client";

const supabase = browserClient;

export async function POST(req: Request) {
  try {
    const { orderId, requestUserId, clubType, clubId } = await req.json();

    let amount, itemName;

    if (clubType === true) {
      const { data: onePayData, error: onePayError } = await supabase
        .from("one_time_club")
        .select("one_time_club_name, one_time_tax")
        .eq("one_time_club_id", clubId)
        .single();

      if (onePayError || !onePayData) {
        console.error("Supabase error:", onePayError);
        throw new Error("해당 에그팝 모임을 불러오는 중 오류가 발생했습니다.");
      }

      amount = onePayData.one_time_tax;
      itemName = onePayData.one_time_club_name;
    } else if (clubType === false) {
      const { data: regularPayData, error: regularPayError } = await supabase
        .from("r_c_notification")
        .select("r_c_notification_name, r_c_notification_tax")
        .eq("r_c_notification_id", clubId)
        .single();

      if (regularPayError || !regularPayData) {
        console.error("Supabase error:", regularPayError);
        throw new Error("해당 에그데이 모임을 불러오는 중 오류가 발생했습니다.");
      }

      amount = regularPayData.r_c_notification_tax;
      itemName = regularPayData.r_c_notification_name;
    } else {
      throw new Error("모임 유형을 찾을 수 없습니다.");
    }

    const response = await fetch("https://open-api.kakaopay.com/online/v1/payment/ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `SECRET_KEY ${process.env.KAKAO_SECRET_KEY}`
      },
      body: JSON.stringify({
        cid: "TC0ONETIME",
        partner_order_id: orderId,
        partner_user_id: requestUserId,
        item_name: itemName,
        quantity: 1,
        total_amount: amount,
        tax_free_amount: 0,
        approval_url: `https://hobeet.vercel.app/kakaopay/success?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}`,
        cancel_url: "https://hobeet.vercel.app/",
        fail_url: "https://hobeet.vercel.app/"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Payment failed with status: ${response.status}`, errorData);
      throw new Error(`Payment failed with status: ${response.status}`);
    }

    const paymentData = await response.json();
    const tid = paymentData.tid;

    if (clubType === true) {
      const { error } = await supabase.from("o_t_c_kakaopay").insert({
        o_t_c_id: clubId,
        user_id: requestUserId,
        o_t_c_kakaopay_cid: "TC0ONETIME",
        o_t_c_kakaopay_tid: tid
      });

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error("one_time_club_kakaopay 테이블에 데이터를 저장하는 중 오류가 발생했습니다.");
      }
    } else if (clubType === false) {
      const { data: rcmId, error: rcmError } = await supabase
        .from("r_c_member")
        .select("r_c_member_id")
        .eq("r_c_id", clubId)
        .eq("user_id", requestUserId)
        .single();

      if (rcmError) {
        console.error("r_c_member_id fetch error:", rcmError);
        throw new Error("r_c_member 테이블에서 r_c_member_id를 가져오는 중 오류가 발생했습니다.");
      }

      const { error } = await supabase.from("r_c_notification_kakaopay").insert({
        r_c_member_id: rcmId,
        r_c_id: clubId,
        user_id: requestUserId,
        r_c_notification_kakaopay_cid: "TC0ONETIME",
        r_c_notification_kakaopay_tid: tid
      });

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error("regular_club_notification_kakaopay 테이블에 데이터를 저장하는 중 오류가 발생했습니다.");
      }
    }

    return new Response(JSON.stringify(paymentData), { status: 200 });
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: "Payment failed" }), { status: 500 });
  }
}
