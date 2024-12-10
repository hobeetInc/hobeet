"use client";

import Link from "next/link";
import { VerticalContentsListMediumEggClub } from "@/components/ui/organisms/lists/VerticalContentsListMedium";
import { useAuthStore } from "@/store/authStore";
import { useEggClubTenList } from "@/hooks/utils/list/tenList";
import Text from "@/components/ui/atoms/text/Text";
import { EggClubForm } from "@/types/features/commerce/cardlist.types";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { BigVerticalContentsEggClubList } from "@/components/ui/organisms/lists/BigVerticalContentsList";

const RegularClubList = () => {
  const { data: list, isLoading, error } = useEggClubTenList();
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const isWishedByUser = (club: EggClubForm): boolean => {
    if (!userId) return false;
    return club.wish_list?.some((wish) => wish.user_id === userId) || false;
  };

  if (isLoading) {
    return <Text variant="subtitle-16">로딩 중...</Text>;
  }

  if (error) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

  const displayedList = isLargeScreen ? list?.slice(0, 4) : list;

  return (
    <div className={`relative mx-auto ${isLargeScreen ? "px-4" : ""}`}>
      <div className={`${isLargeScreen ? "w-[984px] h-[364px]" : "overflow-x-auto scrollbar-hide h-[320px]"}`}>
        <div
          className={`${
            isLargeScreen ? "flex justify-between items-start gap-6 mt-5" : "inline-flex items-center px-4 pt-4"
          }`}
        >
          {displayedList?.map((club) => (
            <Link
              href={`/club/regular-club-sub/${club.egg_club_id}`}
              key={club.egg_club_id}
              className={`${isLargeScreen ? "w-[228px] h-[364px]" : "w-[160px] h-[292px] mr-4"}`}
            >
              {isLargeScreen ? (
                <BigVerticalContentsEggClubList
                  eggClub={club}
                  hostName={club.user.user_name}
                  hostImage={club.user.user_profile_img}
                  memberCount={club.egg_club_member[0].count}
                  isWished={isWishedByUser(club)}
                  wishListCount={club.wish_list.length}
                />
              ) : (
                <VerticalContentsListMediumEggClub
                  eggClub={club}
                  hostName={club.user.user_name}
                  hostImage={club.user.user_profile_img}
                  memberCount={club.egg_club_member[0].count}
                  isWished={isWishedByUser(club)}
                  wishListCount={club.wish_list.length}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegularClubList;
