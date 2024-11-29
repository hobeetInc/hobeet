"use client";

import Image from "next/image";
import { useState } from "react";
import FullScreenModal from "./FullScreenModal";
import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import OneTimeClubJoinButton from "./OneTimeClubJoinButtonCom";
import Text from "@/components/uiComponents/atoms/text/Text";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
import { useAuthStore } from "@/store/authStore";
import { useEggPopCrewList } from "@/hooks/utils/list/crewList";
import { MemberInfo } from "@/types/features/user/user.types";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { cn } from "@/utils/cn/util";

// CrewList 컴포넌트 props 타입
interface CrewListProps {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
}
const CrewList = ({ crewMembers: initialCrewMembers, clubId, clubHostId }: CrewListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { data: crewList = initialCrewMembers, isLoading, isError } = useEggPopCrewList(clubId);

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

  // 채팅방으로 이동하는 함수
  const handleChatClick = async () => {
    try {
      // 채팅방 아이디 가져오기
      const { data: chatRoom } = await browserClient
        .from("egg_pop_chatting_room")
        .select("egg_pop_chatting_room_id")
        .eq("egg_pop_id", clubId)
        .single();

      if (chatRoom) {
        router.push(`/chat/onetimeChat/${chatRoom.egg_pop_chatting_room_id}`);
      }
    } catch (error) {
      console.error("채팅방 이동 중 오류:", error);
    }
  };

  // 호스트일 때
  const isHost = userId === clubHostId;

  // 가입한 크루일 때
  const isAlreadyJoined = crewList.some((member) => member.userId === userId);

  // 로그인 안된 유저 로그인 알랏창 띄우기
  const handleAlertLogin = () => {
    alert("로그인 후 이용 가능한 서비스입니다");
    return;
  };

  // 버튼 렌더링 함수
  const renderJoinButton = () => {
    if (!userId) {
      return (
        <div className="w-full h-20 flex justify-center items-center bg-white border-t border-solid border-gray-50 px-4">
          <Button onClick={handleAlertLogin} colorType="orange" borderType="circle">
            참여하기
          </Button>
        </div>
      );
    }

    if (isHost) {
      return (
        <div className="px-4 w-full h-20 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <div className="w-[50%] px-2.5 py-3.5 bg-primary-300 rounded-[25px] justify-center items-center gap-2 inline-flex">
            <Text variant="subtitle-16">{`참여 ${crewList.length}명`}</Text>
          </div>
          <Button colorType="orange" borderType="circle" sizeType="small" className="w-[50%]" onClick={handleChatClick}>
            에그팝 채팅방
          </Button>
        </div>
      );
    }

    if (isAlreadyJoined) {
      return (
        <div className="px-4 w-full h-20 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Text variant="subtitle-16" className={cn(isLargeScreen ? "" : "w-[50%]")}>
            참여 중인 에그팝이에요
          </Text>
          <Button
            colorType="orange"
            borderType="circle"
            sizeType="small"
            className={cn(isLargeScreen ? "w-[732px]" : "w-[50%]")}
            onClick={handleChatClick}
          >
            에그팝 채팅방
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full h-20 flex justify-center items-center bg-white border-t border-solid border-gray-50 px-4">
        <OneTimeClubJoinButton clubId={clubId} />
      </div>
    );
  };

  if (isLoading) return <Text variant="subtitle-16">로딩 중...</Text>;
  if (isError) return <Text variant="subtitle-16">오류가 발생하였습니다...</Text>;

  return (
    <>
      <div className="w-full h-20 flex-col justify-start items-start gap-4 flex mb-[155px]">
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

        <div className="w-full  fixed bottom-0 right-0 left-0 bg-white h-[114px]">{renderJoinButton()}</div>
        <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default CrewList;
