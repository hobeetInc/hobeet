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
        throw new Error("해당 에그팝 모임을 불러오는 중 오류가 발생했습니다.");
      }

      amount = onePayData.one_time_tax;
      itemName = onePayData.one_time_club_name;
    } else if (clubType === false) {
      const { data: regularPayData, error: regularPayError } = await supabase
        .from("regular_club_notification")
        .select("regular_club_notification_name, regular_club_notification_tax")
        .eq("regular_club_id", clubId)
        .single();

      if (regularPayError || !regularPayData) {
        throw new Error("해당 에그데이 모임을 불러오는 중 오류가 발생했습니다.");
      }

      amount = regularPayData.regular_club_notification_tax;
      itemName = regularPayData.regular_club_notification_name;
    } else {
      throw new Error("클럽 유형을 찾을 수 없습니다.");
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
        approval_url: "http://localhost:3000/kakaopay/success",
        cancel_url: "http://localhost:3000/kakaopay/cancel",
        fail_url: "http://localhost:3000/kakaopay/fail"
      })
    });

    if (!response.ok) {
      throw new Error(`Payment failed with status: ${response.status}`);
    }

    const paymentData = await response.json();

    return new Response(JSON.stringify(paymentData), { status: 200 });
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: "Payment failed" }), { status: 500 });
  }
}
