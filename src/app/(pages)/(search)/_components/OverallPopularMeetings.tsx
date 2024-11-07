"use client";

import { useQuery } from "@tanstack/react-query";
import { getPopularClubs } from "../_api/supabase";
import Link from "next/link";
import { HorizontalContentsListLargeEggClub } from "@/components/uiComponents/HorizontalContentsListLarge";

const OverallPopularMeetings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["popularClubs"],
    queryFn: getPopularClubs
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-[390px] px-4 flex-col items-start gap-4">
      {data?.map((club) => (
        <Link
          key={club.egg_club_id}
          href={`/club/regular-club-sub/${club.egg_club_id}`}
          className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4"
        >
          {/* 여긴 이미지 88이고 검색해서 나오는건 102여야함 */}
          {/* 지금은 102임 */}
          <HorizontalContentsListLargeEggClub eggClub={club} />
          {/* <div className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4">
            <div className="w-[37px] flex-shrink-0">
              <p className="text-[32px] font-bold leading-[135%]">{index + 1}</p>
            </div>
            <div className="w-[88px] h-[88px] rounded-[12px] flex-shrink-0 overflow-hidden">
              <Image
                width={88}
                height={88}
                src={club.egg_club_image}
                alt={club.egg_club_name}
                className="w-[88px] h-[88px] object-cover"
              />
            </div>
            <div className="flex w-[161px] h-[90] flex-col items-start gap-[6px]">
              <div className="flex py-[2px] px-[8px] justify-center items-center rounded-[128px] bg-[#262626]">
                <p className="font-pretendard text-[10px] leading-[14.5px] not-italic font-normal text-[#ffffff]">
                  에그클럽
                </p>
              </div>
              <p className="text-[14px] leading-[18.9px] font-[600] overflow-hidden text-overflow-ellipsis">
                {club.egg_club_name}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
                  <Image
                    src={club.user_id.user_profile_img}
                    alt="profile"
                    width={22}
                    height={22}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex max-w-[160px] items-center gap-[2px]">
                  <p className="overflow-hidden leading-[20.3px] text-[#8c8c8c] text-ellipsis text-[14px] font-[500px]">
                    {club.user_id.user_name}
                  </p>
                  <p className="font-pretendard text-[14px] ml-[8px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                    멤버
                  </p>
                  <p className="font-pretendard text-[14px] ml-[2px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                    {club.egg_club_member[0].count} / {club.egg_club_people_limited}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Image
                  width={16}
                  height={16}
                  src="/asset/Icon/Icon-Heart.png"
                  alt="Heart"
                  className="flex w-4 h-4 justify-center items-center"
                />
                <p className="text-[#8c8c8c] font-pretendard text-[12px] font-[400px] leading-[17.4px]">
                  {club.wish_list.length > 100 ? "100+" : club.wish_list.length}
                </p>
              </div>
            </div>
          </div> */}
        </Link>
      ))}
    </div>

    // }
  );
};
export default OverallPopularMeetings;
