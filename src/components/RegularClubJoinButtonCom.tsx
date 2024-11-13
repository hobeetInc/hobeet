"use client";

import { RegularClubChatRoomRecruiterEntrance } from "@/app/(pages)/(chat)/_components/regularClub/RegularClubChatRoomRecruiterEntrance";
import { EggClubJoinButtonProps } from "@/types/join.types";
import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { regularClubJoin } from "@/utils/regularclubjoin/join";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Text from "./uiComponents/TextComponents/Text";
import { Button } from "./uiComponents/Button/ButtonCom";

export default function RegularClubJoinButton({ clubId, onSuccess, onError }: EggClubJoinButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleJoin = async () => {
    try {
      setIsLoading(true);

      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();

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
        RegularClubChatRoomRecruiterEntrance({ egg_club_id: clubId }); // 모임원 채팅방 입장(자동 승인)
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
      <Text variant="subtitle-16">{isLoading ? "처리중..." : "참여하기"}</Text>
    </Button>

    // <button onClick={handleJoin} disabled={isLoading} className={className}>
    //   {isLoading ? "처리중..." : "참여하기"}
    // </button>
  );
}
