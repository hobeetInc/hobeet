"use client";

import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { regularClubJoin } from "@/utils/regularclubjoin/join";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
import { enterRegularChatRoom } from "@/app/(pages)/(chat)/_api/regular";

interface EggClubJoinButtonProps {
  clubId: number;
  onSuccess?: (currentMembers?: number) => void;
  onError?: (message: string) => void;
  className?: string;
}

export default function RegularClubJoinButton({ clubId, onSuccess, onError }: EggClubJoinButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleJoin = async () => {
    try {
      setIsLoading(true);

      // 현재 로그인한 사용자 정보 조회
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();

      if (authError || !user) {
        onError?.("로그인이 필요합니다.");
        return;
      }

      // 정기 모임 가입 요청
      const result = await regularClubJoin({
        clubId: clubId,
        userId: user.id
      });

      // 가입 성공 시 처리
      if (result.success) {
        onSuccess?.();
        enterRegularChatRoom({ egg_club_id: clubId }); // 모임원 채팅방 입장(자동 승인)
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
    <Button colorType="black" borderType="circle" onClick={handleJoin} disabled={isLoading}>
      {isLoading ? "처리중..." : "참여하기"}
    </Button>
  );
}
