"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OneTimeClubForm } from "@/app/(pages)/(club)/club/_types/ClubForm";
import { getOneTimeClub } from "@/app/(pages)/(club)/club/_api/supabase";
import Image from "next/image";
import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDate } from "@/utils/CustomDate";

const OneTimeClubList = () => {
  const [list, setList] = useState<OneTimeClubForm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneTimeClub();
        setList(data);
      } catch (error) {
        console.error("일회성모임 리스트 가져오는 중 오류가 발생했습니다", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex items-center  px-4 pt-4">
          {list?.map((club) => (
            <Link
              href={`/club/one-time-club-sub/${club.one_time_club_id}`}
              key={club.one_time_club_id}
              className="w-[160px] h-[311px] mr-4"
            >
              <div className="relative ">
                <div
                  className="relative flex justify-end items-center "
                  style={{
                    width: "160px",
                    height: "160px",
                    padding: "112px 0px 0px 112px",
                    borderRadius: "12px",
                    background: `url(${club.one_time_image}) lightgray 50% / cover no-repeat`,
                    display: "flex",
                    alignItems: "center"
                  }}
                />
              </div>

              <div className="flex w-[160px] flex-col items-start gap-[4px] mt-[8px]">
                <div className="flex w-[160px] h-[23px] flex-col items-start gap-1">
                  <div
                    className="flex py-[2px] px-[8px] justify-center items-center
                 rounded-[128px] bg-[#fdb800]"
                  >
                    <p className="font-pretendard text-[10px] not-italic leading-[14.5px] font-normal">에그팝</p>
                  </div>
                </div>
                <div className="w-[160px]">
                  <p
                    className="font-pretendard text-[16px] font-[600] overflow-hidden text-overflow-ellipsis"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      alignSelf: "stretch",
                      color: "var(--Gray-scale-900, #0D0D0D)",
                      lineHeight: "135%"
                    }}
                  >
                    {club.one_time_club_name}
                  </p>
                </div>
                <div className="flex pt-[2px] items-center gap-[2px]">
                  <img src="/asset/Icon/Icon-Location.png" alt="LocationIcon" width={16} height={16} />
                  <p className="font-pretendard text-[14px] font-[500px] text-ellipsis	overflow-hidden leading-[20.3px]	text-[#8c8c8c]  ">
                    {CustomAddress(club.one_time_club_location)}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-[125px] h-[20px]">
                  <p className="font-pretendard leading-[20.3px] text-[14px] font-[500px] text-[#8c8c8c]">
                    {CustomDate(club.one_time_club_date_time)}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-stretch">
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
                    <p className="overflow-hidden leading-[20.3px] text-[#8c8c8c] text-ellipsis font-pretendard text-[14px] font-[500px]">
                      {club.user_id.user_name}
                    </p>
                    <p className="font-pretendard leading-[20.3px] text-[14px] ml-[8px] text-[#8c8c8c] font-[500px]">
                      멤버
                    </p>
                    <p className="font-pretendard leading-[20.3px] text-[14px] ml-[2px] text-[#8c8c8c] font-[500px]">
                      {club.o_t_c_member[0].count} / {club.one_time_people_limited}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OneTimeClubList;
