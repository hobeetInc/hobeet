import { useEffect, useState } from "react";
import { format } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { OneTimeClub } from "@/types/clubcardlist/types";
import Image from "next/image";

const supabase = createClient();

interface OneTimeClubCardProps {
  club: OneTimeClub;
}

export const OneTimeClubCard = ({ club }: OneTimeClubCardProps) => {
  const [memberCount, setMemberCount] = useState<number>(0);

  useEffect(() => {
    fetchMemberCount();
  }, []);

  const fetchMemberCount = async () => {
    const { count } = await supabase
      .from("o_t_c_member")
      .select("*", { count: "exact" })
      .eq("o_t_c_id", club.one_time_club_id);

    setMemberCount(count || 0);
  };

  const currentLocation = club.one_time_club_location.split(" ").slice(1, 3).join(" ");

  return (
    <div className="flex items-start p-4 border rounded-lg shadow-sm">
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={club.one_time_image}
          alt={club.one_time_club_name}
          width={158}
          height={158}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="text-sm text-gray-500">에그팝</div>
        <h3 className="text-lg font-semibold mt-1">{club.one_time_club_name}</h3>
        <div className="text-sm text-gray-600 mt-1">
          {currentLocation} • {format(new Date(club.one_time_club_date_time), "MM.dd HH:mm")}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {memberCount} / {club.one_time_people_limited}명
        </div>
      </div>
    </div>
  );
};
