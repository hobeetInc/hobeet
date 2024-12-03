// "use client";
// import Swal from "sweetalert2";
// import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
// import { regularClubJoin } from "@/utils/regularclubjoin/join";
// import { useState } from "react";

// import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
// import { enterRegularChatRoom } from "@/app/(pages)/(chat)/_api/regular";
// import { useAuthStore } from "@/store/authStore";
// import useScreenSizeStore from "@/store/useScreenSizeStore";

// interface EggClubJoinButtonProps {
//   clubId: number;
//   onSuccess?: (currentMembers?: number) => void;
//   onError?: (message: string) => void;
//   className?: string;
// }

// export default function RegularClubJoinButton({ clubId, onSuccess, onError }: EggClubJoinButtonProps) {
//   const isLargeScreen = useScreenSizeStore((state) => state.setIsLargeScreen);
//   const [isLoading, setIsLoading] = useState(false);
//   const userId = useAuthStore((state) => state.userId);

//   // 실제 가입을 처리하는 함수
//   const processJoin = async () => {
//     try {
//    // 정기 모임 가입 요청
//    const result = await regularClubJoin({
//     clubId: clubId,
//     userId: userId
//   });

//    // 가입 성공 시 처리
//    if (result.success) {
//     onSuccess?.();
//     // 모임원 채팅방 입장(자동 승인)
//     enterRegularChatRoom({ egg_club_id: clubId });
//     alert(result.message);
//     location.reload();
//   }

//     } catch (error) {
//       if (error instanceof ClubJoinError) {
//         onError?.(error.message);
//         alert(error.message);
//         location.reload();
//       } else {
//         onError?.("예기치 않은 오류가 발생했습니다.");
//         alert("예기치 않은 오류가 발생했습니다.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const handleJoin = async () => {
//     try {
//       setIsLoading(true);

//       // userId가 없으면 로그인 필요
//       if (!userId) {
//         onError?.("로그인이 필요합니다.");
//         return;
//       }

//       if (isLargeScreen) {

//         const result = await Swal.fire({
//           title: '클럽에 참여할까요?',
//           html: `
//             <p style="color: #666; margin-bottom: 1rem;">※참여 전 꼭 확인해주세요!</p>
//             <p style="text-align: left; font-size: 0.9rem; margin-bottom: 0.5rem;">1. 모임 시작 전 부득이하게 참여가 어려워진 경우 반드시 호스트에게 미리 알려주세요</p>
//             <p style="text-align: left; font-size: 0.9rem;">2. 무단으로 불참하거나, 함께하는 멤버들에게 피해를 주는 경우 이용 제재를 받게돼요</p>
//           `,
//           showCancelButton: true,
//           confirmButtonText: '네, 참여할게요',
//           cancelButtonText: '아니요',
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//         }).then((result) => {
//           if (result.isConfirmed) {
//            await
//           }
//         });
//       }

//     } catch () {

//     } finally {

//     }
//   };

//   return (
//     <Button colorType="black" borderType="circle" onClick={handleJoin} disabled={isLoading} className="w-full">
//       {isLoading ? "처리중..." : "참여하기"}
//     </Button>
//   );
// }
