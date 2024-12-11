"use client";

import Text from "@/components/ui/atoms/text/Text";
import { cn } from "@/utils/cn/util";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOneTimeChatRoom } from "../../_api/onetime";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { EggPopChattingRoom } from "@/types/features/chat/eggpopchat.types";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";
const OneTimeClubChattingRoomPage = () => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  // 채팅방 목록, 로딩 상태, 에러 메시지 상태 관리
  const [chatRooms, setChatRooms] = useState<EggPopChattingRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const userId = useAuthStore((state) => state.userId);

  // 날짜와 시간을 포맷팅하는 유틸리티 함수
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return {
      date: `${month}월 ${day}일`,
      time: `${hours}:${minutes}`
    };
  };

  useEffect(() => {
    const supabase = createClient();
    if (!userId) return;

    // 채팅방 데이터를 가져오는 비동기 함수
    const fetchChatRooms = async () => {
      try {
        const chatData = await getOneTimeChatRoom(userId);
        // 채팅방이 없는 경우 처리
        if (!chatData.data || chatData.data.length === 0) {
          setErrorMessage("채팅방이 없습니다.");
          setChatRooms([]);
          setLoading(false);
          return;
        }

        // 채팅방 데이터 가공 및 매핑
        const rooms = chatData.data.flatMap((member) =>
          member.egg_pop_chatting_room_member
            .filter((chatting) => chatting.active)
            .map((chatting) => {
              // 마지막 메시지 시간 정보 포맷팅
              const lastMessageInfo =
                chatting.egg_pop_chatting_room_message.length > 0
                  ? formatDateTime(
                      chatting.egg_pop_chatting_room_message[chatting.egg_pop_chatting_room_message.length - 1]
                        .created_at
                    )
                  : { date: "", time: "" };

              // 채팅방 정보 객체 구성
              return {
                user_id: member.user_id,
                egg_pop_id: member.egg_pop_id,
                egg_pop_chatting_room_id: chatting.egg_pop_chatting_room.egg_pop_chatting_room_id,
                egg_pop_chatting_room_name: chatting.egg_pop_chatting_room.egg_pop_chatting_room_name,
                egg_pop_image: member.egg_pop.egg_pop_image,
                egg_pop_name: member.egg_pop.egg_pop_name,
                last_message:
                  chatting.egg_pop_chatting_room_message.length > 0
                    ? chatting.egg_pop_chatting_room_message[chatting.egg_pop_chatting_room_message.length - 1]
                        .egg_pop_chatting_room_message_content
                    : "새 메시지가 없습니다.",
                last_message_time: lastMessageInfo.date,
                last_message_time_value: lastMessageInfo.time,
                active: chatting.active,
                egg_pop_chatting_room_member: chatting.egg_pop_chatting_room.egg_pop_chatting_room_member
              };
            })
        );

        setChatRooms(rooms);
      } catch (error) {
        // 에러 처리
        console.error("서버 오류:", error);
        setErrorMessage("채팅방 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();

    // 실시간 메시지 업데이트를 위한 Supabase 구독 설정
    const subscription = supabase
      .channel("oneTimeChatting")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "egg_pop_chatting_room_message"
        },
        (payload) => {
          // 새 메시지가 도착했을 때 채팅방 목록 업데이트
          const newMessage = payload.new;
          const messageTime = formatDateTime(newMessage.created_at);

          setChatRooms((prevRooms) => {
            return prevRooms.map((room) => {
              if (room.egg_pop_chatting_room_id === newMessage.egg_pop_chatting_room_id) {
                return {
                  ...room,
                  last_message: newMessage.egg_pop_chatting_room_message_content,
                  last_message_time: messageTime.date,
                  last_message_time_value: messageTime.time
                };
              }
              return room;
            });
          });
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 로딩 상태 UI
  if (loading) {
    return <LoadingSpinner />;
  }

  // 에러 상태 UI
  if (errorMessage) {
    return (
      <>
        <div className={cn("flex flex-col w-[380px]")}>
          <div className={cn("flex flex-col w-[380px] h-[10px] border-b border-[#D9D9D9]")}></div>
          <div className={cn("text-center")}>{errorMessage}</div>
        </div>
      </>
    );
  }

  // 채팅방 목록 렌더링
  return (
    <>
      <div className={cn("flex flex-col w-full h-[calc(100%-91px)]")}>
        <div className={cn("flex flex-col w-full overflow-y-auto")}>
          {chatRooms.length > 0 ? (
            // 채팅방이 있는 경우 목록 표시
            chatRooms.map((room: EggPopChattingRoom) => (
              <div key={room.egg_pop_chatting_room_id} className={cn("border-b")}>
                <Link
                  href={`/chat/onetimeChat/${room.egg_pop_chatting_room_id}`}
                  className={cn("flex items-center p-4 border-b w-full hover:bg-gray-50")}
                >
                  <div className={cn("w-[52px] h-[52px] flex-shrink-0")}>
                    <Image
                      src={room.egg_pop_image}
                      alt={room.egg_pop_name}
                      width={52}
                      height={52}
                      className={cn("w-full h-full object-cover rounded-full border")}
                    />
                  </div>

                  <div className={cn("flex-1 ml-4 ")}>
                    <div className={cn("flex  items-center mb-1")}>
                      <Text variant="subtitle-16" className={cn("text-gray-900 font-medium truncate max-w-[200px]")}>
                        {room.egg_pop_chatting_room_name}
                      </Text>
                      {room.egg_pop_chatting_room_member[0].count > 0 && (
                        <Text variant="subtitle-16" className={cn("text-gray-200", isLargeScreen ? "ml-2" : "ml-auto")}>
                          {room.egg_pop_chatting_room_member[0].count}
                        </Text>
                      )}
                      {!isLargeScreen && (
                        <Text variant="body-12" className={cn("text-gray-400 ml-2")}>
                          {room.last_message_time_value}
                        </Text>
                      )}
                      {isLargeScreen && (
                        <div className={cn("ml-auto")}>
                          <Text variant="body-12" className={cn("text-gray-400")}>
                            {room.last_message_time_value}
                          </Text>
                        </div>
                      )}
                    </div>
                    <Text
                      variant="body_medium-12"
                      className={cn("w-[252px] text-gray-400 line-clamp-2 text-ellipsis overflow-hidden")}
                    >
                      {room.last_message}
                    </Text>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // 채팅방이 없는 경우 메시지 표시
            <div className={cn("text-center py-8")}>
              <Text variant="body_medium-16">채팅방이 없습니다.</Text>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OneTimeClubChattingRoomPage;
