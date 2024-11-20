"use client";
import { createContext, useContext } from "react";
import { useOneTimeChat } from "@/hooks/utils/features/chat/useOneTimeChat";
import { EggPopChatContextType } from "@/types/features/chat/eggpopchat.types";

const ChatContext = createContext<EggPopChatContextType>({
  roomName: "",
  isLoading: true
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children, roomId }: { children: React.ReactNode; roomId: string }) {
  // TODO 탠스택 쿼리로 변환 예정
  const { data: chatData, isLoading } = useOneTimeChat(roomId);

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
