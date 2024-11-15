"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ExtendEggPopMessage } from "@/types/안끝난거/eggpopchat.types";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { cn } from "@/utils/cn/util";

const supabase = createClient();

const ChatPage: React.FC = () => {
  const params = useParams();
  const roomId = params.chatRoomId;
  const [newMessage, setNewMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sendIconColor, setSentIconColor] = useState<boolean>(false);

  // 현재 사용자 정보 조회
  const { data: currentUser, isSuccess: isUserFetched } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      return user;
    }
  });

  const { data: rec, isSuccess: isRecFetched } = useQuery({
    queryKey: ["egg_pop_id", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("egg_pop_chatting_room_member")
        .select("egg_pop_id")
        .eq("egg_pop_chatting_room_id", roomId)
        .limit(1);
      if (error) throw error;
      return data ? data[0] : null;
    },
    enabled: !!roomId && isUserFetched
  });

  const { data: memberData } = useQuery({
    queryKey: ["oneTimeMemberData", currentUser?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("egg_pop_member")
        .select("egg_pop_member_id")
        .eq("user_id", currentUser?.id)
        .eq("egg_pop_id", rec?.egg_pop_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!currentUser?.id && isRecFetched
  });

  const { data: chatInfo } = useQuery({
    queryKey: ["oneTimeChatInfo", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("egg_pop_chatting_room_member")
        .select(`*, egg_pop_chatting_room(*)`)
        .eq("egg_pop_chatting_room_id", roomId)
        .eq("egg_pop_member_id", memberData?.egg_pop_member_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!roomId && !!memberData
  });
  // console.log(chatInfo?.chat_room_entry_time);

  // 메시지 목록 조회
  const { data: oneTimeMessages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ["oneTimeMessages", roomId, chatInfo?.created_at],
    queryFn: async () => {
      if (!chatInfo?.created_at) {
        throw new Error("채팅방 입장 시간이 없습니다.");
      }

      const { data, error } = await supabase
        .from("egg_pop_chatting_room_message")
        .select(
          `
          *,
          user:user_id (
            user_id,
            user_name,
            user_profile_img
          )
        `
        )
        .eq("egg_pop_chatting_room_id", roomId)
        .gte("created_at", chatInfo.created_at)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data || []) as unknown as ExtendEggPopMessage[];
    },
    enabled: !!roomId && !!chatInfo?.created_at
  });

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 새 메시지가 추가될 때마다 스크롤 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [oneTimeMessages]);

  // 메시지 전송 무테이션
  const sendMessageMutation = useMutation({
    mutationFn: async (messageContent: string) => {
      if (!chatInfo || !currentUser) throw new Error("전송실패실패실패");

      const { error } = await supabase.from("egg_pop_chatting_room_message").insert([
        {
          egg_pop_chatting_room_id: Number(roomId),
          user_id: currentUser.id,
          egg_pop_chatting_room_member_id: chatInfo.egg_pop_chatting_room_member_id,
          egg_pop_member_id: chatInfo.egg_pop_member_id,
          egg_pop_id: chatInfo.egg_pop_id,
          egg_pop_chatting_room_message_content: messageContent
        }
      ]);

      if (error) throw error;
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["oneTimeMessages", roomId] });
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

  const groupMessagesByDate = (messages: ExtendEggPopMessage[]) => {
    return messages.reduce((acc: { [date: string]: ExtendEggPopMessage[] }, message) => {
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
                {groupedMessages[dateString].map((message: ExtendEggPopMessage) => {
                  const date = new Date(message.created_at);
                  const isCurrentUser = message.user.user_id === currentUser?.id;

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
