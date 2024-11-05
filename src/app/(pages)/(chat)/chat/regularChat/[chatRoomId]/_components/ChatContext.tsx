"use client";
import { createContext, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/store/AuthContext";
import { EggClubChatContextType } from "@/types/eggclubchat.types";

const ChatContext = createContext<EggClubChatContextType>({
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
          .from("egg_day_chatting_room")
          .select("*")
          .eq("egg_day_chatting_room_id", roomId)
          .single();

        if (roomError) throw roomError;
        // console.log(roomData);

        const { data: chatMember, error: chatMemberError } = await supabase
          .from("egg_club_member")
          .select("egg_club_member_id")
          .eq("user_id", userId)
          .eq("egg_club_id", roomData.regular_club_id)
          .single();

        if (chatMemberError) throw chatMemberError;

        const { data: chattingData, error: chattingError } = await supabase
          .from("egg_day_chatting")
          .select("*")
          .eq("egg_day_chatting_room_id", roomId)
          .eq("egg_club_member_id", chatMember.r_c_member_id)
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
