"use client";

import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className=" relative bg-white">
      <div className="w-[358px] px-2.5 py-3.5 left-[16px] top-[740px] absolute bg-[#fdb800] rounded-[25px] justify-center items-center gap-2.5 inline-flex">
        <div
          onClick={() => router.push("/")}
          className="text-[#0c0c0c] text-base font-semibold font-['Pretendard'] leading-snug"
        >
          모임 둘러보기
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center mt-[292px] ">
        <div className="flex items-center mb-[20px]">
          <div className="w-[90px] h-[90px] z-10">
            <Icon name="whiteEgg" />
          </div>
          <div className="w-[90px] h-[90px] -ml-2 ">
            <Icon name="yellowEgg" />
          </div>
        </div>

        <div className="w-46 text-center text-[#727272] text-xl font-bold font-['Pretendard'] leading-[27px]">
          두근두근
          <br />첫 모임을 기다리는 중!
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
