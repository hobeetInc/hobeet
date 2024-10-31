"use client";

import { useAuth } from "@/app/store/AuthContext";
import { useState } from "react";

export interface PaymentButtonProps {
  clubType: boolean;
  clubId: number;
  agreeChecked: boolean;
}

const PaymentButton = ({ clubType, clubId, agreeChecked }: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  const onClickKakaopayBtn = async () => {
    if (!agreeChecked) {
      alert("주문 내용을 확인하고 결제에 동의해주세요.");
      return;
    }

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={onClickKakaopayBtn}
      disabled={isLoading}
      className="w-full py-3 bg-gray-300 text-gray-700 font-bold rounded-lg mt-5"
    >
      {isLoading ? "처리중..." : "결제하기"}
    </button>
  );
};

export default PaymentButton;
