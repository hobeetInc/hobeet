import { useEffect, useState } from "react";
import { RegularClub, User } from "@/types/clubcardlist/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface RegularClubCardProps {
  club: RegularClub;
}

export const RegularClubCard = ({ club }: RegularClubCardProps) => {
  const [creator, setCreator] = useState<User | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0);

  useEffect(() => {
    fetchCreator();
    fetchMemberCount();
  }, []);

  const fetchCreator = async () => {
    const { data } = await supabase
      .from("user")
      .select("user_id, user_name, user_profile_img")
      .eq("user_id", club.user_id)
      .single();

    setCreator(data);
  };

  const fetchMemberCount = async () => {
    const { data } = await supabase
      .from("r_c_member")
      .select("*", { count: "exact" })
      .eq("r_c_id", club.regular_club_id)
      .eq("regular_club_request_status", "active");

    setMemberCount(data?.length || 0);
  };

  return (
    <div className="flex items-start p-4 border rounded-lg shadow-sm">
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        <img src={club.regular_club_image} alt={club.regular_club_name} className="w-full h-full object-cover" />
      </div>

      <div className="ml-4 flex-1">
        <div className="text-sm text-gray-500">에그클럽</div>
        <h3 className="text-lg font-semibold mt-1">{club.regular_club_name}</h3>
        <div className="text-sm text-gray-600 mt-1">
          {creator?.user_name} • {memberCount} / {club.regular_club_people_limited}명
        </div>
      </div>
    </div>
  );
};
