"use client";
import { createContext, useContext } from "react";
import { EggClubChatContextType } from "@/types/eggclubchat.types";
import { useRegularChat } from "@/hooks/useRegularChat";

// 채팅방의 기본 컨텍스트 정의
// roomName: 채팅방 이름
// isLoading: 로딩 상태
const ChatContext = createContext<EggClubChatContextType>({
  roomName: "",
  isLoading: true
});

// 커스텀 훅: 다른 컴포넌트에서 채팅 컨텍스트에 쉽게 접근
export const useChatContext = () => useContext(ChatContext);

// ChatProvider: 채팅 관련 데이터를 하위 컴포넌트에 제공하는 래퍼 컴포넌트
// roomId를 받아서 해당 채팅방의 데이터를 불러오고 제공
export function ChatProvider({ children, roomId }: { children: React.ReactNode; roomId: string }) {
  // useRegularChat 훅을 통해 채팅방 데이터 로드
  const { data: chatData, isLoading } = useRegularChat(roomId);

  // 컨텍스트를 통해 채팅방 이름과 로딩 상태를 하위 컴포넌트에 전달
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
