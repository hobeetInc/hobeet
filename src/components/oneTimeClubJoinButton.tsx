// import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
// import { oneTimeClubJoin } from "@/utils/onetimeclubjoin/join";
// import { createClient } from "@/utils/supabase/client";
// import { useState } from "react";

// interface JoinClubButtonProps {
//   clubId: number;
//   onSuccess?: (currentMembers?: number) => void;
//   onError?: (message: string) => void;
// }

// export default function JoinClubButton({ clubId, onSuccess, onError }: JoinClubButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const supabase = createClient();

//   const handleJoin = async () => {
//     try {
//       setIsLoading(true);

//       const {
//         data: { user },
//         error: authError
//       } = await supabase.auth.getUser();

//       console.log("User data:", user);
//       console.log("Auth error:", authError);

//       if (authError || !user) {
//         onError?.("로그인이 필요합니다.");
//         return;
//       }
//       const result = await oneTimeClubJoin({
//         clubId: clubId,
//         userId: user.id
//       });

//       if (result.success) {
//         onSuccess?.();
//         alert("모임 가입이 완료 되었습니다!"); // 결제 완료되었을때 바뀔 수 있음(결제 부분 협의 후)
//       }
//     } catch (error) {
//       if (error instanceof ClubJoinError) {
//         onError?.(error.message);
//         alert(error.message);
//       } else {
//         onError?.("예기치 않은 오류가 발생 했습니다.");
//         alert("예기치 않은 오류가 발생했습니다.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleJoin}
//       disabled={isLoading}
//       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//     >
//       {isLoading ? "처리중..." : "참여하기"}
//     </button>
//   );
// }

// import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { oneTimeClubJoin } from "@/utils/onetimeclubjoin/join";
import { createClient } from "@/utils/supabase/client";
import { useRouter /*, useSearchParams */ } from "next/navigation";
import { useState /*, useEffect*/ } from "react";

interface JoinClubButtonProps {
  clubId: number;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function JoinClubButton({ clubId, /*onSuccess,*/ onError }: JoinClubButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  // const searchParams = useSearchParams();

  // 결제 완료 후 처리
  // useEffect(() => {
  //   const handlePaymentCompletion = async () => {
  //     // URL에서 결제 관련 파라미터 확인
  //     const pgToken = searchParams.get("pg_token");
  //     const paymentClubId = searchParams.get("clubId");

  //     // 결제 완료 상태이고 현재 클럽의 ID와 일치하는 경우에만 처리
  //     if (pgToken && paymentClubId === clubId.toString()) {
  //       try {
  //         setIsLoading(true);

  //         const {
  //           data: { user },
  //           error: authError
  //         } = await supabase.auth.getUser();

  //         if (authError || !user) {
  //           onError?.("로그인이 필요합니다.");
  //           return;
  //         }
  //         //가입 체크하는곳
  //         const result = await oneTimeClubJoin({
  //           clubId: clubId,
  //           userId: user.id
  //         });

  //         if (result.success) {
  //           onSuccess?.();
  //           alert("결제 및 모임 가입이 완료되었습니다!");
  //           router.push("/mypage");
  //         } else {
  //           // 가입 실패 시 에러 메시지 처리
  //           onError?.(result.message || "모임 가입에 실패했습니다.");
  //           alert(result.message || "모임 가입에 실패했습니다.");
  //         }

  //         // 결제 완료 후 URL 파라미터 제거
  //         router.replace(window.location.pathname);
  //       } catch (error) {
  //         if (error instanceof ClubJoinError) {
  //           onError?.(error.message);
  //           alert(error.message);
  //         } else {
  //           onError?.("예기치 않은 오류가 발생했습니다.");
  //           alert("예기치 않은 오류가 발생했습니다.");
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   handlePaymentCompletion();
  // }, [searchParams, clubId]);

  // 참여하기 버튼 클릭 핸들러
  const handleJoinRequest = async () => {
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

      const result = await oneTimeClubJoin({
        clubId: clubId,
        userId: user.id
      });

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
      // console.error("Error during join process:", error);
      // onError?.("예기치 않은 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleJoinRequest} disabled={isLoading} className="w-full h-[50px] bg-yellow-300 rounded-full">
      {isLoading ? "처리중..." : "참여하기"}
    </button>
  );
}
