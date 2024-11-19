"use client";

import Link from "next/link";
import { EggClubForm } from "@/types/cardlist.types";
import { VerticalContentsListMediumEggClub } from "@/components/uiComponents/VerticalContentsListMedium";
import { useAuthStore } from "@/store/authStore";
import { useEggClubTenList } from "@/hooks/utils/list/tenList";
import Text from "@/components/uiComponents/TextComponents/Text";

const RegularClubList = () => {
  const { data: list, isLoading, error } = useEggClubTenList();

  const userId = useAuthStore((state) => state.userId);

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

  return (
    <div className="relative mx-auto">
      <div className="overflow-x-auto scrollbar-hide h-[320px]">
        <div className="inline-flex items-center px-4 pt-4">
          {list?.map((club) => (
            <Link
              href={`/club/regular-club-sub/${club.egg_club_id}`}
              key={club.egg_club_id}
              className="w-[160px] h-[292px] mr-4"
            >
              <VerticalContentsListMediumEggClub
                eggClub={club}
                hostName={club.user.user_name}
                hostImage={club.user.user_profile_img}
                memberCount={club.egg_club_member[0].count}
                isWished={isWishedByUser(club)}
                wishListCount={club.wish_list.length}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegularClubList;
