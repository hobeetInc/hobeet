import { EggClub } from "@/types/cardlist.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const RegularClubCard = ({ club }: { club: EggClub }) => {
  const router = useRouter();

  const fetchCreator = async () => {
    const { data } = await supabase
      .from("user")
      .select("user_id, user_name, user_profile_img")
      .eq("user_id", club.user_id)
      .single();

    return data;
  };

  const { data: creator } = useQuery({
    queryKey: ["creator", club.user_id],
    queryFn: fetchCreator,
    enabled: !!club.user_id // userId가 있을 때만 fetchClubs 실행 // 호출 최적화
  });

  const fetchMemberCount = async () => {
    const { data } = await supabase
      .from("egg_club_member")
      .select("*", { count: "exact" })
      .eq("egg_club_id", club.egg_club_id)
      .eq("egg_club_request_status", "active");

    return data?.length || 0;
  };

  const { data: memberCount = 0 } = useQuery({
    queryKey: ["member_count", club.egg_club_id],
    queryFn: fetchMemberCount,
    enabled: !!club.egg_club_id
  });

  const fetchWishlistCount = async () => {
    const { data } = await supabase
      .from("wish_list")
      .select("*", { count: "exact" })
      .eq("egg_club_id", club.egg_club_id);

    return data?.length || 0;
  };

  const { data: wishlistCount = 0 } = useQuery({
    queryKey: ["wish_list_count", club.egg_club_id],
    queryFn: fetchWishlistCount,
    enabled: !!club.egg_club_id
  });

  const handleClick = () => {
    router.push(`/club/regular-club-sub/${club.egg_club_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0 "
    >
      <div className=" flex gap-2">
        <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px] bg-gray-100">
          <Image
            src={club.egg_club_image}
            alt={club.egg_club_name}
            width={102}
            height={102}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-[19px] flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex px-2 py-0.5 bg-gray-800 rounded-[124px] text-center text-[10px] text-white font-normal font-pretendard leading-[14.50px]">
              에그클럽
            </div>
            <h3 className="text-sm font-semibold mt-2">{club.egg_club_name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {creator?.user_profile_img && (
                  <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                    <Image
                      src={creator.user_profile_img}
                      alt={creator.user_name}
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-sm text-gray-400 font-pretendard">{creator?.user_name}</span>
                <span className="mx-2 text-gray-400"></span>
                <span className="text-sm text-gray-400">
                  멤버 <span className=" text-gray-400">{memberCount}</span>
                  <span className="text-gray-400"> / {club.egg_club_people_limited}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center mt-1">
              <Image src="/asset/Icon/Heart-Filled.svg" alt="heart" width={16} height={16} className="mr-1" />
              <span className="text-xs text-gray-400">{wishlistCount > 100 ? "100+" : wishlistCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
