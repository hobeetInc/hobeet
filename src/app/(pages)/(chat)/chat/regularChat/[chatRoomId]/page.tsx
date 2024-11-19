"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ExtendEggClubMessage } from "@/types/eggclubchat.types";
import Text from "@/components/uiComponents/TextComponents/Text";
import { useAuthStore } from "@/store/authStore";
import { fetchChatInfo, fetchEggClubId, fetchMemberData, fetchMessages } from "../../../_api/regular";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { sendMessage } from "../../../_api/regular";
import ChatInput from "./_components/ChatInput";
import { cn } from "@/utils/cn/util";

const supabase = createClient();

// 주요 기능:
// 1. 실시간 메시지 처리
//    - Supabase 실시간 구독 설정
//    - 새 메시지 수신 시 자동 업데이트

// 2. 메시지 그룹화 및 표시
//    - 날짜별 메시지 그룹화
//    - 사용자별 메시지 스타일 차별화 (본인/타인)
//    - 시간 표시 및 프로필 이미지 처리

// 3. 메시지 입력 처리
//    - 텍스트 입력 자동 높이 조절
//    - Enter 키 전송 지원
//    - 최대 길이 제한 (100자)
//    - 전송 버튼 상태 관리

// 4. 스크롤 관리
//    - 새 메시지 수신 시 자동 스크롤
//    - 메시지 영역 오버플로우 처리

