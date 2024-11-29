"use client";

import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { regularClubJoin } from "@/utils/regularclubjoin/join";
import { useState } from "react";

import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
import { enterRegularChatRoom } from "@/app/(pages)/(chat)/_api/regular";
import { useAuthStore } from "@/store/authStore";

interface EggClubJoinButtonProps {
  clubId: number;
  onSuccess?: (currentMembers?: number) => void;
  onError?: (message: string) => void;
  className?: string;
}

export default function RegularClubJoinButton({ clubId, onSuccess, onError }: EggClubJoinButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Zustand store에서 userId 가져오기
  const userId = useAuthStore((state) => state.userId);

  /**
   * 참여하기 버튼 클릭 핸들러
   * 로그인 상태 확인 후 모임 참여 처리
   */
  const handleJoin = async () => {
    try {
      setIsLoading(true);

      // userId가 없으면 로그인 필요
      if (!userId) {
        onError?.("로그인이 필요합니다.");
        return;
      }

      // 정기 모임 가입 요청
      const result = await regularClubJoin({
        clubId: clubId,
        userId: userId
      });

      // 가입 성공 시 처리
      if (result.success) {
        onSuccess?.();
        // 모임원 채팅방 입장(자동 승인)
        enterRegularChatRoom({ egg_club_id: clubId });
        alert(result.message);
        location.reload();
      }
    } catch (error) {
      if (error instanceof ClubJoinError) {
        onError?.(error.message);
        alert(error.message);
        location.reload();
      } else {
        onError?.("예기치 않은 오류가 발생했습니다.");
        alert("예기치 않은 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button colorType="black" borderType="circle" onClick={handleJoin} disabled={isLoading} className="w-full">
      {isLoading ? "처리중..." : "참여하기"}
    </Button>
  );
}
