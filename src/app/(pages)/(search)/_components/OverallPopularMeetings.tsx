"use client";

import { useQuery } from "@tanstack/react-query";
import { getPopularClubs } from "../_api/supabase";
import Link from "next/link";
import Text from "@/components/ui/atoms/text/Text";
import { HorizontalContentsListLargeEggClubImage88Size } from "@/components/ui/organisms/lists/HorizontalContentsListLarge";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { HorizontalContentsEggClubList } from "@/components/ui/organisms/lists/BigHorizontalContentsList";

const OverallPopularMeetings = () => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { data, isLoading } = useQuery({
    queryKey: ["popularClubs"],
    queryFn: getPopularClubs
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={`flex mb-[46px] ${isLargeScreen ? "flex-wrap w-full h-[784px] mt-8" : "flex-col items-start"}`}>
      {data?.map((club, index) => (
        <div
          key={club.egg_club_id}
          className={`h-[90px] mb-4 flex items-center ${isLargeScreen ? "w-[480px] h-[144px]" : ""}`}
        >
          <Text variant="header-32" className="w-[37px] mr-2">
            {index + 1}
          </Text>
          <Link href={`/club/regular-club-sub/${club.egg_club_id}`} className="h-[90px] flex items-center gap-[8px]">
            {isLargeScreen ? (
              <HorizontalContentsEggClubList
                eggClub={club}
                hostName={club.user_id.user_name}
                hostImage={club.user_id.user_profile_img}
                memberCount={club.count}
                wishListCount={club.wish_list.length}
              />
            ) : (
              <HorizontalContentsListLargeEggClubImage88Size eggClub={club} />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default OverallPopularMeetings;
