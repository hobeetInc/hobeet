"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/store/AuthContext";

import { ChevronRight } from "lucide-react";
import { getNotificationMember, submitRegularMember } from "@/app/(pages)/(club)/club/_api/supabase";
import FullScreenModal from "./FullScreenModal";
import { useRouter } from "next/navigation";
import { CrewListProps } from "@/types/eggday.types";

const CrewList = ({ crewMembers: initialCrewMembers, clubId, clubHostId, clubInfo, secondId }: CrewListProps) => {
  const [crewList, setCrewList] = useState(initialCrewMembers);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 데이터 새로고침 함수
    const refreshData = async () => {
      try {
        const memberResult = await getNotificationMember(secondId);

        const newCrewMembers = memberResult.map((member) => ({
          notificationId: member.r_c_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        setCrewList(newCrewMembers);
      } catch (error) {
        console.error("크루인원 가져오는 중 오류:", error);
      }
    };

    refreshData();
  }, [clubId, userId, secondId]);

  // 8개의 고정 슬롯 생성
  const displaySlots = Array(8)
    .fill(null)
    .map((_, index) => {
      const member = crewList[index];
      return member ? (
        // 멤버가 있는 경우
        <div key={member.userId} className="w-[37px]">
          <div className="relative w-[37px] h-[37px] overflow-hidden rounded-full">
            <Image
              src={member.userImage}
              alt={member.userName}
              width={37}
              height={37}
              className="w-full h-full object-cover border-2 border-black"
            />
          </div>
        </div>
      ) : (
        // 빈 슬롯
        <div key={`empty-${index}`} className="w-[37px]">
          <div className="w-[37px] h-[37px] rounded-full border-2 border-gray-200 bg-gray-50"></div>
        </div>
      );
    });

  // 버튼 렌더링 함수
  const renderJoinButton = () => {
    if (userId === clubHostId) {
      return (
        <div className="flex justify-center items-center gap-2">
          <button className="flex-1 bg-yellow-100 h-[50px] rounded-full">에그즈 관리</button>
          <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그팝 채팅방</button>
        </div>
      );
    }

    // 가입한 크루일 때
    const isAlreadyJoined = crewList.some((member) => member.userId === userId);

    if (isAlreadyJoined) {
      return (
        <div className="flex justify-center items-center gap-2">
          <p className="flex-1 h-[50px] pt-4 font-semibold">참여 중인 에그팝이에요</p>
          <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그팝 채팅방</button>
        </div>
      );
    }

    return (
      <button
        onClick={async () => {
          try {
            if (clubInfo?.r_c_notification_tax === 0) {
              const addMember = {
                r_c_notification_id: secondId,
                user_id: userId
              };

              await submitRegularMember(addMember);
              alert("에그데이에 참여되었습니다");
              window.location.reload();
            } else {
              router.push(`/kakaopay/paymentConfirm?clubType=false&clubId=${secondId}`);
            }
          } catch (error) {
            console.log("공지 맴버 추가 중 오류:", error);
          }
        }}
        className="w-full h-[50px] bg-yellow-300 rounded-full"
      >
        참여하기
      </button>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-extrabold text-[20px]">{`참여중인 에그즈 ${crewList.length}명`}</h1>
          <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-black">
            <ChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-8 grid-flow-col gap-2 w-full">{displaySlots}</div>
      </div>
      {renderJoinButton()}
      <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CrewList;
