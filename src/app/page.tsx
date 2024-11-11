"use client";
import Image from "next/image";
import CategorySlider from "@/components/CategorySlider";
import OneTimeClubList from "@/components/OneTimeClubList";
import RegularClubList from "@/components/RegularClubList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ONETIME_CLUB_CREATE, REGULAR_CLUB_CREATE } from "./(pages)/(club)/club/_utils/localStorage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem(ONETIME_CLUB_CREATE);
    localStorage.removeItem(REGULAR_CLUB_CREATE);
  }, []);

  return (
    
    <div className="w-full ">
      <div className="flex justify-center items-center">
        <div className="flex-shrink-0 rounded-[18px] bg-[#d9d9d9] overflow-hidden mt-[22px]">
          <Image
            src={"/asset/banner.png"}
            alt="MainBanner"
            width={358}
            height={296}
            className="rounded-[18px] object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-[8px]">
        <p className="text-[18px] not-italic	font-semibold leading-[24.3px] mt-[34px] ml-[16px] font-pretendard">
          이런 모임 어때요?
        </p>
      </div>
      <CategorySlider />
      <div className="flex justify-between items-center">
        <div className="text-[18px] font-semibold leading-[135%] font-pretendard">에그팝 신규 리스트</div>
        <div className="w-[24px] h-[24px] flex items-center" onClick={() => router.push("/club/list/onetime")}>
          <Image width={24} height={24} src="/asset/Icon/Arrow-Right-Outline.png" alt="eggpop_new_list" />
        </div>
      </div>
      <OneTimeClubList />
      <div className="relative flex justify-center mx-4 mt-16">
        <div className="relative w-full max-w-[358px]">
          <Image width={358} height={173} src="/asset/Rectangle 20.png" alt="Rectangle 20" className="w-full h-auto" />
          <p className="absolute inset-0 flex justify-start items-center mt-[40px] ml-[14px] leading-[24.3px] text-white not-italic font-bold text-[18px]">
            Night Run🏃🏻‍♂️‍
          </p>
          <p className="absolute inset-0 flex justify-start items-center mt-[113px] ml-[14px] leading-[20.3px] text-white not-italic font-medium text-[16px] font-pretendard">
            쌀쌀한 가을
            <br />
            한강 밤러닝 함께 달리러 가요
          </p>
        </div>
      </div>
      <div className="flex w-full h-[24px] items-center gap-2 mt-16 mx-4">
        <div className="flex w-full h-[24px] flex-col items-start" onClick={() => router.push("/club/list/regular")}>
          <p className="text-[18px] font-semibold leading-[135%] ">에그클럽 신규 리스트</p>
        </div>
      </div>
      <RegularClubList />

      <div className="relative justify-center	 flex flex-shrink-0 px-4  mt-[64px]">
        <Image width={358} height={226} src="/asset/Frame 2307.png" alt="Frame 2307" />
      </div>
      <p className=" text-[#0d0d0d] text-[18px] font-semibold  leading-[24.3px] mt-[20px] mx-4">
        가을 감성 충전! 지금 가기 좋은 여행지 5곳 🍂
      </p>
      <p className="mt-[8px] mx-[16px] leading-[20.3px] text-[#0d0d0d] not-italic font-[400px] text-ellipsis text-[14px] ">
        조금 쌀쌀해진 날씨를 따라 울긋불긋하게 물든 단풍구경을 떠나보는 건 어때요? 가을에 가볼만한 곳들을 소개할게요!
      </p>
    </div>
  );
}
