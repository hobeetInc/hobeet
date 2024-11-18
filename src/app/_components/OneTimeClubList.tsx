"use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
// import { getOneTimeClub } from "@/app/(pages)/(club)/club/_api/supabase";

// import { EggPopForm } from "@/types/안끝난거/eggpop.types";
import { VerticalContentsListMediumEggPop } from "@/components/uiComponents/VerticalContentsListMedium";
import { useEggPopTenList } from "@/hooks/eggPopQueries";

const OneTimeClubList = () => {
  const { data: list, isLoading } = useEggPopTenList();

  if (isLoading) return <div>로딩 중...</div>;

  // const [list, setList] = useState<EggPopForm[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  // const data = await getOneTimeClub();
  //       setList(data as unknown as EggPopForm[]);
  //     } catch (error) {
  //       console.error("일회성모임 리스트 가져오는 중 오류가 발생했습니다", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="relative] mx-auto">
      <div className="overflow-x-auto scrollbar-hide h-[330px]">
        <div className="inline-flex items-center  px-4 pt-4">
          {list?.map((club) => (
            <Link
              href={`/club/one-time-club-sub/${club.egg_pop_id}`}
              key={club.egg_pop_id}
              className="w-[160px] h-[311px] mr-4"
            >
              <VerticalContentsListMediumEggPop
                eggPop={club}
                hostName={club.user.user_name}
                hostImag={club.user.user_profile_img}
                memberCount={club.egg_pop_member[0].count}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OneTimeClubList;
