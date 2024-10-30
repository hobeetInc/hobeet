"use client";

import { useAuth } from "@/app/store/AuthContext";
import { useState } from "react";

interface PaymentButtonProps {
  clubType: boolean;
  clubId: number;
}

const PaymentButton = ({ clubType, clubId }: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  const onClickKakaopayBtn = async () => {
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
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
    >
      {isLoading ? "처리중..." : "카카오페이로 결제하기"}
    </button>
  );
};

export default PaymentButton;
