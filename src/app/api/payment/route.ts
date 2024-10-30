// import browserClient from "@/utils/supabase/client";
// const supabase = browserClient;

export async function POST(req: Request) {
  try {
    const { amount, itemName, orderId, userId } = await req.json();

    const response = await fetch("https://open-api.kakaopay.com/online/v1/payment/ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `SECRET_KEY ${process.env.KAKAO_SECRET_KEY}`
      },
      body: JSON.stringify({
        cid: "TC0ONETIME",
        partner_order_id: orderId,
        partner_user_id: userId,
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
    console.log(paymentData);

    return Response.json(paymentData);
  } catch (error) {
    console.error("Payment error:", error);
    return Response.json({ error: "Payment failed" }, { status: 500 });
  }
}
