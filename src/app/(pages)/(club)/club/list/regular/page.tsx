"use client";
import { useEffect, useState } from "react";
import { getAllRegularClubList } from "../../_api/supabase";
import Link from "next/link";
import Image from "next/image";
import { EggClubForm } from "@/types/eggclub.types";

const AllRegularClubListPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allRegularClubList, setAllRegularClubList] = useState<EggClubForm[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAllRegularClubList = async () => {
      try {
        setLoading(true);
        const res = await getAllRegularClubList();
        if (res) {
          setAllRegularClubList(res);
        } else {
          setError("정기적 모임리스트를 불러오지 못했습니다.");
        }
      } catch (error) {
        setError(`API 호출 중 오류가 발생했습니다. ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRegularClubList();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-36">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-36 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="flex w-[390px] py-2 px-4 items-center gap-[10px]">
        <p className="text-[14px] font-[500px] leading-[145%]">총 {allRegularClubList?.length}개</p>
      </div>
      {allRegularClubList.map((club) => (
        <div key={club.egg_club_id} className="flex items-start gap-2 self-stretch mb-4">
          <Link
            href={`/club/regular-club-sub/${club.egg_club_id}`}
            className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4"
          >
            <div className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4">
              <div className="w-[88px] h-[88px] rounded-[12px] flex-shrink-0 overflow-hidden">
                <Image
                  width={88}
                  height={88}
                  src={club.egg_club_image}
                  alt={club.egg_club_name}
                  className="w-[88px] h-[88px] object-cover"
                />
              </div>
              <div className="flex w-[161px] h-[90] flex-col items-start gap-[4px]">
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
                      src={club.user.user_profile_img}
                      alt="profile"
                      width={22}
                      height={22}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex max-w-[160px] items-center gap-[2px]">
                    <p className="overflow-hidden leading-[20.3px] text-[#8c8c8c] text-ellipsis text-[14px] font-[500px]">
                      {club.user.user_name}
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
                    src="/asset/Icon/Heart-Filled.svg"
                    alt="Heart"
                    className="flex w-4 h-4 justify-center items-center"
                  />
                  <p className="text-[#8c8c8c] font-pretendard text-[12px] font-[400px] leading-[17.4px]">
                    {club.wish_list.length > 100 ? "100+" : club.wish_list.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllRegularClubListPage;
