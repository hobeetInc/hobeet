"use client";

import Link from "next/link";
import { VerticalContentsListMediumEggPop } from "@/components/ui/organisms/lists/VerticalContentsListMedium";
import { useEggPopTenList } from "@/hooks/utils/list/tenList";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { BigVerticalContentsEggPopList } from "@/components/ui/organisms/lists/BigVerticalContentsList";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";

const OneTimeClubList = () => {
  const { data: list, isLoading, isError } = useEggPopTenList();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

  const displayedList = isLargeScreen ? list?.slice(0, 4) : list;

  return (
    <div className={`relative mx-auto px-5 ${isLargeScreen ? "mt-5" : ""}`}>
      <div className={`${isLargeScreen ? "w-[984px] h-[383px]" : "overflow-x-auto scrollbar-hide h-[330px]"}`}>
        <div className={`${isLargeScreen ? "w-full h-full flex gap-6" : "inline-flex items-center  px-4 pt-4"}`}>
          {displayedList?.map((club) => (
            <Link
              href={`/club/one-time-club-sub/${club.egg_pop_id}`}
              key={club.egg_pop_id}
              className={`${isLargeScreen ? "" : "mr-4 w-[160px] h-[311px]"}`}
            >
              {isLargeScreen ? (
                <BigVerticalContentsEggPopList
                  eggPop={club}
                  hostName={club.user.user_name}
                  hostImage={club.user.user_profile_img}
                  memberCount={club.egg_pop_member[0].count}
                />
              ) : (
                <VerticalContentsListMediumEggPop
                  eggPop={club}
                  hostName={club.user.user_name}
                  hostImage={club.user.user_profile_img}
                  memberCount={club.egg_pop_member[0].count}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OneTimeClubList;
