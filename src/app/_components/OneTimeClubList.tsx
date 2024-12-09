"use client";

import Link from "next/link";
import { VerticalContentsListMediumEggPop } from "@/components/ui/organisms/lists/VerticalContentsListMedium";
import { useEggPopTenList } from "@/hooks/utils/list/tenList";
import Text from "@/components/ui/atoms/text/Text";

const OneTimeClubList = () => {
  const { data: list, isLoading, isError } = useEggPopTenList();

  if (isLoading) {
    return <Text variant="subtitle-16">로딩 중...</Text>;
  }

  if (isError) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

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
