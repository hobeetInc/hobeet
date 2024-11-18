"use client";
import { createContext, useContext } from "react";
import { EggClubChatContextType } from "@/types/eggclubchat.types";
import { useRegularChat } from "@/hooks/useRegularChat";

const ChatContext = createContext<EggClubChatContextType>({
  roomName: "",
  isLoading: true
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children, roomId }: { children: React.ReactNode; roomId: string }) {
  // TODO 탠스택 쿼리로 변환 예정
  const { data: chatData, isLoading } = useRegularChat(roomId);

  return (
    <ChatContext.Provider
      value={{
        roomName: chatData?.egg_day_chatting_room_name || "",
        isLoading,
        egg_club_id: chatData?.egg_club_id
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
