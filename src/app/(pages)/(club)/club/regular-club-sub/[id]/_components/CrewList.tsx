"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getParticipationStatus } from "../../../_api/supabase";
import FullScreenModal from "./FullScreenModal";
import NotificationList from "./NotificationList";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";
import { UserStatus } from "@/types/features/club/eggclub.types";
import RegularClubJoinButton from "@/app/(pages)/(club)/club/regular-club-sub/[id]/_components/RegularClubJoinButtonCom";
import Text from "@/components/uiComponents/atoms/text/Text";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
import { useEggClubCrewList } from "@/hooks/utils/list/crewList";
import { useAuthStore } from "@/store/authStore";
import { useClubStore } from "@/store/crewStore";

const CrewList = () => {
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();
  const { hostInfo, clubInfo, crewMembers } = useClubStore();

  const [participationStatus, setParticipationStatus] = useState<UserStatus>("not_applied");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const clubId = clubInfo?.egg_club_id;

  const { data: crewList = crewMembers, isLoading, isError } = useEggClubCrewList(clubId);

  useEffect(() => {
    // 데이터 새로고침 함수
    const refreshData = async () => {
      try {
        if (userId) {
          const statusResult = await getParticipationStatus({ userId, clubId });

          setParticipationStatus(statusResult[0].egg_club_participation_request_status as UserStatus);
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
        <div key={member.userId} className="w-[40px]">
          <div className="relative w-[40px] h-[40px] overflow-hidden rounded-full">
            <Image
              src={member.userImage}
              alt={member.userName}
              width={40}
              height={40}
              className="w-full h-full object-cover border-2 border-black"
            />
          </div>
        </div>
      ) : (
        // 빈 슬롯
        <div key={`empty-${index}`} className="w-[40px]">
          <div className="w-[40px] h-[40px] rounded-full border-2 border-gray-200 bg-gray-50"></div>
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
      );
    }

    if (userId === hostInfo.userId) {
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

  if (isLoading) return <Text variant="subtitle-16">로딩 중...</Text>;
  if (isError) return <Text variant="subtitle-16">오류가 발생하였습니다...</Text>;

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

        <div className="self-stretch h-[0px] mt-[15px] mb-4 border border-solid border-gray-50"></div>

        <div className="w-full ">
          <NotificationList crewMembers={crewList}>
            <div className="w-full  fixed bottom-0 right-0 left-0 bg-white h-[114px]">{renderJoinButton()}</div>
          </NotificationList>
        </div>
        <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default CrewList;
