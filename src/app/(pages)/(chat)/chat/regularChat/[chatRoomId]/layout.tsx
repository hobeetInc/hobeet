"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu, X } from "lucide-react";
import { ChatProvider, useChatContext } from "./_components/ChatContext";
import { ChatRoomExit } from "@/app/api/_ChatRoomExit/ChatRoomExit";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    chatRoomId: string;
  };
}

type ChattingMember = {
  active: boolean;
  admin: boolean;
  r_c_id: number;
  r_c_member_id: {
    r_c_id: number;
    r_c_member_id: number;
    regular_club_request_status: string;
    user_id: {
      user_age: number;
      user_create_at: string;
      user_email: string;
      user_gender: string;
      user_id: string;
      user_name: string;
      user_profile_img: string;
      user_roletype: boolean;
    };
    r_c_n_chatting_id: number;
    r_c_n_chatting_room_id: number;
  };
};

function ChatHeader() {
  const { roomName, isLoading, r_c_n_chatting_id, regular_club_id } = useChatContext();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ChattingMember, setChattingMember] = useState<ChattingMember[]>();
  // console.log(regular_club_id);
  useEffect(() => {
    const supabase = createClient();
    if (regular_club_id) {
      const fetchRegularClubId = async () => {
        const { data, error } = await supabase
          .from("r_c_n_chatting")
          .select(`* , r_c_member_id(* , user_id(*))`)
          .eq("r_c_id", regular_club_id)
          .eq("active", true);
        if (error) {
          console.error(error);
          return;
        }

        setChattingMember(data);
      };
      fetchRegularClubId();
    }
  }, [regular_club_id]);

  // console.log(ChattingMember);

  const handleBack = () => {
    router.back();
  };

  const handleChatRoomExit = async () => {
    if (confirm("정말로 채팅방을 나가겠습니까? 채팅방을 나가면 다시 들어올수없습니다.")) {
      if (r_c_n_chatting_id) {
        const res = await ChatRoomExit(r_c_n_chatting_id, true);

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

        <h1 className="text-lg font-medium">{isLoading ? "로딩중..." : roomName}</h1>

        <button onClick={() => setIsModalOpen(true)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">메뉴</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <div className="w-full text-left py-2 px-4 rounded-md">참여자 정보</div>
                </li>
                {ChattingMember?.map((member) => (
                  <li key={member.r_c_member_id.r_c_member_id}>
                    <div className="flex items-center justify-between py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 overflow-hidden rounded-full mr-2">
                          <Image
                            src={member.r_c_member_id.user_id.user_profile_img}
                            alt="프로필 이미지"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <span>{member.r_c_member_id.user_id.user_name}</span>
                      </div>
                      {member.admin && <span className="text-sm text-gray-500">모임장</span>}
                    </div>
                  </li>
                ))}

                <li>
                  <button
                    onClick={handleChatRoomExit}
                    className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md text-red-500"
                  >
                    채팅방 나가기
                  </button>
                </li>
              </ul>
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
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </ChatProvider>
  );
}
