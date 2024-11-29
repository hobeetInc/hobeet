"use client";

import Image from "next/image";
import FullScreenModal from "./FullScreenModal";
import { useRouter } from "next/navigation";
import Text from "@/components/uiComponents/atoms/text/Text";
import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
import { IoIosArrowForward } from "react-icons/io";
import browserClient from "@/utils/supabase/client";
import { MemberInfo } from "@/types/features/user/user.types";
import { useState } from "react";
import { submitRegularMember } from "@/app/(pages)/(club)/club/_api/notifications";
import { useEggDayCrewList } from "@/hooks/utils/list/crewList";
import { useAuthStore } from "@/store/authStore";
import { EggDay } from "@/types/features/club/eggday.types";
import { cn } from "@/utils/cn/util";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import FloatingButton from "@/app/(pages)/(club)/club/_components/FloatingButton";

interface CrewListProps {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
  clubInfo: EggDay | undefined;
  secondId: number;
}

const CrewList = ({ crewMembers: initialCrewMembers, clubId, clubHostId, clubInfo, secondId }: CrewListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { data: crewList = initialCrewMembers, isLoading, isError } = useEggDayCrewList(secondId);

  const displaySlots = Array(8)
    .fill(null)
    .map((_, index) => {
      const member = crewList[index];
      return member ? (
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
        <div key={`empty-${index}`} className="w-[40px]">
          <div className="w-[40px] h-[40px] rounded-full border-2 border-gray-200 bg-gray-50"></div>
        </div>
      );
    });

  const handleChatClick = async () => {
    try {
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

  const renderJoinButton = () => {
    if (userId === clubHostId) {
      return (
        <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Text variant="subtitle-16" className={cn(isLargeScreen ? "" : "w-[50%]")}>
            참여 중인 에그데이에요
          </Text>
          <Button
            colorType="yellow"
            borderType="circle"
            sizeType="small"
            className={cn(isLargeScreen ? "w-[732px]" : "w-[50%]")}
            onClick={handleChatClick}
          >
            에그클럽 채팅방
          </Button>
        </div>
      );
    }

    const isAlreadyJoined = crewList.some((member) => member.userId === userId);

    if (isAlreadyJoined) {
      return (
        <div className="w-full h-20 px-4 bg-white border-t border-solid border-gray-50 justify-between items-center inline-flex gap-[10px]">
          <Text variant="subtitle-16" className={cn(isLargeScreen ? "" : "w-[50%]")}>
            참여 중인 에그데이에요
          </Text>
          <Button
            colorType="yellow"
            borderType="circle"
            sizeType="small"
            className={cn(isLargeScreen ? "w-[732px]" : "w-[50%]")}
            onClick={handleChatClick}
          >
            에그클럽 채팅방
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full h-20 bg-white flex justify-center items-center px-4">
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

  if (isLoading) return <Text variant="subtitle-16">로딩 중...</Text>;
  if (isError) return <Text variant="subtitle-16">오류가 발생하였습니다...</Text>;

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
        <div className="w-full  fixed bottom-0 right-0 left-0 bg-white h-[114px]">{renderJoinButton()}</div>
        <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      {isLargeScreen && <FloatingButton />}
    </>
  );
};

export default CrewList;
