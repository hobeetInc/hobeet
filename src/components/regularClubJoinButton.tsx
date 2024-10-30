"use client";

import { ChatRoomRecruiterEntrance } from "@/app/(pages)/(chat)/_components/ChatRoomRecruiterEntrance";
import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { regularClubJoin } from "@/utils/regularclubjoin/join";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface RegularClubJoinButtonProps {
  clubId: number;
  onSuccess?: (currentMembers?: number) => void;
  onError?: (message: string) => void;
}

export default function RegularClubJoinButton({ clubId, onSuccess, onError }: RegularClubJoinButtonProps) {
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
        ChatRoomRecruiterEntrance({ r_c_id: clubId }); // 모임원 채팅방 입장(자동 승인)
        alert(result.message);
      }
    } catch (error) {
      if (error instanceof ClubJoinError) {
        onError?.(error.message);
        alert(error.message);
      } else {
        onError?.("예기치 않은 오류가 발생했습니다.");
        alert("예기치 않은 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {isLoading ? "처리중..." : "참여하기"}
    </button>
  );
}
