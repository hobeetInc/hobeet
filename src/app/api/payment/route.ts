import { getClubPaymentInfo } from "./_service/getClubPaymentInfo";
import { requestKakaoPayment } from "./_service/kakaoPayment";
import { savePaymentInfo } from "./_service/savePaymentInfo";

interface PaymentRequest {
  orderId: string;
  requestUserId: string;
  clubType: boolean;
  clubId: number;
}

export async function POST(req: Request) {
  try {
    const paymentRequest: PaymentRequest = await req.json();
    const { orderId, requestUserId, clubType, clubId } = paymentRequest;

    if (!orderId || !requestUserId || clubType === undefined || !clubId) {
      return Response.json({ error: "필수 파라미터 정보가 누락되었습니다" }, { status: 400 });
    }

    const paymentInfo = await getClubPaymentInfo(clubType, clubId);

    const paymentData = await requestKakaoPayment({
      orderId,
      requestUserId,
      itemName: paymentInfo.itemName,
      amount: paymentInfo.amount,
      clubId,
      clubType
    });

    await savePaymentInfo(clubType, clubId, requestUserId, paymentData.tid);

    return Response.json(paymentData);
  } catch (error) {
    console.error("결제 처리 중 오류가 발생했습니다:", error);

    return Response.json(
      { error: error instanceof Error ? error.message : "결제 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
