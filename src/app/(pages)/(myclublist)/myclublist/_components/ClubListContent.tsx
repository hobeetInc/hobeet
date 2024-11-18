"use client";

import { OneTimeClubCard } from "./OneTimeClubCard";
import { RegularClubCard } from "./RegularClubCard";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchCreatedClubs, fetchJoinedClubs } from "../_apis/ClubListContentApi";

interface ClubListContentProps {
  activeTab: boolean; // true: 에그장(내가 만든 모임), false: 에그즈(내가 참여한 모임)
}

export default function ClubListContent({ activeTab }: ClubListContentProps) {
  // 현재 로그인한 사용자 ID 조회
  const userId = useAuthStore((state) => state.userId);

  // 모든 모임 데이터 조회
  // activeTab에 따라 내가 만든 모임 또는 내가 참여한 모임 조회
  // userId가 있을 때만 쿼리 실행
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
    return <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩중...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩 중 오류 발생</div>;
  }

  // activeTab에 따라 내가 만든 모임 또는 내가 참여한 모임 필터링
  // 에그장: 내가 만든 모임, 에그즈: 내가 참여한 모임
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
    <div className="w-full">
      <div className="w-full flex-col justify-start items-start gap-1 inline-flex px-4">
        {/* 에그팝 모임 */}
        {filteredClubs.oneTime.map((club) => (
          <div key={club.egg_pop_id} className="mb-4">
            <OneTimeClubCard club={club} />
          </div>
        ))}
        {/* 에그클럽 모임 */}
        {filteredClubs.regular.map((club) => (
          <div key={club.egg_club_id} className="mb-4">
            <RegularClubCard club={club} />
          </div>
        ))}
      </div>
    </div>
  );
}