// 5. 데이터 관리
//    - React Query를 사용한 메시지 데이터 관리
//    - 실시간 업데이트를 위한 쿼리 무효화
//    - 로딩 상태 처리
const ChatPage = () => {
  const params = useParams();
  const roomId = params.chatRoomId;
  const [newMessage, setNewMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const userId = useAuthStore((state) => state.userId);

  // 1. 모임 ID 조회
  const { data: rec, isSuccess: isRecFetched } = useQuery({
    queryKey: queryKeys.regularChat.eggClubId(roomId as string),
    queryFn: () => fetchEggClubId(roomId as string),
    enabled: Boolean(roomId) && Boolean(userId),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0
  });

  // 2. 멤버 데이터 조회
  const { data: memberData } = useQuery({
    queryKey: queryKeys.regularChat.memberData(userId as string),
    queryFn: () => fetchMemberData(userId as string, rec.egg_club_id),
    enabled: Boolean(userId) && isRecFetched,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0
  });

  // 3. 채팅방 정보 조회
  const { data: chatInfo } = useQuery({
    queryKey: queryKeys.regularChat.chatInfo(roomId as string),
    queryFn: () => fetchChatInfo(roomId as string, memberData.egg_club_member_id),
    enabled: Boolean(roomId) && Boolean(memberData),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0
  });

  // 4. 메시지 목록 조회
  const { data: regularMessages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: queryKeys.regularChat.messages(roomId as string, chatInfo?.chat_room_entry_time),
    queryFn: () => fetchMessages(roomId as string, chatInfo?.chat_room_entry_time),
    enabled: Boolean(roomId) && Boolean(chatInfo?.chat_room_entry_time),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 새 메시지가 추가될 때마다 스크롤 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [regularMessages]);

  // 메시지 전송 무테이션
  const sendMessageMutation = useMutation({
    mutationFn: (messageContent: string) => {
      if (!chatInfo || !userId) throw new Error("전송실패실패실패");
      return sendMessage({
        roomId: roomId as string,
        userId,
        chatInfo,
        messageContent
      });
    },
    onSuccess: async () => {
      setNewMessage("");
      // 즉시 쿼리를 무효화하고 다시 가져오기
      await queryClient.invalidateQueries({
        queryKey: queryKeys.regularChat.messages(roomId as string, chatInfo?.chat_room_entry_time)
      });
      await queryClient.refetchQueries({
        queryKey: queryKeys.regularChat.messages(roomId as string, chatInfo?.chat_room_entry_time)
      });
    }
  });

  // 실시간 구독 설정
  useEffect(() => {
    if (!roomId || !chatInfo?.chat_room_entry_time) return;

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "egg_day_chatting_message",
          filter: `egg_day_chatting_room_id=eq.${roomId}`
        },
        async () => {
          // 즉시 쿼리를 무효화하고 다시 가져오기
          await queryClient.invalidateQueries({
            queryKey: queryKeys.regularChat.messages(roomId as string, chatInfo?.chat_room_entry_time)
          });
          await queryClient.refetchQueries({
            queryKey: queryKeys.regularChat.messages(roomId as string, chatInfo?.chat_room_entry_time)
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient, chatInfo?.chat_room_entry_time]);

  // 텍스트영역 높이 자동조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [newMessage]);

  // 메시지 날짜별 그룹화
  const groupMessagesByDate = (messages: ExtendEggClubMessage[]) => {
    return messages.reduce((acc: { [date: string]: ExtendEggClubMessage[] }, message) => {
      const date = new Date(message.egg_day_chatting_message_create_at);
      const dateString = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      // 요일을 별도로 가져와서 괄호와 함께 추가
      const weekday = date.toLocaleDateString("ko-KR", { weekday: "long" }).replace("요일", ""); // "요일" 텍스트 제거

      const formattedDate = `${dateString} (${weekday})`;

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(message);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(regularMessages);

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessageMutation.mutate(newMessage);
  };

  if (isLoadingMessages) {
    return <div className="p-4 text-center">메시지를 불러오는 중...</div>;
  }

  return (
    <div className={cn("flex flex-col h-full")}>
      <div className={cn("flex-grow overflow-y-auto")}>
        <div className={cn("p-4")}>
          {Object.keys(groupedMessages).length > 0 ? (
            Object.keys(groupedMessages).map((dateString) => (
              <div key={dateString} className={cn("mb-10")}>
                <div className={cn("justify-items-center")}>
                  <div
                    className={cn(
                      "w-[135px] h-[25px] px-2 py-1 rounded-[10px] border border-solid border-gray-50 mb-4 text-center mt-5"
                    )}
                  >
                    <Text variant="body-12" className={cn("text-gray-500")}>
                      {dateString}
                    </Text>
                  </div>
                </div>
                {groupedMessages[dateString].map((message: ExtendEggClubMessage) => {
                  const date = new Date(message.egg_day_chatting_message_create_at);
                  const isCurrentUser = message.user.user_id === userId;

                  return (
                    <div
                      key={message.egg_day_chatting_message_id}
                      className={cn("flex items-start mb-4", isCurrentUser ? "justify-end" : "justify-start")}
                    >
                      <div className={cn("flex flex-col", isCurrentUser ? "items-end" : "items-start")}>
                        {!isCurrentUser && (
                          <div className={cn("flex")}>
                            <div
                              className={cn(
                                "flex items-center mr-2 border-solid border-[1px] rounded-full w-[40px] h-[40px]"
                              )}
                            >
                              <Image
                                src={message.user.user_profile_img}
                                alt={`${message.user.user_name}의 프로필 이미지`}
                                width={40}
                                height={40}
                                className={cn("rounded-full")}
                              />
                            </div>
                            <span className={cn("text-sm content-center text-gray-600 block")}>
                              {message.user.user_name}
                            </span>
                          </div>
                        )}
                        <div className={cn("flex items-center")}>
                          {isCurrentUser && (
                            <span className={cn("text-xs text-gray-500 block self-end mr-2")}>
                              {date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                              })}
                            </span>
                          )}

                          <div
                            className={cn(
                              "max-w-xs break-words p-3 rounded-[16px]",
                              isCurrentUser ? "bg-[#ffe399]" : "bg-[#f2f2f2] ml-10",
                              "text-gray-900"
                            )}
                          >
                            <p className={cn("max-w-[150px]")}>{message.egg_day_chatting_message_content}</p>
                          </div>
                          {!isCurrentUser && (
                            <span className={cn("text-xs text-gray-500 block self-end ml-1")}>
                              {date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className={cn("text-center mt-[120px]")}>메시지가 없습니다.</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 채팅 입력 */}
      <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
