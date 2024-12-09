"use client";

import { useQuery } from "@tanstack/react-query";
import { getPopularClubs } from "../_api/supabase";
import Link from "next/link";
import Text from "@/components/ui/atoms/text/Text";
import { HorizontalContentsListLargeEggClubImage88Size } from "@/components/ui/organisms/lists/HorizontalContentsListLarge";

const OverallPopularMeetings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["popularClubs"],
    queryFn: getPopularClubs
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-start mb-[46px]">
      {data?.map((club, index) => (
        <div key={club.egg_club_id} className="h-[90px] mb-4 flex items-center">
          <Text variant="header-32" className="w-[37px] mr-2">
            {index + 1}
          </Text>
          <Link href={`/club/regular-club-sub/${club.egg_club_id}`} className="h-[90px] flex items-center gap-[8px]">
            <HorizontalContentsListLargeEggClubImage88Size eggClub={club} />
          </Link>
        </div>
      ))}
    </div>
  );
};
export default OverallPopularMeetings;
