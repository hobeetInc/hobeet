import { useEffect, useState } from "react";
import { format } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { EggPop } from "@/types/cardlist.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const supabase = createClient();

export const OneTimeClubCard = ({ club }: { club: EggPop }) => {
  const [memberCount, setMemberCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    fetchMemberCount();
  }, []);

  const fetchMemberCount = async () => {
    const { count } = await supabase
      .from("egg_pop_member")
      .select("*", { count: "exact" })
      .eq("egg_pop_id", club.egg_pop_id);

    setMemberCount(count || 0);
  };

  const currentLocation = club.egg_pop_location.split(" ").slice(1, 3).join(" ");

  const handleClick = () => {
    router.push(`/club/one-time-club-sub/${club.egg_pop_id}`);
  };

  return (
    <div onClick={handleClick} className="flex items-start p-4 border rounded-lg shadow-sm cursor-pointer">
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={club.egg_pop_image}
          alt={club.egg_pop_name}
          width={158}
          height={158}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="text-sm text-gray-500">에그팝</div>
        <h3 className="text-lg font-semibold mt-1">{club.egg_pop_name}</h3>
        <div className="text-sm text-gray-600 mt-1">
          {currentLocation} • {format(new Date(club.egg_pop_date_time), "MM.dd HH:mm")}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {memberCount} / {club.egg_pop_people_limited}명
        </div>
      </div>
    </div>
  );
};
