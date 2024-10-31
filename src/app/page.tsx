"use client";
import Image from "next/image";
import CategorySlider from "@/components/CategorySlider";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <div className="w-[358px] h-[295px] flex-shrink-0 rounded-[18px] bg-[#d9d9d9] overflow-hidden">
          <Image
            src={"/asset/MainBanner.jpg"}
            alt="MainBanner"
            width={358}
            height={295}
            className="rounded-[18px] object-cover"
          />
        </div>
      </div>
      <div className="flex w-[358px] flex-col items-start gap-[8px]">
        <p className="text-[18px] not-italic	font-semibold leading-[135%]">이런 모임 어때요?</p>
      </div>
      <CategorySlider />
    </div>
  );
}
