"use client";
import { createContext, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/store/AuthContext";

interface ChatContextType {
  roomName: string;
  isLoading: boolean;
  r_c_n_chatting_id?: number;
  regular_club_id?: number;
}

const ChatContext = createContext<ChatContextType>({
  roomName: "",
  isLoading: true
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children, roomId }: { children: React.ReactNode; roomId: string }) {
  const supabase = createClient();
  const { userId } = useAuth();

  const { data: chatData, isLoading } = useQuery({
    queryKey: ["chatRoom", roomId, userId],
    queryFn: async () => {
      try {
        const { data: roomData, error: roomError } = await supabase
          .from("r_c_n_chatting_room")
          .select("*")
          .eq("r_c_n_chatting_room_id", roomId)
          .single();

        if (roomError) throw roomError;
        // console.log(roomData);

        const { data: chatMember, error: chatMemberError } = await supabase
          .from("r_c_member")
          .select("r_c_member_id")
          .eq("user_id", userId)
          .eq("r_c_id", roomData.regular_club_id)
          .single();

        if (chatMemberError) throw chatMemberError;

        const { data: chattingData, error: chattingError } = await supabase
          .from("r_c_n_chatting")
          .select("*")
          .eq("r_c_n_chatting_room_id", roomId)
          .eq("r_c_member_id", chatMember.r_c_member_id)
          .single();

        if (chattingError) throw chattingError;

        return {
          ...roomData,
          r_c_n_chatting_id: chattingData.r_c_n_chatting_id,
          r_c_member_id: chatMember.r_c_member_id
        };
      } catch (error) {
        console.error("Error fetching chat data: ", error);
        throw error;
      }
    },
    enabled: !!roomId && !!userId
  });

  return (
    <ChatContext.Provider
      value={{
        roomName: chatData?.r_c_n_chatting_room_name || "",
        isLoading,
        r_c_n_chatting_id: chatData?.r_c_n_chatting_id,
        regular_club_id: chatData?.regular_club_id
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
