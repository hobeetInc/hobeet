"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getOneTimeMember } from "../../../_api/supabase";
import FullScreenModal from "./FullScreenModal";
import { useAuth } from "@/store/AuthContext";
import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { CrewListProps } from "@/types/eggpop.types";
import OneTimeClubJoinButton from "./OneTimeClubJoinButtonCom";
import Text from "@/components/uiComponents/TextComponents/Text";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/uiComponents/Button/ButtonCom";

const CrewList = ({ crewMembers: initialCrewMembers, clubId, clubHostId }: CrewListProps) => {
  const [crewList, setCrewList] = useState(initialCrewMembers);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 데이터 새로고침 함수
    const refreshData = async () => {
      try {
        const data = await getOneTimeMember(clubId);

        const newCrewMembers = data.map((member) => ({
          memberId: member.egg_pop_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        setCrewList(newCrewMembers);
      } catch (error) {
        console.error("크루인원 가져오는 중 오류:", error);
      }
    };

    // 15분마다 데이터 새로고침
    const intervalid = setInterval(refreshData, 900000);
    refreshData();

    //클린업 함수
    return () => clearInterval(intervalid);
  }, [clubId]);

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
  const isAlreadJoined = crewList.some((member) => member.userId === userId);

  // 버튼 렌더링 함수
  const renderJoinButton = () => {
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

    if (isAlreadJoined) {
      return (
        <div className="px-4 w-full h-20 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Text variant="subtitle-16" className="w-[50%]">
            참여 중인 에그팝이에요
          </Text>
          <Button colorType="orange" borderType="circle" sizeType="small" className="w-[50%]" onClick={handleChatClick}>
            에그팝 채팅방
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full h-20 flex justify-center items-center bg-white border-t border-solid border-gray-50">
        <OneTimeClubJoinButton clubId={clubId} />
      </div>
    );
  };

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

        <div className="w-full fixed bottom-[34px] right-0 left-0">{renderJoinButton()}</div>
        <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default CrewList;
