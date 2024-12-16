"use client";

import Link from "next/link";
import Image from "next/image";
import { useEggClubAllList } from "@/hooks/utils/list/allList";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { BigVerticalContentsEggClubList } from "@/components/ui/organisms/lists/BigVerticalContentsList";
import { useAuthStore } from "@/store/authStore";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";
const AllRegularClubListPage = () => {
  const { data: allRegularClubList, isLoading, isError } = useEggClubAllList();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  const userId = useAuthStore((state) => state.userId);

  const isWishedByUser = (club) => {
    if (!userId) return false;
    return club.wish_list?.some((wish) => wish.user_id === userId) || false;
  };

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
          <Text variant="header-20">프레쉬 에그클럽</Text>
        </div>
      )}

      <div className={`flex w-[390px] py-2 items-center gap-[10px] ${isLargeScreen ? "" : "px-4"}`}>
        <Text variant="body_medium-14">총 {allRegularClubList?.length}개</Text>
      </div>

      <div className={`${isLargeScreen ? "w-full flex flex-wrap gap-x-6 gap-y-[68px] mb-[176px]" : ""}`}>
        {allRegularClubList?.map((club) => (
          <>
            {isLargeScreen ? (
              <div key={club.egg_club_id}>
                <Link href={`/club/regular-club-sub/${club.egg_club_id}`}>
                  <BigVerticalContentsEggClubList
                    eggClub={club}
                    hostName={club.user.user_name}
                    hostImage={club.user.user_profile_img}
                    memberCount={club.egg_club_member[0].count}
                    isWished={isWishedByUser(club)}
                    wishListCount={club.wish_list.length}
                  />
                </Link>
              </div>
            ) : (
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
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex w-[161px] h-[90] flex-col items-start gap-[4px]">
                      <div className="flex py-[2px] px-[8px] justify-center items-center rounded-[128px] bg-[#262626]">
                        <p className="font-pretendard text-[10px] not-italic leading-[14.5px] font-normal text-white">
                          에그클럽
                        </p>
                      </div>
                      <p className="text-[14px] leading-[18.9px] font-[600] overflow-hidden text-overflow-ellipsis line-clamp-1 max-w-[250px]">
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
                      <div className="flex items-center gap-1">
                        <Image
                          width={16}
                          height={16}
                          src="/asset/Icon/Heart-Filled.svg"
                          alt="Heart"
                          className="w-4 h-4"
                        />
                        <p className="text-[#8c8c8c] font-pretendard text-[12px] font-[400px] leading-[17.4px]">
                          {club.wish_list.length > 100 ? "100+" : club.wish_list.length}
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

export default AllRegularClubListPage;
