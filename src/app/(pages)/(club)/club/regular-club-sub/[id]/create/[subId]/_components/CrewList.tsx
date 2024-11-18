"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/AuthContext";
import { getNotificationMember, submitRegularMember } from "@/app/(pages)/(club)/club/_api/supabase";
import FullScreenModal from "./FullScreenModal";
import { useRouter } from "next/navigation";
import { CrewListProps } from "@/types/eggday.types";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import { IoIosArrowForward } from "react-icons/io";
import browserClient from "@/utils/supabase/client";

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
          egg_day_id: member.r_c_member_id,
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
    if (userId === clubHostId) {
      return (
        <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Text variant="subtitle-16" className="w-[50%]">
            내가 만든 에그데이에요
          </Text>
          <Button colorType="yellow" borderType="circle" sizeType="small" className="w-[50%]" onClick={handleChatClick}>
            에그클럽 채팅방
          </Button>
        </div>

        // <div className="flex justify-center items-center gap-2">
        //   <button className="flex-1 bg-yellow-100 h-[50px] rounded-full">에그즈 관리</button>
        //   <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그팝 채팅방</button>
        // </div>
      );
    }

    // 가입한 크루일 때
    const isAlreadyJoined = crewList.some((member) => member.userId === userId);

    if (isAlreadyJoined) {
      return (
        <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Text variant="subtitle-16" className="w-[50%]">
            참여 중인 에그데이에요
          </Text>
          <Button colorType="yellow" borderType="circle" sizeType="small" className="w-[50%]" onClick={handleChatClick}>
            에그클럽 채팅방
          </Button>
        </div>

        // <div className="flex justify-center items-center gap-2">
        //   <p className="flex-1 h-[50px] pt-4 font-semibold">참여 중인 에그팝이에요</p>
        //   <button className="flex-1 bg-yellow-300  h-[50px] rounded-full">에그팝 채팅방</button>
        // </div>
      );
    }

    return (
      <div className="w-full h-20 bg-white flex justify-center items-center">
        <Button
          colorType="yellow"
          borderType="circle"
          onClick={async () => {
            try {
              if (clubInfo?.egg_day_tax === 0) {
                const addMember = {
                  egg_day_id: secondId,
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
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-20 flex-col justify-start items-start gap-4 flex mb-[147px]">
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
        <div className="w-full fixed bottom-0 right-0 left-0 bg-white h-[114px]">{renderJoinButton()}</div>
        <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default CrewList;

{
  /* <>
<div className="w-full flex flex-col gap-4">
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
</> */
}
