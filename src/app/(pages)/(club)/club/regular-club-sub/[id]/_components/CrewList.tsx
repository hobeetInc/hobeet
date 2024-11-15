"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getParticipationStatus, getRegularMember } from "../../../_api/supabase";
import { useAuth } from "@/store/AuthContext";
import FullScreenModal from "./FullScreenModal";
import NotificationList from "./NotificationList";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";
import { CrewListProps, UserStatus } from "@/types/eggclub.types";
import RegularClubJoinButton from "@/app/(pages)/(club)/club/regular-club-sub/[id]/_components/RegularClubJoinButtonCom";
import Text from "@/components/uiComponents/TextComponents/Text";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/uiComponents/Button/ButtonCom";

const CrewList = ({ crewMembers: initialCrewMembers, clubId, clubHostId, notificationData }: CrewListProps) => {
  const [crewList, setCrewList] = useState(initialCrewMembers);
  const [participationStatus, setParticipationStatus] = useState<UserStatus>("not_applied");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 데이터 새로고침 함수
    const refreshData = async () => {
      try {
        const memberResult = await getRegularMember(clubId);

        const newCrewMemebers = memberResult.map((member) => ({
          memberId: member.r_c_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        setCrewList(newCrewMemebers);

        if (userId) {
          const statusResult = await getParticipationStatus({ userId, clubId });

          setParticipationStatus(statusResult[0].egg_club_participation_request_status);
        }
      } catch (error) {
        console.error("크루인원 가져오는 중 오류:", error);
      }
    };

    refreshData();
  }, [clubId, userId]);

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

  // 로그인 페이지로 이동
  const handleLoginRedirect = () => {
    alert("로그인이 필요한 서비스입니다");
    router.push("/signin");
  };

  const handleWaiting = () => {
    alert("모임장 승인을 기다리는 중입니다");
    return;
  };

  // 채팅방으로 이동하는 함수
  const handleChatClick = async () => {
    try {
      // 채팅방 아이디 가져오기
      const { data: chatRoom } = await browserClient
        .from("egg_day_chatting_room")
        .select("egg_day_chatting_room_id")
        .eq("egg_club_id", clubId)
        .single();

      // console.log("정기적모임 아이디", chatRoom);

      if (chatRoom) {
        router.push(`/chat/regularChat/${chatRoom.egg_day_chatting_room_id}`);
      }
    } catch (error) {
      console.error("채팅방 이동 중 오류:", error);
    }
  };

  // 버튼 렌더링 함수
  const renderJoinButton = () => {
    // 로그아웃 상태
    if (!userId) {
      return (
        <div className="w-full h-20 flex justify-center items-center bg-white border-t border-solid border-gray-50">
          <Button
            colorType="black"
            borderType="circle"
            onClick={(e) => {
              e.preventDefault();

              handleLoginRedirect();
            }}
          >
            참여하기
          </Button>
        </div>
        // <button
        //   type="button"
        //   onClick={(e) => {
        //     e.preventDefault();

        //     handleLoginRedirect();
        //   }}
        //   className="w-full h-[50px] rounded-full bg-black text-white cursor-pointer" // cursor-pointer 추가
        // >
        //   참여하기
        // </button>
      );
    }

    if (userId === clubHostId) {
      return (
        <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Button
            borderType="circle"
            sizeType="small"
            className="w-[50%] bg-gray-100 text-primary-900"
            onClick={() => router.push(`/approvemembers/${clubId}`)}
          >
            에그즈 관리
          </Button>

          <Button colorType="black" borderType="circle" sizeType="small" className="w-[50%]" onClick={handleChatClick}>
            에그클럽 채팅방
          </Button>
        </div>
        // <div className="flex justify-center items-center gap-2">
        //   <button
        //     onClick={() => router.push(`/approvemembers/${clubId}`)}
        //     className="flex-1 bg-yellow-100 h-[50px] rounded-full"
        //   >
        //     에그즈 관리
        //   </button>
        //   <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그팝 채팅방</button>
        // </div>
      );
    }

    switch (participationStatus) {
      case "active":
        return (
          <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
            <Text variant="subtitle-16" className="w-[50%]">
              참여 중인 에그클럽이에요
            </Text>
            <Button
              colorType="black"
              borderType="circle"
              sizeType="small"
              className="w-[50%]"
              onClick={handleChatClick}
            >
              에그클럽 채팅방
            </Button>
          </div>

          // <div className="flex justify-center items-center gap-2">
          //   <p className="flex-1 h-[50px] pt-4 font-semibold">참여 중인 에그클럽이에요</p>
          //   <button onClick={handleChatClick} className="flex-1 bg-yellow-300  h-[50px] rounded-full">
          //     에그데이 채팅방
          //   </button>
          // </div>
        );

      case "pending":
        return (
          <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
            <Text variant="subtitle-16" className="w-[50%]">
              에그장이 승인중이예요
            </Text>
            <button
              className="w-[50%] px-2.5 py-3.5 bg-gray-50 rounded-[25px] justify-center items-center gap-2.5 inline-flex"
              onClick={handleWaiting}
            >
              <Text variant="subtitle-16" className="text-gray-200">
                승인 대기중
              </Text>
            </button>
          </div>

          // <div className="flex justify-center items-center gap-2">
          //   <p className="flex-1 h-[50px] pt-4 font-semibold">에그장이 승인중이예요</p>
          //   <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">승인 대기중</button>
          // </div>
        );

      case "not_applied":
        return (
          <div className="w-full  h-20 flex justify-center items-center bg-white border-t border-solid border-gray-50 ">
            <RegularClubJoinButton
              clubId={clubId}
              onSuccess={() => {}}
              onError={(message) => {
                alert(message);
              }}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className="w-full flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
            <Text variant="subtitle-18">참여 중인 에그즈</Text>
            <Text variant="subtitle-18">{crewList.length}명</Text>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="w-6 h-6 text-gray-600 hover:text-black">
            <IoIosArrowForward className="w-full h-full" />
          </button>
        </div>
        <div className="self-stretch justify-start items-center gap-[5px] inline-flex mb-[17px]">{displaySlots}</div>

        <div className="w-full ">
          <NotificationList notificationData={notificationData} crewMembers={crewList}>
            <div className="w-full fixed bottom-[34px] right-0 left-0">{renderJoinButton()}</div>
          </NotificationList>
        </div>
        <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default CrewList;

// <>
//   <div className="flex flex-col gap-4">
//     <div className="flex justify-between">
//       <h1 className="font-extrabold text-[20px]">{`참여중인 에그즈 ${crewList.length}명`}</h1>
//       <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-black">
//         <ChevronRight />
//       </button>
//     </div>
//     <div className="grid grid-cols-8 grid-flow-col gap-2 w-full">{displaySlots}</div>
//   </div>
//   <NotificationList notificationData={notificationData} crewMembers={crewList} />
//   {renderJoinButton()}
//   <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
// </>
