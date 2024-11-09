"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ONETIME_CLUB_CREATE, REGULAR_CLUB_CREATE } from "./_utils/localStorage";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/uiComponents/button";
import Text from "@/components/uiComponents/text";

const TypeSelectionPage = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"one-time" | "regular-time" | null>(null);

  const handleBack = () => {
    localStorage.removeItem(ONETIME_CLUB_CREATE);
    localStorage.removeItem(REGULAR_CLUB_CREATE);
    window.location.replace("/");
  };

  const handleNext = () => {
    if (selectedType === null) {
      alert("모임 타입을 골라주세요");
      return;
    }

    if (selectedType === "one-time") {
      router.push("/club/one-time");
    } else if (selectedType === "regular-time") {
      router.push("/club/regular-time");
    }
  };

  return (
    <div>
      <div className="h-12 mb-10">
        <div onClick={handleBack} className="h-12 w-12 p-3 justify-start items-center inline-flex hover:cursor-pointer">
          <IoIosArrowBack className="w-6 h-6" />
        </div>
      </div>

      <div className="mx-4">
        <h1 className="text-header-18 mb-6 h-11">어떤 모임을 만들어볼까요?</h1>

        <div className="flex flex-col gap-6 ">
          <div
            onClick={() => setSelectedType("one-time")}
            className={`h-[104px] p-4 rounded-xl flex-col justify-center items-start gap-2 inline-flex hover:cursor-pointer ${
              selectedType === "one-time"
                ? "bg-primary-500 border-primary-500"
                : "bg-white border border-solid border-[#d9d9d9]"
            }`}
          >
            {/* 튜터님께 물어보기 */}
            <Text
              variant="subtitle-16"
              className={`text-primary-900 ${selectedType === "one-time" ? "text-white" : ""}`}
            >
              에그팝
            </Text>

            {/* <span className={`text-primary-900 text-subtitle-16 ${selectedType === "one-time" ? "text-white" : ""}`}>
              에그팝
            </span> */}
            <span className={`text-primary-900 text-body-14 ${selectedType === "one-time" ? "text-white" : ""}`}>
              일회성 모임으로 가볍게 만나요
              <br />
              승인 없이 바로 참여 가능해요
            </span>
          </div>

          <div
            onClick={() => setSelectedType("regular-time")}
            className={`h-[104px] p-4 rounded-xl flex-col justify-center items-start gap-2 inline-flex hover:cursor-pointer ${
              selectedType === "regular-time"
                ? "bg-primary-900 border-primary-900 "
                : "bg-white border border-solid border-[#d9d9d9]"
            }`}
          >
            {/* <Text
      variant="subtitle-16"
      className={`text-primary-900 ${selectedType === "regular-time" ? "text-white" : ""}`}
    >
      에그클럽
    </Text> */}
            <span
              className={`text-primary-900 text-subtitle-16 ${selectedType === "regular-time" ? "text-white" : ""}`}
            >
              에그클럽
            </span>
            <span className={`text-primary-900 text-body-14 ${selectedType === "regular-time" ? "text-white" : ""}`}>
              지속형 모임으로 계속해서 만나요
              <br />
              모임장의 승인이 필요해요
            </span>
          </div>
        </div>

        {selectedType === null ? (
          <Button disabled borderType="circle" className="mt-[308px]">
            다음
          </Button>
        ) : selectedType === "one-time" ? (
          <Button onClick={handleNext} colorType="orange" borderType="circle" className="mt-[308px]">
            다음
          </Button>
        ) : (
          <Button onClick={handleNext} colorType="black" borderType="circle" className="mt-[308px]">
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export default TypeSelectionPage;
