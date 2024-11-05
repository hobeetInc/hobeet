"use client";
import { createContext, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/store/AuthContext";
import { EggPopChatContextType } from "@/types/eggpopchat.types";

const ChatContext = createContext<EggPopChatContextType>({
  roomName: "",
  isLoading: true
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children, roomId }: { children: React.ReactNode; roomId: string }) {
  const supabase = createClient();
  const { userId } = useAuth();

  const { data: chatData, isLoading } = useQuery({
    queryKey: ["oneTimeChatRoom", roomId, userId],
    queryFn: async () => {
      try {
        const { data: roomData, error: roomError } = await supabase
          .from("egg_pop_chatting_room")
          .select("*")
          .eq("egg_pop_chatting_room_id", roomId)
          .single();

        if (roomError) throw roomError;
        // console.log(roomData);

        const { data: chatMember, error: chatMemberError } = await supabase
          .from("egg_pop_member")
          .select("egg_pop_member_id")
          .eq("user_id", userId)
          .eq("egg_pop_id", roomData.one_time_club_id)
          .single();

        if (chatMemberError) throw chatMemberError;

        const { data: chattingData, error: chattingError } = await supabase
          .from("egg_pop_chatting_room_member")
          .select("*")
          .eq("egg_pop_chatting_room_id", roomId)
          .eq("egg_pop_member_id", chatMember.egg_pop_member_id)
          .single();

        if (chattingError) throw chattingError;

        return {
          ...roomData,
          one_time_club_chatting_room_member_id: chattingData.one_time_club_chatting_room_member_id,
          one_time_member_id: chatMember.o_t_c_member_id
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
        roomName: chatData?.one_time_club_chatting_room_name || "",
        isLoading,
        one_time_club_chatting_room_id: chatData?.one_time_club_chatting_room_id,
        one_time_club_id: chatData?.one_time_club_id
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
