"use client";

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
      const orderId = `${clubId}`;
      const requestUserId = `${userId}`;

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "결제 요청에 실패했습니다");
      }

      const data = await response.json();

      if (!data.next_redirect_pc_url) {
        throw new Error("결제 페이지 URL을 받아오지 못했습니다");
      }

      window.location.href = data.next_redirect_pc_url;
    } catch (error) {
      console.error("결제 중 오류가 발생했습니다.:", error);
      alert("결제 중 오류가 발생했습니다.");
    }
  };

  return (
    <button onClick={onClickKakaopayBtn} className="text-white text-base font-semibold leading-snug w-[358px]">
      결제하기
    </button>
  );
};

export default PaymentButton;
