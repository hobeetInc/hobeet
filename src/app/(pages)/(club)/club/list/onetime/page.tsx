"use client";

import Link from "next/link";
import Image from "next/image";
import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDate } from "@/utils/CustomDate";
import { useEggPopAllList } from "@/hooks/utils/list/allList";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { BigVerticalContentsEggPopList } from "@/components/ui/organisms/lists/BigVerticalContentsList";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";
const AllOneTimeClubListPage = () => {
  const { data: allOneTimeClubList, isLoading, isError } = useEggPopAllList();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

  return (
    <div className={`${isLargeScreen ? "px-5" : ""}`}>
      {isLargeScreen && (
        <div className="h-[67px] flex items-center">
          <Text variant="header-20">따끈따끈한 에그팝</Text>
        </div>
      )}

      <div className={`flex w-[390px] py-2 items-center gap-[10px] ${isLargeScreen ? "" : "px-4"}`}>
        <Text variant="body_medium-14">총 {allOneTimeClubList?.length}개</Text>
      </div>

      <div className={`${isLargeScreen ? "w-full flex flex-wrap gap-x-6 gap-y-[68px] mb-[176px]" : ""}`}>
        {allOneTimeClubList?.map((club) => (
          <>
            {isLargeScreen ? (
              <div key={club.egg_pop_id}>
                <Link href={`/club/one-time-club-sub/${club.egg_pop_id}`}>
                  <BigVerticalContentsEggPopList
                    eggPop={club}
                    hostName={club.user.user_name}
                    hostImage={club.user.user_profile_img}
                    memberCount={club.egg_pop_member[0].count}
                  />
                </Link>
              </div>
            ) : (
              <div key={club.egg_pop_id} className="flex items-start gap-2 self-stretch mb-4">
                <Link
                  href={`/club/one-time-club-sub/${club.egg_pop_id}`}
                  className="w-[358px] h-[102px] flex items-center gap-[8px] mx-4"
                >
                  <div className="w-[358px] h-[102px] flex items-center gap-[8px] mx-4">
                    <div className="w-[88px] h-[88px] rounded-[12px] flex-shrink-0 overflow-hidden">
                      <Image
                        width={88}
                        height={88}
                        src={club.egg_pop_image}
                        alt={club.egg_pop_name}
                        className="w-full h-full object-cover"
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
                        <p className="text-[14px] leading-[18.9px] font-[600] overflow-hidden text-overflow-ellipsis line-clamp-1 max-w-[250px]">
                          {club.egg_pop_name}
                        </p>
                      </div>
                      <div className="flex pt-[2px] items-center gap-[2px]">
                        <Image src="/asset/Icon/Icon-Location.png" alt="LocationIcon" width={16} height={16} />
                        <p className="text-[12px] font-[400px] leading-[145%]">
                          {CustomAddress(club.egg_pop_location)}
                        </p>
                        <div className="flex items-center gap-2 w-[125px] h-[20px]">
                          <p className="text-[12px] font-[400px] leading-[145%]">
                            {CustomDate(club.egg_pop_date_time)}
                          </p>
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
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default AllOneTimeClubListPage;
