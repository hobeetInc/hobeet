"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { cn } from "@/utils/cn/util";
import { useAuthStore } from "@/store/authStore";
import { queryKeys } from "@/hooks/utils/queryKeys";
import {
  fetchEggPopId,
  fetchMemberData,
  fetchChatInfo,
  fetchMessages,
  createMutations
} from "@/app/(pages)/(chat)/_api/onetime";

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

  const { data: rec, isSuccess: isRecFetched } = useQuery({
    queryKey: queryKeys.oneTimeChat.eggPopId(roomId as string),
    queryFn: () => fetchEggPopId(roomId as string),
    enabled: !!roomId && !!userId
  });

  const { data: memberData } = useQuery({
    queryKey: queryKeys.oneTimeChat.memberData(userId as string, rec?.egg_pop_id),
    queryFn: () => fetchMemberData(userId as string, rec.egg_pop_id),
    enabled: !!userId && isRecFetched
  });

  const { data: chatInfo } = useQuery({
    queryKey: queryKeys.oneTimeChat.chatInfo(roomId as string),
    queryFn: () => fetchChatInfo(roomId as string, memberData?.egg_pop_member_id),
    enabled: !!roomId && !!memberData
  });

  const { data: oneTimeMessages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: queryKeys.oneTimeChat.messages(roomId as string, chatInfo?.created_at),
    queryFn: () => fetchMessages(roomId as string, chatInfo.created_at),
    enabled: !!roomId && !!chatInfo?.created_at
  });

  const mutations = createMutations({
    queryClient,
    roomId: roomId as string,
    chatInfo,
    setNewMessage
  });

  const sendMessageMutation = useMutation({
    mutationFn: (messageContent: string) =>
      mutations.sendMessage.mutationFn({
        roomId: roomId as string,
        userId,
        chatInfo,
        messageContent
      }),
    onSuccess: mutations.sendMessage.onSuccess
  });

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 새 메시지가 추가될 때마다 스크롤 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [oneTimeMessages]);

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
          table: "egg_pop_chatting_room_message",
          filter: `egg_pop_chatting_room_id=eq.${roomId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["oneTimeMessages", roomId] });
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

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = new Date(message.created_at);
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

  const groupedMessages = groupMessagesByDate(oneTimeMessages);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessageMutation.mutate(newMessage);
  };

  if (isLoadingMessages) {
    return <div className="p-4 text-center mt-[120px]">메시지를 불러오는 중...</div>;
  }

  return (
    <div className={cn("flex flex-col h-full")}>
      {/* 메시지 출력 */}
      <div className={cn("flex-grow overflow-y-auto")}>
        <div className={cn("p-4")}>
          {Object.keys(groupedMessages).length > 0 ? (
            Object.keys(groupedMessages).map((dateString) => (
              <div key={dateString} className={cn("mb-6")}>
                <div className={cn("justify-items-center")}>
                  <div
                    className={cn(
                      "w-[135px] h-[25px] px-2 py-1 rounded-[10px] border border-solid border-gray-50 mb-2 text-center"
                    )}
                  >
                    <Text variant="body-12" className={cn("text-gray-500")}>
                      {dateString}
                    </Text>
                  </div>
                </div>
                {groupedMessages[dateString].map((message) => {
                  const date = new Date(message.created_at);
                  const isCurrentUser = message.user.user_id === userId;

                  return (
                    <div
                      key={message.egg_pop_chatting_room_message_id}
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
                              "max-w-xs break-words p-3 rounded-[16px] text-gray-900",
                              isCurrentUser ? "bg-[#ffe399]" : "bg-[#f2f2f2]"
                            )}
                          >
                            <p className={cn("max-w-[150px]")}>{message.egg_pop_chatting_room_message_content}</p>
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
      <div className={cn("fixed bottom-0 left-0 right-0 bg-white border-t")}>
        <div className={cn("p-4")}>
          <div className={cn("flex items-center")}>
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
              className={cn(
                "flex-grow p-2 border-gray-300 bg-gray-50 rounded-[20px]",
                "focus:outline-none focus:ring-2 transition duration-200",
                "min-h-[48px] max-h-[120px] content-center resize-none",
                "overflow-y-auto text-body-14"
              )}
              placeholder="메시지를 입력하세요..."
              style={{
                lineHeight: "1.5"
              }}
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className={cn(
                "w-[40px] h-[40px] ml-4 rounded-full flex items-center justify-center",
                sendIconColor ? "bg-primary-400" : "bg-gray-50"
              )}
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
