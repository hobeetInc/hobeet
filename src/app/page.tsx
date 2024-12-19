"use client";

import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import {
  NOTIFICATION_CREATE,
  ONETIME_CLUB_CREATE,
  REGULAR_CLUB_CREATE
} from "./(pages)/(club)/club/_utils/localStorage";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Text from "@/components/ui/atoms/text/Text";
import dynamic from "next/dynamic";
import CategorySlider from "./_components/CategorySlider";
import useScreenSizeStore from "@/store/useScreenSizeStore";

import ChristmasBanner from "./_components/banners/ChristmasBanner";
import WinterCampingBanner from "./_components/banners/WinterCampingBanner";
import SkiBanner from "./_components/banners/SkiBanner";
import OneTimeClubSkeleton from "./_components/skeletons/OneTimeClubSkeleton";
import RegularClubSkeleton from "./_components/skeletons/RegularClubSkeleton";
import LoadingSkeleton from "./_components/skeletons/LoadingSkeleton";

const OneTimeClubList = dynamic(() => import("./_components/OneTimeClubList"), {
  loading: () => <OneTimeClubSkeleton />
});

const RegularClubList = dynamic(() => import("./_components/RegularClubList"), {
  loading: () => <RegularClubSkeleton />
});

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
    <div className="w-full">
      <ChristmasBanner isLargeScreen={isLargeScreen} />
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="flex flex-col items-start gap-[8px]">
          <Text variant="subtitle-18" className="mt-[32px] ml-[16px]">
            이런 모임 어때요?
          </Text>
        </div>
        <CategorySlider />
        <div className="flex justify-between items-center mt-9 mx-4">
          <Text variant="subtitle-18">따끈따끈 에그팝</Text>
          <div
            className="w-[24px] h-[24px] flex items-center hover:cursor-pointer"
            onClick={() => router.push("/club/list/onetime")}
          >
            <MdOutlineKeyboardArrowRight className="w-6 h-6" />
          </div>
        </div>
        <OneTimeClubList />
        <WinterCampingBanner isLargeScreen={isLargeScreen} />
        <div className="flex justify-between items-center gap-2 mt-16 mx-4">
          <Text variant="subtitle-18">프레쉬 에그클럽</Text>
          <div
            className="flex w-[24px] h-[24px]  flex-col items-start hover:cursor-pointer"
            onClick={() => router.push("/club/list/regular")}
          >
            <MdOutlineKeyboardArrowRight className="w-6 h-6" />
          </div>
        </div>
        <RegularClubList />

        <SkiBanner isLargeScreen={isLargeScreen} />

        <div className="w-full">
          <Text variant="subtitle-18" className="mt-[20px] mx-4">
            겨울이 왔다! 인기 스키장 추천 TOP 5 ⛷️
          </Text>
        </div>
        <Text variant="body-14" className="mt-[8px] mx-4 mb-7  text-ellipsis">
          하얀 설원에서 즐기는 짜릿한 겨울 스포츠! 올해는 어떤 스키장에서 추억을 만들어볼까요? 강력 추천 스키장을
          소개할게요!
        </Text>
      </Suspense>
    </div>
  );
}
