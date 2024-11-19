"use client";

import Text from "@/components/uiComponents/TextComponents/Text";
import { useAuth } from "@/store/AuthContext";
interface PaymentButtonProps {
  clubType: boolean;
  clubId: number;
  agreeChecked: boolean;
}

const PaymentButton = ({ clubType, clubId, agreeChecked }: PaymentButtonProps) => {
  const { userId } = useAuth();

  const onClickKakaopayBtn = async () => {
    if (!agreeChecked) {
      alert("주문 내용을 확인하고 결제에 동의해주세요.");
      return;
    }

    try {
      // 결제 요청에 필요한 데이터 준비
      const orderId = `${clubId}`;
      const requestUserId = `${userId}`;

      // 결제 요청 API 호출
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          requestUserId,
          clubType,
          clubId
        })
      });

      // 응답 에러 체크
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "결제 요청에 실패했습니다");
      }

      // 카카오페이 결제 페이지 URL 추출
      const data = await response.json();
      if (!data.next_redirect_pc_url) {
        throw new Error("결제 페이지 URL을 받아오지 못했습니다");
      }

      // 카카오페이 결제 페이지로 리다이렉트
      window.location.href = data.next_redirect_pc_url;
    } catch (error) {
      console.error("결제 중 오류가 발생했습니다.:", error);
      alert("결제 중 오류가 발생했습니다.");
    }
  };

  return (
    <button onClick={onClickKakaopayBtn} className="text-gray-900 text-base font-semibold leading-snug w-[358px]">
      <Text variant="subtitle-16">결제하기</Text>
    </button>
  );
};

export default PaymentButton;
