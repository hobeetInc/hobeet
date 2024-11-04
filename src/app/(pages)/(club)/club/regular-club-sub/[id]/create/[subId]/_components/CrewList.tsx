"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/store/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getNotificationMember } from "@/app/(pages)/(club)/club/_api/supabase";
import FullScreenModal from "./FullScreenModal";

// 유저 상태 정보
// type ParticipationS = "not_applied" | "pending" | "active";

// 멤버 정보 타입 정의
type MemberInfo = {
  notificationId: number;
  userId: string;
  userName: string;
  userImage: string;
};

// CrewList 컴포넌트 props 타입
interface CrewListProps {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
}

const CrewList = ({ crewMembers: initialCrewMembers, clubId, clubHostId }: CrewListProps) => {
  const [crewList, setCrewList] = useState(initialCrewMembers);
  // const [participationStatus, setParticipationStatus] = useState<ParticipationS>("not_applied");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // console.log("useEffect 실행 시 userId:", userId);

    // 데이터 새로고침 함수
    const refreshData = async () => {
      try {
        const memberResult = await getNotificationMember(clubId);

        console.log("일!!", memberResult);

        const newCrewMemebers = memberResult.map((member) => ({
          notificationId: member.r_c_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        setCrewList(newCrewMemebers);

        // if (userId) {
        //   const statusResult = await getParticipationStatus({ userId, clubId });

        //   setParticipationStatus(statusResult);
        // }

        // if (userId) {
        //   const statusResult = await getParticipationStatus({ userId, clubId });

        // console.log("스테이터스,", statusResult.r_c_participation_request_status);

        // setParticipationStatus(statusResult.r_c_participation_request_status);
        // }
      } catch (error) {
        console.error("크루인원 가져오는 중 오류:", error);
      }
    };

    refreshData();
  }, [clubId, userId]);

  console.log("이거 확인 맴버!!", crewList);

  // 상태 변경 감지를 위한 별도의 useEffect
  // useEffect(() => {
  //   console.log("참여 상태 변경됨:", participationStatus);
  // }, [participationStatus]);

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

  // console.log("참가인지 확인!!", participationStatus);

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
    const isAlreadJoined = crewList.some((member) => member.userId === userId);

    if (isAlreadJoined) {
      return (
        <div className="flex justify-center items-center gap-2">
          <p className="flex-1 h-[50px] pt-4 font-semibold">참여 중인 에그팝이에요</p>
          <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그팝 채팅방</button>
        </div>
      );
    }

    // switch (participationStatus) {
    //   case "active":
    //     return (
    //       <div className="flex justify-center items-center gap-2">
    //         <p className="flex-1 h-[50px] pt-4 font-semibold">참여 중인 에그클럽이에요</p>
    //         <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그데이 채팅방</button>
    //       </div>
    //     );

    //   case "pending":
    //     return (
    //       <div className="flex justify-center items-center gap-2">
    //         <p className="flex-1 h-[50px] pt-4 font-semibold">에그장이 승인중이예요</p>
    //         <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">승인 대기중</button>
    //       </div>
    //     );

    //   case "not_applied":
    //     return <button className="w-full h-[50px] rounded-full bg-black text-white">참여하기</button>;
    // }
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
      {/* <NotificationList notificationData={notificationData} /> */}
      {renderJoinButton()}
      <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CrewList;
