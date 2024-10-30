import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { oneTimeClubJoin } from "@/utils/onetimeclubjoin/join";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface JoinClubButtonProps {
  clubId: number;
  onSuccess?: (currentMembers?: number) => void;
  onError?: (message: string) => void;
}

export default function JoinClubButton({ clubId, onSuccess, onError }: JoinClubButtonProps) {
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
      console.log("Auth error:", authError);

      if (authError || !user) {
        onError?.("로그인이 필요합니다.");
        return;
      }
      const result = await oneTimeClubJoin({
        clubId: clubId,
        userId: user.id
      });

      if (result.success) {
        onSuccess?.();
        alert("모임 가입이 완료 되었습니다!"); // 결제 완료되었을때 바뀔 수 있음(결제 부분 협의 후)
      }
    } catch (error) {
      if (error instanceof ClubJoinError) {
        onError?.(error.message);
        alert(error.message);
      } else {
        onError?.("예기치 않은 오류가 발생 했습니다.");
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
