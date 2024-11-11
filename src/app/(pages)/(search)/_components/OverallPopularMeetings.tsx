"use client";

import { useQuery } from "@tanstack/react-query";
import { getPopularClubs } from "../_api/supabase";
import Link from "next/link";
import Text from "@/components/uiComponents/TextComponents/Text";
import { HorizontalContentsListLargeEggClubImage88Size } from "@/components/uiComponents/HorizontalContentsListLarge";


const OverallPopularMeetings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["popularClubs"],
    queryFn: getPopularClubs
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex px-4 flex-col items-start gap-4">
      {data?.map((club, index) => (
        <div key={index} className="h-[90px] flex items-center gap-[8px] ">
          <Text variant="header-32" className="w-9">{index+1}</Text>
          <Link
            key={club.egg_club_id}
            href={`/club/regular-club-sub/${club.egg_club_id}`}
            className="h-[90px] flex items-center gap-[8px]"
          >
            <HorizontalContentsListLargeEggClubImage88Size eggClub={club} />
          </Link>
        </div>
      ))}
    </div>
  );
};
export default OverallPopularMeetings;
