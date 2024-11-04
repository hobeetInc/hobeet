"use client";

import { RegularClubChatRoomRecruiterEntrance } from "@/app/(pages)/(chat)/_components/regularClub/RegularClubChatRoomRecruiterEntrance";
import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { regularClubJoin } from "@/utils/regularclubjoin/join";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface RegularClubJoinButtonProps {
  clubId: number;
  onSuccess?: (currentMembers?: number) => void;
  onError?: (message: string) => void;
  className?: string;
}

export default function RegularClubJoinButton({ clubId, onSuccess, onError, className }: RegularClubJoinButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleJoin = async () => {
    try {
      setIsLoading(true);

      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();

      console.log("User data:", user);

      if (authError || !user) {
        onError?.("로그인이 필요합니다.");
        return;
      }

      const result = await regularClubJoin({
        clubId: clubId,
        userId: user.id
      });

      if (result.success) {
        onSuccess?.();
        RegularClubChatRoomRecruiterEntrance({ r_c_id: clubId }); // 모임원 채팅방 입장(자동 승인)
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
    <button onClick={handleJoin} disabled={isLoading} className={className}>
      {isLoading ? "처리중..." : "참여하기"}
    </button>
  );
}
