import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cid, tid } = await req.json();

    const response = await fetch("https://open-api.kakaopay.com/online/v1/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `SECRET_KEY ${process.env.KAKAO_SECRET_KEY}`
      },
      body: JSON.stringify({
        cid,
        tid
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("카카오페이 요청 오류:", errorData);
      return NextResponse.json(
        { error: `카카오페이 요청 실패: ${errorData.error_message || "오류가 발생했습니다."}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("카카오페이 요청 중 오류 발생:", error);
    return NextResponse.json({ error: "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}
