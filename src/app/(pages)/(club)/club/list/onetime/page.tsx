"use client";

import { useEffect, useState } from "react";
import { getAllOneTimeClub } from "../../_api/supabase";
import Link from "next/link";
import Image from "next/image";
import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDate } from "@/utils/CustomDate";
import { StringEggPopForm } from "@/types/eggpop.types";
import { IoIosArrowBack } from "react-icons/io";
import Text from "@/components/uiComponents/TextComponents/Text";
import { useRouter } from "next/navigation";
import Tag from "@/components/uiComponents/TagComponents/Tag";

const AllOneTimeClubListPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allOneTimeClubList, setAllOneTimeClubList] = useState<StringEggPopForm[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchAllRegularClubList = async () => {
      try {
        setLoading(true);
        const res = await getAllOneTimeClub();
        if (res) {
          setAllOneTimeClubList(res as StringEggPopForm[]);
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
      <div className="flex justify-center items-center w-full mb-4">
        <div onClick={() => router.back()} className="h-12 w-12 p-3 inline-flex">
          <IoIosArrowBack className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex-1 text-center pr-7">
          <Text variant="header-16">따끈따끈 에그팝</Text>
        </div>
      </div>

      <div className="flex w-[390px] py-2 px-4 items-center gap-[10px]">
        <Text variant="body_medium-14">총 {allOneTimeClubList?.length}개</Text>
      </div>
      {allOneTimeClubList.map((club: StringEggPopForm) => (
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
                <Tag tagName="eggpop" />

                <div className="w-[160px]">
                  <Text variant="subtitle-14"> {club.egg_pop_name}</Text>
                </div>
                <div className="flex pt-[2px] items-center gap-[2px]">
                  <Image src="/asset/Icon/Icon-Location.png" alt="LocationIcon" width={16} height={16} />

                  <div className="flex items-center gap-2 w-full h-[20px] ">
                    <Text variant="body_medium-14" className="text-gray-400">
                      {CustomAddress(club.egg_pop_location)}
                    </Text>

                    <Text variant="body_medium-14" className="text-gray-400">
                      {CustomDate(club.egg_pop_date_time)}
                    </Text>
                  </div>
                </div>

                <div className="flex max-w-[160px] items-center gap-[2px]">
                  <Text variant="body_medium-14" className="text-gray-400">
                    멤버
                  </Text>
                  <Text variant="body_medium-14" className="text-gray-400">
                    {club.egg_pop_member[0].count} / {club.egg_pop_people_limited}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllOneTimeClubListPage;
