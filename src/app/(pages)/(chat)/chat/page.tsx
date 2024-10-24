"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [chatRooms, setChatRooms] = useState<ChattingRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchChatRooms = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      const userId = data.user?.id;

      if (error || !userId) {
        console.error("사용자 정보 못 가져왔음: ", error);
        setErrorMessage("사용자 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/getChatRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        const chatData: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(chatData.message || "서버에서 오류가 발생했습니다.");
        }

        const rooms: ChattingRoom[] = chatData.data.flatMap((member) =>
          member.r_c_n_chatting.map((chatting) => ({
            user_id: member.user_id,
            regular_club_id: member.r_c_id,
            r_c_n_chatting_room_id: chatting.r_c_n_chatting_room.r_c_n_chatting_room_id,
            r_c_n_chatting_room_name: chatting.r_c_n_chatting_room.r_c_n_chatting_room_name
          }))
        );

        setChatRooms(rooms);
      } catch (error) {
        console.error("서버 오류:", error);
        setErrorMessage("채팅방 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <>
      <div className="bg-[#D9D9D9] flex w-[358px] h-[91px] self-center justify-center items-center flex-shrink-0">
        광고배너
      </div>
      <div className="flex flex-col w-[358px] h-[calc(100%-91px)]">
        <div className="flex flex-col w-full h-[50px] border-b border-[#D9D9D9]">
          <div className="flex w-full h-full justify-center items-center">
            <div className="text-[#000000] font-bold text-lg">채팅</div>
          </div>
        </div>
        <div className="flex flex-col w-full overflow-y-auto">
          {chatRooms.length > 0 ? (
            chatRooms.map((room) => (
              <div key={room.r_c_n_chatting_room_id} className="p-4 border-b">
                {room.r_c_n_chatting_room_name}
              </div>
            ))
          ) : (
            <div className="text-center">채팅방이 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};

interface ChattingRoom {
  user_id: string;
  regular_club_id: number;
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room_name: string;
}

interface Chatting {
  admin: boolean;
  r_c_id: number;
  r_c_member_id: number;
  r_c_n_chatting_id: number;
  r_c_n_chatting_room: ChattingRoom;
}

interface Member {
  r_c_id: number;
  r_c_member_id: number;
  r_c_n_chatting: Chatting[];
  r_c_participation_request_id: number;
  user_id: string;
}

interface ApiResponse {
  data: Member[];
  message?: string;
}
export default ChatPage;
