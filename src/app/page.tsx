"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  NOTIFICATION_CREATE,
  ONETIME_CLUB_CREATE,
  REGULAR_CLUB_CREATE
} from "./(pages)/(club)/club/_utils/localStorage";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Text from "@/components/ui/atoms/text/Text";

import OneTimeClubList from "./_components/OneTimeClubList";
import RegularClubList from "./_components/RegularClubList";
import CategorySlider from "./_components/CategorySlider";
import useScreenSizeStore from "@/store/useScreenSizeStore";

export default function Home() {
  const router = useRouter();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  useEffect(() => {
    localStorage.removeItem(ONETIME_CLUB_CREATE);
    localStorage.removeItem(REGULAR_CLUB_CREATE);
    localStorage.removeItem(NOTIFICATION_CREATE);

    localStorage.removeItem("justCreated");
    localStorage.removeItem("fromKakaoPay");
  }, []);

  return (
    <div className="w-full ">
      <div className="flex mx-4 justify-center items-center mt-2">
        <div className="relative w-full max-w-[984px] flex-shrink-0 rounded-[12px] bg-[#d9d9d9] overflow-hidden">
          <Image
            src={"/asset/Banner/banner1.svg"}
            alt="MainBigBanner"
            width={984}
            height={436}
            className="w-full h-auto object-cover"
            priority
            loading="eager"
            fetchPriority="high"
            sizes="984px"
          />
          <Text
            variant="subtitle-18"
            className="absolute inset-0 flex justify-start items-center mt-[40px] ml-[14px] mb-9"
          >
            Christmas with Cat 🐈
          </Text>
          <Text
            variant="body-16"
            className="absolute inset-0 flex justify-start items-center mt-[113px] ml-[14px] mb-8"
          >
            크리스마스에 고양이 집사들 모여요!
            <br />
            함께 캣 카페에서 모임 가질까요?
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-start gap-[8px]">
        <Text variant="subtitle-18" className="mt-[32px] ml-[16px]">
          이런 모임 어때요?
        </Text>
      </div>
      <CategorySlider />
      <div className="flex justify-between items-center mt-9 mx-4">
        <Text variant="subtitle-18">따끈따끈 에그팝</Text>
        <div className="w-[24px] h-[24px] flex items-center" onClick={() => router.push("/club/list/onetime")}>
          <MdOutlineKeyboardArrowRight className="w-6 h-6" />
        </div>
      </div>
      <OneTimeClubList />
      <div className="relative flex justify-center mx-4 mt-16">
        <div className="relative w-full max-w-[984px] mx-auto">
          <Image
            width={984}
            height={473}
            src="/asset/Banner/banner2.svg"
            alt="Rectangle 20"
            className="w-full h-auto object-cover rounded-[12px]"
          />
          <Text
            variant="subtitle-18"
            className="absolute inset-0 flex justify-start items-center mt-[40px] ml-[14px] mb-9 text-white"
          >
            Winter Camping🏕️
          </Text>
          <Text
            variant="body-16"
            className="absolute inset-0 flex justify-start items-center mt-[113px] ml-[14px] mb-8 text-white"
          >
            추운 겨울이 오고 있어요
            <br />
            함께 캠핑을 떠나보는 건 어때요?
          </Text>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 mt-16 mx-4">
        <Text variant="subtitle-18">프레쉬 에그클럽</Text>
        <div className="flex w-[24px] h-[24px]  flex-col items-start" onClick={() => router.push("/club/list/regular")}>
          <MdOutlineKeyboardArrowRight className="w-6 h-6" />
        </div>
      </div>
      <RegularClubList />

      <div className="flex mx-4 justify-center items-center">
        <div className="w-full max-w-[984px] justify-center flex flex-shrink-0  overflow-hidden mt-[64px] mx-4">
          <Image
            width={984}
            height={620}
            src="/asset/Banner/banner3.svg"
            alt="Frame 2307"
            className="object-cover w-full rounded-[12px]"
          />
        </div>
      </div>

      <div className="w-full">
        <Text variant="subtitle-18" className="mt-[20px] mx-4">
          겨울이 왔다! 인기 스키장 추천 TOP 5 ⛷️
        </Text>
      </div>
      <Text variant="body-14" className="mt-[8px] mx-4 mb-7  text-ellipsis">
        하얀 설원에서 즐기는 짜릿한 겨울 스포츠! 올해는 어떤 스키장에서 추억을 만들어볼까요? 강력 추천 스키장을
        소개할게요!
      </Text>
    </div>
  );
}
