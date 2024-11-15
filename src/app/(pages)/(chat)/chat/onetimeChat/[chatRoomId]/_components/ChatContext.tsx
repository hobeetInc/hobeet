"use client";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/AuthContext";
import { EggPopChatContextType } from "@/types/eggpopchat.types";
import { fetchEggPopChatRoomWithMembers } from "@/app/(pages)/(chat)/_api/onetime";

const ChatContext = createContext<EggPopChatContextType>({
  roomName: "",
  isLoading: true
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children, roomId }: { children: React.ReactNode; roomId: string }) {
  const { userId } = useAuth();

  const { data: chatData, isLoading } = useQuery({
    queryKey: ["oneTimeChatRoom", roomId, userId],
    queryFn: async () => {
      try {
        const { roomData, chatMember, chattingData } = await fetchEggPopChatRoomWithMembers(roomId, userId!);

        return {
          ...roomData,
          egg_pop_chatting_room_member_id: chattingData.egg_pop_chatting_room_member_id,
          egg_pop_member_id: chatMember.egg_pop_member_id
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
        roomName: chatData?.egg_pop_chatting_room_name || "",
        isLoading,
        egg_pop_chatting_room_member_id: chatData?.egg_pop_chatting_room_member_id,
        egg_pop_id: chatData?.egg_pop_id
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
