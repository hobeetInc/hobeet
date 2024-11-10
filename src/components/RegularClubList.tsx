"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getRegularClubList } from "@/app/(pages)/(club)/club/_api/supabase";

import { useAuth } from "@/app/store/AuthContext";
import { EggClubForm } from "@/types/cardlist.types";
import { VerticalContentsListMediumEggClub } from "./uiComponents/VerticalContentsListMedium";

const RegularClubList = () => {
  const {
    data: list,
    isLoading,
    error
  } = useQuery({
    queryKey: ["regularClubs"],
    queryFn: getRegularClubList
  });

  const { userId } = useAuth();
  // console.log(userId);
  // console.log(list);

  const isWishedByUser = (club: EggClubForm): boolean => {
    if (!userId) return false;
    return club.wish_list?.some((wish) => wish.user_id === userId) || false;
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

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
                hostName={club.user_id.user_name}
                hostImage={club.user_id.user_profile_img}
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
