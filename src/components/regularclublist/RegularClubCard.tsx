import { useEffect, useState } from "react";
import { RegularClub, User } from "@/types/clubcardlist/types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const supabase = createClient();

interface RegularClubCardProps {
  club: RegularClub;
}

export const RegularClubCard = ({ club }: RegularClubCardProps) => {
  const [creator, setCreator] = useState<User | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const router = useRouter();

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
      .from("egg_club_member")
      .select("*", { count: "exact" })
      .eq("egg_club_id", club.regular_club_id)
      .eq("egg_club_request_status", "active");

    setMemberCount(data?.length || 0);
  };

  const handleClick = () => {
    router.push(`/club/regular-club-sub/${club.regular_club_id}`);
  };

  return (
    <div onClick={handleClick} className="flex items-start p-4 border rounded-lg shadow-sm cursor-pointer">
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={club.regular_club_image}
          alt={club.regular_club_name}
          width={158}
          height={158}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="text-sm text-gray-500">에그클럽</div>
        <h3 className="text-lg font-semibold mt-1">{club.regular_club_name}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          {creator?.user_profile_img && (
            <Image
              src={creator.user_profile_img}
              alt={creator.user_name}
              width={158}
              height={158}
              className="w-5 h-5 rounded-full mr-2"
            />
          )}
          <span>{creator?.user_name}</span>
          <span className="mx-2">•</span>
          <span>
            {memberCount} / {club.regular_club_people_limited}명
          </span>
        </div>
      </div>
    </div>
  );
};
