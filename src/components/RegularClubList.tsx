"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getRegularClubList } from "@/app/(pages)/(club)/club/_api/supabase";
import Image from "next/image";
import { useAuth } from "@/app/store/AuthContext";

interface RegularClubForm {
  m_c_id: number;
  r_c_member: { count: number }[];
  regular_club_age: number;
  regular_club_approbval: boolean;
  regular_club_create_at: string;
  regular_club_id: number;
  regular_club_image: string;
  regular_club_introduction: string;
  regular_clun_name: string;
  regular_club_people_limited: number;
  s_c_id: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
  wish_list: {
    r_c_id: number;
    user_id: string;
    wish_list_id: number;
  }[];
}

const RegularClubList = () => {
  const {
    data: list,
    isLoading,
    error
  } = useQuery({
    queryKey: ["regularClubs"],
    queryFn: getRegularClubList
  });

  const { userId } = useAuth();
  // console.log(userId);
  // console.log(list);

  const renderHeartIcon = (club: RegularClubForm) => {
    console.log("club", club);

    if (!userId) {
      return <Image src="/asset/Icon/Heart.png" alt="Heart" width={24} height={24} />;
    }

    const isWished = club.wish_list?.some((wish) => wish.user_id === userId);

    return (
      <Image
        src={isWished ? "/asset/Icon/Icon-Heart.png" : "/asset/Icon/Heart.png"}
        alt="Heart"
        width={24}
        height={24}
      />
    );
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <div className="overflow-x-auto scrollbar-hide h-[320px]">
        <div className="inline-flex items-center px-4 pt-4">
          {list?.map((club) => (
            <Link
              href={`/club/regular-club-sub/${club.regular_club_id}`}
              key={club.regular_club_id}
              className="w-[160px] h-[292px] mr-4"
            >
              <div className="relative w-[160px] h-[160px]">
                <div
                  className="w-full h-full rounded-xl"
                  style={{
                    background: `url(${club.regular_club_image}) lightgray 50% / cover no-repeat`
                  }}
                />
                <div className="absolute bottom-1 right-1">{renderHeartIcon(club)}</div>
              </div>

              <div className="flex w-[160px] flex-col items-start gap-[4px] mt-[8px]">
                <div className="flex w-[160px] h-[23px] flex-col items-start gap-1">
                  <div className="flex py-[2px] px-[8px] justify-center items-center rounded-[128px] bg-[#262626]">
                    <p className="font-pretendard text-[10px] leading-[14.5px] not-italic font-normal text-[#ffffff]">
                      에그클럽
                    </p>
                  </div>
                </div>
                <div className="w-[160px]">
                  <p
                    className="font-pretendard text-[16px] leading-[21.6px] font-[600] overflow-hidden text-overflow-ellipsis"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      alignSelf: "stretch",
                      color: "var(--Gray-scale-900, #0D0D0D)",
                      lineHeight: "135%"
                    }}
                  >
                    {club.regular_club_name}
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
                    <p className="font-pretendard text-[14px] ml-[8px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                      멤버
                    </p>
                    <p className="font-pretendard text-[14px] ml-[2px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                      {club.r_c_member[0].count} / {club.regular_club_people_limited}
                    </p>
                  </div>
                </div>
                <div className="flex pt-[10.5px] items-center gap-[2px]">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegularClubList;
