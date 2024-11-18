"use client";
import { useEffect, useState } from "react";
import { getAllRegularClubList } from "../../_api/supabase";
import Link from "next/link";
import Image from "next/image";
import { StringEggClubForm } from "@/types/eggclub.types";
import { IoIosArrowBack } from "react-icons/io";
import Text from "@/components/uiComponents/TextComponents/Text";
import { useRouter } from "next/navigation";
import Tag from "@/components/uiComponents/TagComponents/Tag";

const AllRegularClubListPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allRegularClubList, setAllRegularClubList] = useState<StringEggClubForm[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchAllRegularClubList = async () => {
      try {
        setLoading(true);
        const res = await getAllRegularClubList();
        if (res) {
          setAllRegularClubList(res as StringEggClubForm[]);
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
          <Text variant="header-16">프레쉬 에그클럽</Text>
        </div>
      </div>

      <div className="flex w-[390px] py-2 px-4 items-center gap-[10px] mb-2">
        <Text variant="body_medium-14">총 {allRegularClubList?.length}개</Text>
      </div>
      {allRegularClubList.map((club: StringEggClubForm) => (
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
                <Tag tagName="eggclub" />

                <Text variant="subtitle-14">{club.egg_club_name}</Text>

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
                  <div className="flex max-w-[160px] items-center">
                    <Text variant="body_medium-14" className="text-gray-400  mr-2">
                      {club.user_id.user_name}
                    </Text>

                    <Text variant="body_medium-14" className="text-gray-400">
                      멤버
                    </Text>
                    <Text variant="body_medium-14" className="text-gray-400">
                      {club.egg_club_member[0].count} / {club.egg_club_people_limited}
                    </Text>
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
