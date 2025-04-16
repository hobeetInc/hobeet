"use client";

import { OneTimeClubCard } from "./OneTimeClubCard";
import { RegularClubCard } from "./RegularClubCard";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchCreatedClubs, fetchJoinedClubs } from "../_apis/ClubListContentApi";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import {
  BigVerticalContentsEggPopList,
  BigVerticalContentsEggClubList
} from "@/components/ui/organisms/lists/BigVerticalContentsList";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";
interface ClubListContentProps {
  activeTab: boolean; // true: 에그장(내가 만든 모임), false: 에그즈(내가 참여한 모임)
}

export default function ClubListContent({ activeTab }: ClubListContentProps) {
  // 현재 로그인한 사용자 ID 조회
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  // 모든 모임 데이터 조회
  const {
    data: clubs,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["clubs", userId, activeTab],
    queryFn: () => (activeTab ? fetchCreatedClubs(userId!) : fetchJoinedClubs(userId!)),
    enabled: !!userId
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

  // activeTab에 따라 내가 만든 모임 또는 내가 참여한 모임 필터링
  const filteredClubs = {
    oneTime: clubs?.oneTime?.filter((club) => (activeTab ? club.user_id === userId : club.user_id !== userId)) || [],
    regular: clubs?.regular?.filter((club) => (activeTab ? club.user_id === userId : club.user_id !== userId)) || []
  };

  // 필터링된 데이터가 없는 경우
  if (filteredClubs.oneTime.length === 0 && filteredClubs.regular.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500">
        {activeTab ? "내가 만든 모임이 없습니다" : "내가 참여한 모임이 없습니다"}
      </div>
    );
  }

  return (
    <div
      className={`w-full grid ${
        isLargeScreen ? "grid-cols-4 gap-2" : "grid-cols-1 gap-2"
      } justify-start items-start px-4`}
    >
      {/* OneTime 클럽 조건부 렌더링 */}
      {isLargeScreen
        ? filteredClubs.oneTime.map((club) => (
            <BigVerticalContentsEggPopList
              key={club.egg_pop_id}
              eggPop={club}
              hostName={club.host_name}
              hostImage={club.host_image}
              memberCount={club.member_count}
            />
          ))
        : filteredClubs.oneTime.map((club) => <OneTimeClubCard key={club.egg_pop_id} club={club} />)}

      {/* Regular 클럽 조건부 렌더링 */}
      {isLargeScreen
        ? filteredClubs.regular.map((club) => (
            <BigVerticalContentsEggClubList
              key={club.egg_club_id}
              eggClub={club}
              hostName={club.host_name}
              hostImage={club.host_image}
              memberCount={club.member_count}
              isWished={club.is_wished}
              wishListCount={club.wish_list_count}
            />
          ))
        : filteredClubs.regular.map((club) => <RegularClubCard key={club.egg_club_id} club={club} />)}
    </div>
  );
}
