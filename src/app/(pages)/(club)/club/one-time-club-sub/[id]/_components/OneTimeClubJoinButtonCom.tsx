import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { oneTimeClubJoin } from "@/utils/onetimeclubjoin/join";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/atoms/buttons/ButtonCom";
import { useAuthStore } from "@/store/authStore";
import useScreenSizeStore from "@/store/useScreenSizeStore";

interface JoinClubButtonProps {
  clubId: number;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}
export default function OneTimeClubJoinButton({ clubId, onError }: JoinClubButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  // Zustand store에서 userId 가져오기
  const userId = useAuthStore((state) => state.userId);

  /**
   * 참여하기 버튼 클릭 핸들러
   * 로그인 상태 확인 후 모임 참여 처리
   */
  const handleJoinRequest = async () => {
    try {
      setIsLoading(true);

      // userId가 없으면 로그인 필요
      if (!userId) {
        onError?.("로그인이 필요합니다.");
        return;
      }

      const result = await oneTimeClubJoin({
        clubId: clubId,
        userId: userId
      });

      // 가입 성공 시 결제 페이지로 이동
      if (result.success) {
        router.push(`/kakaopay/paymentConfirm?clubType=true&clubId=${clubId}`);
      } else {
        // 가입 실패 시 에러 메시지 처리
        onError?.(result.message || "모임 가입에 실패했습니다.");
        alert(result.message || "모임 가입에 실패했습니다.");
      }
    } catch (error) {
      if (error instanceof ClubJoinError) {
        alert(error.message);
        onError?.(error.message);
      } else {
        alert("예기치 않은 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      colorType="orange"
      borderType="circle"
      sizeType="large"
      onClick={handleJoinRequest}
      disabled={isLoading}
      className={`${isLargeScreen ? "w-[1024px]" : ""}`}
    >
      {isLoading ? "처리중..." : "참여하기"}
    </Button>
  );
}
