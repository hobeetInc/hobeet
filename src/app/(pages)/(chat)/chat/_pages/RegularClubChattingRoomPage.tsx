"use client";

import Text from "@/components/uiComponents/TextComponents/Text";
import { EggClubChattingRoom } from "@/types/eggclubchat.types";
import { cn } from "@/utils/cn/util";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchChatRoomMembers } from "../../_api/regular";
import { useAuthStore } from "@/store/authStore";

const RegularClubChattingRoomPage = () => {
  const [chatRooms, setChatRooms] = useState<EggClubChattingRoom[]>([]);
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
        //TODO 탠스택 쿼리로 변환 예정
        const memberData = await fetchChatRoomMembers(userId);

        // 채팅방이 없는 경우 처리
        if (!memberData) {
          setErrorMessage("채팅방이 없습니다.");
          setChatRooms([]);
          setLoading(false);
          return;
        }

        // 각 멤버의 채팅 데이터를 가공하고 메시지 정보를 추가
        const enrichedData = await Promise.all(
          memberData.map(async (member) => {
            // 각 채팅방의 메시지 데이터 조회
            const chattingWithMessages = await Promise.all(
              member.egg_day_chatting.map(async (chatting) => {
                // Supabase에서 메시지 데이터 조회
                const { data: messages, error: messageError } = await supabase
                  .from("egg_day_chatting_message")
                  .select(
                    `
                    egg_day_chatting_message_content,
                    egg_day_chatting_message_create_at
                  `
                  )
                  .eq("egg_day_chatting_room_id", chatting.egg_day_chatting_id)
                  .order("egg_day_chatting_message_create_at", { ascending: true });

                // 메시지 조회 실패 시 빈 배열 반환
                if (messageError) {
                  console.error("메시지 조회 오류:", messageError);
                  return {
                    ...chatting,
                    egg_day_chatting_message: []
                  };
                }

                return {
                  ...chatting,
                  egg_day_chatting_message: messages || []
                };
              })
            );

            // 채팅방 정보 객체 구성
            return {
              ...member,
              egg_day_chatting: chattingWithMessages
            };
          })
        );

        // 채팅방 데이터 가공 및 필요한 정보 추출
        const rooms = enrichedData.flatMap((member) =>
          member.egg_day_chatting
            .filter((chatting) => chatting.active)
            .map((chatting) => {
              // 마지막 메시지 시간 정보 포맷팅
              const lastMessageInfo =
                chatting.egg_day_chatting_message.length > 0
                  ? formatDateTime(
                      chatting.egg_day_chatting_message[chatting.egg_day_chatting_message.length - 1]
                        .egg_day_chatting_message_create_at
                    )
                  : { date: "", time: "" };

              return {
                user_id: member.user_id,
                egg_club_id: member.egg_club_id,
                egg_day_chatting_room_id: chatting.egg_day_chatting_room.egg_day_chatting_room_id,
                egg_day_chatting_room_name: chatting.egg_day_chatting_room.egg_day_chatting_room_name,
                egg_club_image: member.egg_club.egg_club_image,
                egg_club_name: member.egg_club.egg_club_name,
                last_message:
                  chatting.egg_day_chatting_message.length > 0
                    ? chatting.egg_day_chatting_message[chatting.egg_day_chatting_message.length - 1]
                        .egg_day_chatting_message_content
                    : "새 메시지가 없습니다.",
                last_message_time: lastMessageInfo.date,
                last_message_time_value: lastMessageInfo.time,
                active: chatting.active,
                egg_day_chatting: chatting.egg_day_chatting_room.egg_day_chatting
              };
            })
        );

        setChatRooms(rooms);
      } catch (error) {
        console.error("서버 오류:", error);
        setErrorMessage("채팅방 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();

    // 실시간 메시지 업데이트를 위한 Supabase 구독 설정
    const subscription = supabase
      .channel("chatting")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "egg_day_chatting_message"
        },
        (payload) => {
          // 새 메시지가 도착했을 때 채팅방 목록 업데이트
          const newMessage = payload.new;
          const messageTime = formatDateTime(newMessage.egg_day_chatting_message_create_at);

          setChatRooms((prevRooms) => {
            return prevRooms.map((room) => {
              if (room.egg_day_chatting_room_id === newMessage.egg_day_chatting_room_id) {
                return {
                  ...room,
                  last_message: newMessage.egg_day_chatting_message_content,
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
  }, [userId]);

  // 로딩 상태 UI
  if (loading) {
    return <Text variant="subtitle-16">로딩 중...</Text>;
  }

  if (errorMessage) {
    return (
      <>
        <div className={cn("flex flex-col")}>
          <div className={cn("flex flex-col h-[10px] border-b border-[#D9D9D9]")}></div>
          <div className={cn("text-center")}>{errorMessage}</div>
        </div>
      </>
    );
  }

  // 채팅방 목록 UI 렌더링
  return (
    <>
      <div className={cn("flex flex-col h-[calc(100%-91px)]")}>
        <div className={cn("flex flex-col overflow-y-auto")}>
          {chatRooms.length > 0 ? (
            // 채팅방이 있는 경우 목록 표시
            chatRooms.map((room: EggClubChattingRoom) => (
              <div key={room.egg_day_chatting_room_id} className={cn("border-b")}>
                {/* TODO a링크 Link로 변경 예정 */}
                <a
                  href={`/chat/regularChat/${room.egg_day_chatting_room_id}`}
                  className={cn("flex items-center p-4 w-full hover:bg-gray-50")}
                >
                  <div className={cn("w-[52px] h-[52px] flex-shrink-0")}>
                    <Image
                      src={room.egg_club_image}
                      alt={room.egg_club_name}
                      width={52}
                      height={52}
                      className={cn("w-full h-full object-cover rounded-full border")}
                    />
                  </div>

                  <div className={cn("flex-1 ml-4")}>
                    <div className={cn("flex justify-between items-center mb-1")}>
                      <Text variant="subtitle-16" className={cn("text-gray-900 font-medium truncate max-w-[200px]")}>
                        {room.egg_day_chatting_room_name}
                      </Text>
                      <div className={cn("flex items-center gap-4")}>
                        {typeof room.egg_day_chatting[0].count === "number" && room.egg_day_chatting[0].count > 0 && (
                          <Text variant="subtitle-16" className={cn("text-gray-200")}>
                            {room.egg_day_chatting[0].count}{" "}
                          </Text>
                        )}
                        <Text variant="body-12" className={cn("text-gray-400")}>
                          {room.last_message_time_value}
                        </Text>
                      </div>
                    </div>

                    <Text
                      variant="body_medium-12"
                      className={cn("w-[252px] text-gray-400 line-clamp-2 text-ellipsis overflow-hidden")}
                    >
                      {room.last_message}
                    </Text>
                  </div>
                </a>
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

export default RegularClubChattingRoomPage;
