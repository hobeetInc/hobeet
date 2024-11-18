interface KakaoPaymentParams {
  orderId: string;
  requestUserId: string;
  itemName: string;
  amount: number;
  clubId: number;
  clubType: boolean;
}

export const requestKakaoPayment = async ({
  orderId,
  requestUserId,
  itemName,
  amount,
  clubId,
  clubType
}: KakaoPaymentParams) => {
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
      approval_url: `${process.env.NEXT_PUBLIC_PROD_URL}/kakaopay/isSuccess?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}`,
      cancel_url: `${process.env.NEXT_PUBLIC_PROD_URL}/`,
      fail_url: `${process.env.NEXT_PUBLIC_PROD_URL}/`
    })
  });

  if (!response.ok) {
    throw new Error(`카카오페이 결제 실패: ${response.status}`);
  }

  return response.json();
};
