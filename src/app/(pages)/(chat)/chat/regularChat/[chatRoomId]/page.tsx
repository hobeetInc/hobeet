"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ExtendEggClubMessage } from "@/types/eggclubchat.types";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { useAuthStore } from "@/store/authStore";
import { fetchChatInfo, fetchEggClubId, fetchMemberData, fetchMessages } from "../../../_api/regular";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { sendMessage } from "../../../_api/regular";

const supabase = createClient();

const ChatPage = () => {
  const params = useParams();
  const roomId = params.chatRoomId;
  const [newMessage, setNewMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sendIconColor, setSentIconColor] = useState<boolean>(false);
  const userId = useAuthStore((state) => state.userId);

  //TODO 탠스택 쿼리로 변환 예정
  const { data: rec, isSuccess: isRecFetched } = useQuery({
    queryKey: queryKeys.regularChat.eggClubId(roomId as string),
    queryFn: () => fetchEggClubId(roomId as string),
    enabled: Boolean(roomId) && Boolean(userId)
  });

  //TODO 탠스택 쿼리로 변환 예정
  const { data: memberData } = useQuery({
    queryKey: queryKeys.regularChat.memberData(userId as string),
    queryFn: () => fetchMemberData(userId as string, rec.egg_club_id),
    enabled: Boolean(userId) && isRecFetched
  });

  //TODO 탠스택 쿼리로 변환 예정
  const { data: chatInfo } = useQuery({
    queryKey: queryKeys.regularChat.chatInfo(roomId as string),
    queryFn: () => fetchChatInfo(roomId as string, memberData.egg_club_member_id),
    enabled: Boolean(roomId) && Boolean(memberData)
  });

  //TODO 탠스택 쿼리로 변환 예정
  const { data: regularMessages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: queryKeys.regularChat.messages(roomId as string, chatInfo?.chat_room_entry_time),
    queryFn: () => fetchMessages(roomId as string, chatInfo.chat_room_entry_time),
    enabled: Boolean(roomId) && Boolean(chatInfo?.chat_room_entry_time)
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
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({
        queryKey: queryKeys.regularChat.messages(roomId as string)
      });
    }
  });

  // 실시간 구독 설정
  useEffect(() => {
    if (!roomId) return;

    const subscription = supabase
      .channel("chatting")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "egg_day_chatting_message",
          filter: `egg_day_chatting_room_id=eq.${roomId}`
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.regularChat.messages(roomId as string)
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId, queryClient]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [newMessage]);

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

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessageMutation.mutate(newMessage);
  };

  if (isLoadingMessages) {
    return <div className="p-4 text-center">메시지를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col h-full ">
      {/* 메시지 출력 */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          {Object.keys(groupedMessages).length > 0 ? (
            Object.keys(groupedMessages).map((dateString) => (
              <div key={dateString} className="mb-6">
                <div className="justify-items-center">
                  <div className="w-[135px] h-[25px] px-2 py-1 rounded-[10px] border border-solid border-gray-50 mb-2 text-center">
                    <Text variant="body-12" className="text-gray-500">
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
                      className={`flex items-start mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                        {!isCurrentUser && (
                          <div className="flex">
                            <div className="flex items-center mr-2 border-solid border-[1px] rounded-full w-[40px] h-[40px]">
                              <Image
                                src={message.user.user_profile_img}
                                alt={`${message.user.user_name}의 프로필 이미지`}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                            <span className="text-sm content-center text-gray-600 block]">
                              {message.user.user_name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          {isCurrentUser && (
                            <span className="text-xs text-gray-500 block self-end	mr-2">
                              {date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                              })}
                            </span>
                          )}

                          <div
                            className={`max-w-xs break-words p-3 rounded-[16px] ${
                              isCurrentUser ? "bg-[#ffe399]" : "bg-[#f2f2f2] ml-10 "
                            } text-gray-900`}
                          >
                            <p className="max-w-[150px]">{message.egg_day_chatting_message_content}</p>
                          </div>
                          {!isCurrentUser && (
                            <span className="text-xs text-gray-500 block self-end ml-1	">
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
            <div className="text-center mt-[120px]">메시지가 없습니다.</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 채팅 입력 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="p-4">
          <div className="flex items-center">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setSentIconColor(false);
                } else {
                  setSentIconColor(true);
                }

                const lines = e.target.value.split("\n");
                if (lines.length <= 5) {
                  setNewMessage(e.target.value);
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={1}
              maxLength={100}
              className="flex-grow p-2 border-gray-300 bg-gray-50 rounded-[20px] focus:outline-none focus:ring-2 transition duration-200 min-h-[48px] max-h-[120px] content-center resize-none overflow-y-auto text-body-14"
              placeholder="메시지를 입력하세요..."
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className={`w-[40px] h-[40px] ml-4 ${
                sendIconColor ? "bg-primary-400" : "bg-gray-50"
              } text-white rounded-full flex items-center justify-center`}
            >
              <Icon name="rocket" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
