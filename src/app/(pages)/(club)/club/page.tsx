"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ONETIME_CLUB_CREATE, REGULAR_CLUB_CREATE } from "./_utils/localStorage";
import { IoIosArrowBack } from "react-icons/io";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Button } from "@/components/uiComponents/Button/ButtonCom";

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
    <div className="relative flex flex-col justify-center items-center ">
      <div className="w-[390px] h-12 flex justify-start mb-10 ">
        <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex ">
          <IoIosArrowBack className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <div className="mx-4">
        <h1 className="text-header-18 mb-6 h-11">어떤 모임을 만들어볼까요?</h1>

        <div className="flex flex-col gap-6">
          <div
            onClick={() => setSelectedType("one-time")}
            className={`h-[104px] w-[358px] p-4 rounded-xl flex-col justify-center items-start gap-2 inline-flex hover:cursor-pointer ${
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

            <span className={`text-primary-900 text-body-14 ${selectedType === "one-time" ? "text-white" : ""}`}>
              일회성 모임으로 가볍게 만나요
              <br />
              승인 없이 바로 참여 가능해요
            </span>
          </div>

          <div
            onClick={() => setSelectedType("regular-time")}
            className={`h-[104px] w-[358px] p-4 rounded-xl flex-col justify-center items-start gap-2 inline-flex hover:cursor-pointer ${
              selectedType === "regular-time"
                ? "bg-primary-900 border-primary-900 "
                : "bg-white border border-solid border-[#d9d9d9]"
            }`}
          >
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

        <div className="w-full fixed bottom-[50px]">
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
    </div>
  );
};

export default TypeSelectionPage;
