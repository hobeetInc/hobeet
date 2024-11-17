import { format } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { EggPop } from "@/types/cardlist.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const OneTimeClubCard = ({ club }: { club: EggPop }) => {
  const router = useRouter();

  const fetchMemberCount = async () => {
    const { data } = await supabase
      .from("egg_pop_member")
      .select("*", { count: "exact" })
      .eq("egg_pop_id", club.egg_pop_id);

    return data?.length;
  };

  const { data: memberCount = 0 } = useQuery({
    queryKey: ["memberCount", club.egg_pop_id],
    queryFn: fetchMemberCount,
    enabled: !!club.egg_pop_id
  });

  const currentLocation = club.egg_pop_location.split(" ").slice(1, 3).join(" ");

  const handleClick = () => {
    router.push(`/club/one-time-club-sub/${club.egg_pop_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
    >
      <div className=" flex gap-2">
        <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px] bg-gray-100">
          <Image
            src={club.egg_pop_image}
            alt={club.egg_pop_name}
            width={102}
            height={102}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-[19px] flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex px-2 py-0.5 bg-primary-500 rounded-[124px] text-[10px] text-gray-900 font-pretendard font-normal leading-[14.50px]">
              에그팝
            </div>
            <h3 className="text-sm font-semibold mb-2">{club.egg_pop_name}</h3>
            <div className="flex items-center mt-3 text-gray-400 text-sm">
              <span>
                <Image src={"/asset/Icon/Icon-Location.png"} alt="지도" width={16} height={16} />
              </span>
              <span className="ml-1">{currentLocation}</span>
              <span className="ml-2">{format(new Date(club.egg_pop_date_time), "MM월 dd일 HH:mm")}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-sm text-gray-400">
              멤버 <span className=" text-gray-400">{memberCount}</span>
              <span className="text-gray-400"> / {club.egg_pop_people_limited}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
