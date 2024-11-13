import browserClient from "@/utils/supabase/client";

const supabase = browserClient;

export async function POST(req: Request) {
  try {
    const { orderId, requestUserId, clubType, clubId } = await req.json();

    let amount = 0;
    let itemName = "";
    // console.log("야야야 장성현");

    if (clubType === true) {
      const { data: onePayData, error: onePayError } = await supabase
        .from("egg_pop")
        .select("egg_pop_name, egg_pop_tax")
        .eq("egg_pop_id", clubId)
        .single();

      if (onePayError || !onePayData) {
        console.error("Supabase error:", onePayError);
        throw new Error("해당 에그팝 모임을 불러오는 중 오류가 발생했습니다.");
      }

      amount = onePayData.egg_pop_tax;
      itemName = onePayData.egg_pop_name;
    } else if (clubType === false) {
      const { data: regularPayData, error: regularPayError } = await supabase
        .from("egg_day")
        .select("egg_day_name, egg_day_tax")
        .eq("egg_day_id", clubId)
        .single();

      if (regularPayError || !regularPayData) {
        console.error("Supabase error:", regularPayError);
        throw new Error("해당 에그데이 모임을 불러오는 중 오류가 발생했습니다.");
      }

      amount = regularPayData.egg_day_tax;
      itemName = regularPayData.egg_day_name;
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
        approval_url: `http://localhost:3000/kakaopay/isSuccess?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}`,
        // approval_url: `https://www.eggfriends.site/kakaopay/isSuccess?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}`,
        cancel_url: "http://localhost:3000/",
        // cancel_url: "https://www.eggfriends.site/",
        fail_url: "http://localhost:3000/"
        // fail_url: "https://www.eggfriends.site/"
      })
    });

    if (!response.ok) {
      // if (!response.ok) {
      const errorData = await response.json();
      console.error(`Payment failed with status: ${response.status}`, errorData);
      throw new Error(`Payment failed with status: ${response.status}`);
    }
    // console.log("야야야 장성현!!!!! 야야야야!!");

    const paymentData = await response.json();
    const tid = paymentData.tid;

    if (clubType === true) {
      const { error } = await supabase.from("egg_pop_kakaopay").insert({
        egg_pop_id: clubId,
        user_id: requestUserId,
        egg_pop_kakaopay_cid: "TC0ONETIME",
        egg_pop_kakaopay_tid: tid
      });
      // 입장 시키는중@@@

      if (error) {
        console.error("에그팝 결제 테이블에 정보 추가 실패:", error);
        throw new Error("egg_pop_kakaopay 테이블에 데이터를 저장하는 중 오류가 발생했습니다.");
      }
    } else if (clubType === false) {
      const { data: rcIdData, error: rcIdError } = await supabase
        .from("egg_day")
        .select("egg_club_id")
        .eq("egg_day_id", clubId)
        .single();

      if (rcIdError) {
        console.error("@@@@@@나오냐이거");
      }

      const { data: rcmIdData, error: rcmError } = await supabase
        .from("egg_club_member")
        .select("egg_club_member_id")
        .eq("egg_club_id", rcIdData.egg_club_id)
        .eq("user_id", requestUserId)
        .single();

      if (rcmError) {
        console.error("egg_club_member_id fetch error:", rcmError);
        throw new Error("egg_club_member 테이블에서 egg_club_member_id를 가져오는 중 오류가 발생했습니다.");
      }

      const { error } = await supabase.from("egg_day_kakaopay").insert({
        egg_club_member_id: rcmIdData.egg_club_member_id,
        // r_c_notification_id: clubId,
        egg_club_id: rcIdData.egg_club_id,
        egg_day_id: clubId,
        user_id: requestUserId,
        egg_day_kakaopay_cid: "TC0ONETIME",
        egg_day_kakaopay_tid: tid
      });

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error("egg_day_kakaopay 테이블에 데이터를 저장하는 중 오류가 발생했습니다.");
      }
    }

    return new Response(JSON.stringify(paymentData), { status: 200 });
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: "Payment failed" }), { status: 500 });
  }
}
