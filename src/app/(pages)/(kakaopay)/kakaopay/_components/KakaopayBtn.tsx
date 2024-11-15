"use client";

import { useAuth } from "@/store/AuthContext";
import { PaymentButtonProps } from "@/types/payment.types";

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
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();

      if (!data.next_redirect_pc_url) {
        throw new Error("No redirect URL found in response");
      }
      window.location.href = data.next_redirect_pc_url;
    } catch (error) {
      console.error("Payment error:", error);
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
