"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu } from "lucide-react";
import { ChatProvider, useChatContext } from "./_components/ChatContext";
import { ChatRoomExit } from "@/app/api/_ChatRoomExit/ChatRoomExit";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/utils/cn/util";
import { EggPopChattingMemberInfo, LayoutProps } from "@/types/eggpopchat.types";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { fetchChatRoomMembers } from "@/app/(pages)/(chat)/_api/onetime";

function ChatHeader() {
  const { roomName, isLoading, egg_pop_chatting_room_member_id, egg_pop_id } = useChatContext();
  const [userId, setUserId] = useState("");

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ChattingMember, setChattingMember] = useState<EggPopChattingMemberInfo[]>();
  useEffect(() => {
    const supabase = createClient();
    if (egg_pop_id) {
      const fetchData = async () => {
        const userId = (await supabase.auth.getUser()).data.user?.id;
        setUserId(userId);

        try {
          const members = await fetchChatRoomMembers(egg_pop_id);
          setChattingMember(members);
        } catch (error) {
          console.error("Failed to fetch chat room members:", error);
        }
      };

      fetchData();
    }
  }, [egg_pop_id]);

  const handleBack = () => {
    router.back();
  };

  const handleChatRoomExit = async () => {
    if (confirm("정말로 채팅방을 나가겠습니까? 채팅방을 나가면 다시 들어올수없습니다.")) {
      if (egg_pop_chatting_room_member_id !== null) {
        const res = await ChatRoomExit(egg_pop_chatting_room_member_id, true);
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
      <div
        className={cn(
          "flex items-center justify-between px-4 h-[60px] border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-10"
        )}
      >
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
          <div className={cn("absolute right-0 top-0 h-full w-[280px] bg-white shadow-lg")}>
            <div className={cn("flex justify-between items-center p-4 border-b border-gray-200")}>
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
                {ChattingMember?.filter((member) => member.egg_pop_member_id.user_id.user_id === userId).map(
                  (member) => (
                    <li key={member.egg_pop_member_id.egg_pop_member_id}>
                      <div
                        className={cn(
                          "flex items-center justify-between py-2 px-4 rounded-md border-solid border-gray-50 border-b-2"
                        )}
                      >
                        <div className={cn("flex items-center")}>
                          <div className={cn("w-10 h-10 overflow-hidden rounded-full mr-2")}>
                            <Image
                              src={member.egg_pop_member_id.user_id.user_profile_img}
                              alt="프로필 이미지"
                              width={40}
                              height={40}
                              className={cn("rounded-full")}
                            />
                          </div>
                          <Text variant="subtitle-16" className={cn("text-gray-900")}>
                            {member.egg_pop_member_id.user_id.user_name}
                          </Text>
                          {member.admin && <Tag tagName="eggmaster" variant="black" className={cn("ml-2")} />}
                        </div>
                      </div>
                    </li>
                  )
                )}

                {/* 나머지 사용자들 렌더링 */}
                {ChattingMember?.filter((member) => member.egg_pop_member_id.user_id.user_id !== userId).map(
                  (member) => (
                    <li key={member.egg_pop_member_id.egg_pop_member_id}>
                      <div className={cn("flex items-center justify-between py-2 px-4 rounded-md")}>
                        <div className={cn("flex items-center")}>
                          <div className={cn("w-10 h-10 overflow-hidden rounded-full mr-2")}>
                            <Image
                              src={member.egg_pop_member_id.user_id.user_profile_img}
                              alt="프로필 이미지"
                              width={40}
                              height={40}
                              className={cn("rounded-full")}
                            />
                          </div>
                          <Text variant="subtitle-16" className={cn("text-gray-900")}>
                            {member.egg_pop_member_id.user_id.user_name}
                          </Text>
                          {member.admin && <Tag tagName="eggmaster" variant="black" className={cn("ml-2")} />}
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className={cn("absolute bottom-0 w-full p-4 border-t border-gray-200")}>
              <button
                onClick={handleChatRoomExit}
                className={cn(
                  "w-full text-right py-2 px-4 hover:bg-gray-100 rounded-md text-red-500 flex items-center justify-end"
                )}
              >
                <Image src="/asset/Icon/icon-vector.svg" alt="나가기" width={18} height={18} className={cn("mr-2")} />
                <Text variant="body_medium-14" className={cn("text-gray-500")}>
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
