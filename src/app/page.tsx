"use client";
import Image from "next/image";
import CategorySlider from "@/components/CategorySlider";
import OneTimeClubList from "@/components/OneTimeClubList";
import RegularClubList from "@/components/RegularClubList";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <div className="w-[358px] h-[295px] flex-shrink-0 rounded-[18px] bg-[#d9d9d9] overflow-hidden mt-[22px]">
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
        <p className="text-[18px] not-italic	font-semibold leading-[24.3px] mt-[34px] ml-[16px] font-pretendard">
          이런 모임 어때요?
        </p>
      </div>
      <CategorySlider />
      <div className="flex w-[358px] h-[24px] items-center gap-[8px] mt-[44px] ml-[16px]">
        <div className="flex w-[326px] h-[24px] flex-col items-start">
          <p className="text-[18px] font-semibold leading-[24.3px]  font-pretendard">에그팝 신규 리스트</p>
        </div>
        <div className="w-[24px] h-[24px] flex items-center">
          <img className="w-[24px] h-[24px]" src="/asset/Icon/Arrow-Right-Outline.png" alt="eggpop_new_list" />
        </div>
      </div>
      <OneTimeClubList />
      <div className="relative flex flex-shrink-0 ml-[16px] mr-[16px] mt-[64px]">
        <img className="w-[358px] h-[173px]" src="/asset/Rectangle 20.png" alt="Rectangle 20" />
        <p className="absolute inset-0 flex justify-start mt-[85px] ml-[14px] leading-[24.3px] text-white not-italic	 font-bold text-[18px]">
          Night Run🏃🏻‍♂️‍
        </p>
        <p className="w-[182px] absolute inset-0 flex justify-start mt-[113px] ml-[14px] leading-[20.3px] text-white not-italic font-medium	text-[16px] font-pretendard">
          쌀쌀한 가을
          <br />
          한강 밤러닝 함께 달리러 가요
        </p>
      </div>
      <div className="flex w-[358px] h-[24px] items-center gap-[8px] mt-[64px] ml-[16px]">
        <div className="flex w-[326px] h-[24px] flex-col items-start ">
          <p className="text-[18px] font-semibold leading-[135%] font-pretendard">에그클럽 신규 리스트</p>
        </div>
        <div className="w-[24px] h-[24px] flex items-center">
          <img className="w-[24px] h-[24px]" src="/asset/Icon/Arrow-Right-Outline.png" alt="eggpop_new_list" />
        </div>
      </div>
      <RegularClubList />

      <div className="relative flex flex-shrink-0 ml-[16px] mr-[16px] mt-[64px]">
        <img className="w-[358px] h-[226px]" src="/asset/Frame 2307.png" alt="Frame 2307" />
      </div>
      <p className="text-[#0d0d0d] font-pretendard text-[18px] font-semibold leading-[24.3px] mt-[20px] mx-4">
        가을 감성 충전! 지금 가기 좋은 여행지 5곳 🍂
      </p>
      <p className="w-max-[358px] justify-start mt-[8px] mx-[16px] leading-[20.3px] text-[#0d0d0d] not-italic font-[400px] text-ellipsis text-[14px] font-pretendard">
        조금 쌀쌀해진 날씨를 따라 울긋불긋하게 물든 단풍구경을 떠나보는 건 어때요? 가을에 가볼만한 곳들을 소개할게요!
      </p>
    </div>
  );
}
