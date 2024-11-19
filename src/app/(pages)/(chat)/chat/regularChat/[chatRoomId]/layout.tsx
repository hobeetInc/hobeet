"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu } from "lucide-react";
import { ChatProvider, useChatContext } from "./_components/ChatContext";
import Image from "next/image";
import { EggClubChattingMemberInfo } from "@/types/eggclubchat.types";
import { IoCloseOutline } from "react-icons/io5";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import Text from "@/components/uiComponents/TextComponents/Text";
import { ChatRoomExit } from "../../../_api/supabase";
import { useAuthStore } from "@/store/authStore";
import { fetchChattingMembers } from "../../../_api/regular";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    chatRoomId: string;
  };
}

// - 뒤로가기, 채팅방 이름, 메뉴 버튼 포함
// - 메뉴 클릭 시 참여자 목록과 나가기 옵션 표시
// - 채팅방 멤버 정보 관리 및 표시
// - 채팅방 나가기 기능 구현
function ChatHeader() {
  const { roomName, isLoading, egg_day_chatting_id, egg_club_id } = useChatContext();
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ChattingMember, setChattingMember] = useState<EggClubChattingMemberInfo[]>();

  useEffect(() => {
    if (egg_club_id) {
      const fetchMembers = async () => {
        //TODO 탠스택 쿼리로 변환 예정
        const data = await fetchChattingMembers(egg_club_id);
        if (data) {
          setChattingMember(data);
        }
      };
      fetchMembers();
    }
  }, [egg_club_id]);

  const handleBack = () => {
    router.back();
  };

  const handleChatRoomExit = async () => {
    if (confirm("정말로 채팅방을 나가겠습니까? 채팅방을 나가면 다시 들어올수없습니다.")) {
      if (egg_day_chatting_id !== null) {
        const res = await ChatRoomExit(egg_day_chatting_id, true);

        if (res === null) {
          router.replace("/chat");
        } else {
          alert("모임장은 나갈수 없습니다.");
        }
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-4 h-[60px] border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-10">
        <button onClick={handleBack} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <Text variant="header-16" className="text-gray-900">
          {isLoading ? "로딩중..." : roomName}
        </Text>

        <button onClick={() => setIsModalOpen(true)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <Text variant="header-16" className="text-gray-900">
                대화 상대
              </Text>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            <div>
              <ul className="space-y-4">
                {/* 현재 사용자 먼저 렌더링 */}
                {ChattingMember?.filter((member) => member.egg_club_member.user.user_id === userId).map((member) => (
                  <li key={member.egg_club_member.egg_club_member_id}>
                    <div className="flex items-center justify-between py-2 px-4 rounded-md border-solid border-gray-50 border-b-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
                          <Image
                            src={member.egg_club_member.user.user_profile_img}
                            alt="프로필 이미지"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <Text variant="subtitle-16" className="text-gray-900">
                          {member.egg_club_member.user.user_name}
                        </Text>
                        {member.admin && <Tag tagName="eggmaster" variant="black" className="ml-2" />}
                      </div>
                    </div>
                  </li>
                ))}

                {/* 나머지 사용자들 렌더링 */}
                {ChattingMember?.filter((member) => member.egg_club_member.user.user_id !== userId).map((member) => (
                  <li key={member.egg_club_member.egg_club_member_id}>
                    <div className="flex items-center justify-between py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
                          <Image
                            src={member.egg_club_member.user.user_profile_img}
                            alt="프로필 이미지"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <Text variant="subtitle-16" className="text-gray-900">
                          {member.egg_club_member.user.user_name}
                        </Text>
                        {member.admin && <Tag tagName="eggmaster" variant="black" className="ml-2" />}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
              <button
                onClick={handleChatRoomExit}
                className="w-full text-right py-2 px-4 hover:bg-gray-100 rounded-md text-red-500 flex items-center justify-end"
              >
                <Image src="/asset/Icon/icon-vector.svg" alt="나가기" width={18} height={18} className="mr-2" />
                <Text variant="body_medium-14" className="text-gray-500">
                  나가기
                </Text>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// - ChatProvider로 전체 레이아웃 래핑
// - 헤더와 채팅 컨텐츠 영역 구조화
// - 반응형 레이아웃 구현 (flex-col, h-screen)
// - 채팅 영역 스크롤 처리 (overflow-hidden)
export default function ChatRoomLayout({ children, params }: LayoutProps) {
  return (
    <ChatProvider roomId={params.chatRoomId}>
      <div className="flex flex-col h-screen">
        <ChatHeader />
        <div className="flex-1 overflow-hidden mt-[40px]">{children}</div>
      </div>
    </ChatProvider>
  );
}
