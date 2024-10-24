"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TypeSelectionPage = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"one-time" | "regular-time" | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (selectedType === "one-time") {
      router.push("/club/type-selection/create/one-time");
    } else if (selectedType === "regular-time") {
      router.push("/club/type-selection/create/regular-time");
    }
  };

  return (
    <div className="container">
      <div className="h-[48px] bg-pink-100">헤더 공간</div>
      <div className="m-4 flex flex-col gap-7">
        <button onClick={handleBack} className="w-6 h-6 border-black border-2">
          뒤
        </button>
        <h1 className="text-lg font-bold">어떤 모임을 원하시나요?</h1>
        <button
          onClick={() => setSelectedType("one-time")}
          className={`next-box ${selectedType === "one-time" ? "bg-blue-100" : "bg-gray-100"}`}
        >
          <span>반짝모임</span>
          <br />
          <span>일회성 모임으로 가볍게 만나요</span>
          <br />
          <span>승인 없이 바로 참여 가능해요</span>
        </button>
        <button
          onClick={() => setSelectedType("regular-time")}
          className={`next-box mb-56 ${selectedType === "regular-time" ? "bg-blue-100" : "bg-gray-100"}`}
        >
          <span>정기모임</span>
          <br />
          <span>지속적인 모임으로 계속 만나요</span>
          <br />
          <span>모바일 승인이 필요해요</span>
        </button>

        <button onClick={handleNext} className="next-button">
          다음
        </button>
      </div>
    </div>
  );
};

export default TypeSelectionPage;
