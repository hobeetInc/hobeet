"use client";

import { getEggPopMainCategory } from "../_api/supabase";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDate } from "@/utils/CustomDate";
import Image from "next/image";

// 카테고리 리스트 props
interface CategoryListProps {
  selectedCategory: number;
}

const EggPopCategoryList = ({ selectedCategory }: CategoryListProps) => {

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.categoryList.mainCategory(selectedCategory),
    queryFn: () => getEggPopMainCategory(selectedCategory)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <>
      <div>
        <div className="flex w-[390px] py-2 px-4 items-center gap-[10px]">
          <p className="text-[14px] font-[500px] leading-[145%]">총 {data?.length}개</p>
        </div>
        {data?.map((club) => (
          <div key={club.egg_pop_id} className="flex items-start gap-2 self-stretch mb-4">
            <Link
              href={`/club/one-time-club-sub/${club.egg_pop_id}`}
              className="w-[358px] h-[102px] flex items-center gap-[8px] mx-4"
            >
              <div className="w-[358px] h-[102px] flex items-center gap-[8px] mx-4">
                <div className="w-[88px] h-[88px] rounded-[12px] flex-shrink-0 overflow-hidden">
                  <Image
                    width={102}
                    height={102}
                    src={club.egg_pop_image}
                    alt={club.egg_pop_name}
                    className="w-[102px] h-[102px] object-cover"
                  />
                </div>
                <div className="flex w-[248px] h-[87px] flex-col items-start gap-[4px]">
                  <div
                    className="flex py-[2px] px-[8px] justify-center items-center
                rounded-[128px] bg-[#fdb800]"
                  >
                    <p className="font-pretendard text-[10px] not-italic leading-[14.5px] font-normal">에그팝</p>
                  </div>
                  <div className="w-[160px]">
                    <p
                      className="font-pretendard text-[14px] font-[600] overflow-hidden text-overflow-ellipsis"
                      style={
                        {
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          alignSelf: "stretch",
                          color: "var(--Gray-scale-900, #0D0D0D)",
                          lineHeight: "135%"
                        } as React.CSSProperties
                      }
                    >
                      {club.egg_pop_name}
                    </p>
                  </div>
                  <div className="flex pt-[2px] items-center gap-[2px]">
                    <Image src="/asset/Icon/Icon-Location.png" alt="LocationIcon" width={16} height={16} />
                    <p className="text-[12px] font-[400px] leading-[145%]">{CustomAddress(club.egg_pop_location)}</p>
                    <div className="flex items-center gap-2 w-[125px] h-[20px]">
                      <p className="text-[12px] font-[400px] leading-[145%]">{CustomDate(club.egg_pop_date_time)}</p>
                    </div>
                  </div>

                  <div className="flex max-w-[160px] items-center gap-[2px]">
                    <p className="font-pretendard leading-[20.3px] text-[14px] ml-[8px] text-[#8c8c8c] font-[500px]">
                      멤버
                    </p>
                    <p className="font-pretendard leading-[20.3px] text-[14px] ml-[2px] text-[#8c8c8c] font-[500px]">
                      {club.egg_pop_member[0].count} / {club.egg_pop_people_limited}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default EggPopCategoryList;
