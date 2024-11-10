"use client";

import Text from "@/components/uiComponents/TextComponents/Text";
import { ApiResponse, EggClubChattingRoom } from "@/types/eggclubchat.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RegularClubChattingRoomPage = () => {
  const [chatRooms, setChatRooms] = useState<EggClubChattingRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

    const fetchChatRooms = async () => {
      const { data, error } = await supabase.auth.getUser();
      const userId = data.user?.id;

      if (error || !userId) {
        console.error("사용자 정보를 가져오지 못했습니다: ", error);
        setErrorMessage("사용자 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/getChatRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        const chatData: ApiResponse = await response.json();
        console.log(chatData);

        if (!response.ok) {
          throw new Error("서버에서 오류가 발생했습니다.");
        }

        if (!chatData.data || chatData.data.length === 0) {
          setErrorMessage("채팅방이 없습니다.");
          setChatRooms([]);
          setLoading(false);
          return;
        }

        const rooms: EggClubChattingRoom[] = chatData.data.flatMap((member) =>
          member.egg_day_chatting
            .filter((chatting) => chatting.active)
            .map((chatting) => {
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

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (errorMessage) {
    return (
      <>
        <div className="flex flex-col">
          <div className="flex flex-col h-[10px] border-b border-[#D9D9D9]"></div>
          <div className="text-center">{errorMessage}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100%-91px)]">
        <div className="flex flex-col overflow-y-auto">
          {chatRooms.length > 0 ? (
            chatRooms.map((room: EggClubChattingRoom) => (
              <div key={room.egg_day_chatting_room_id} className="border-b">
                <Link
                  href={`/chat/regularChat/${room.egg_day_chatting_room_id}`}
                  className="flex items-center p-4 w-full hover:bg-gray-50"
                >
                  <div className="w-[52px] h-[52px] flex-shrink-0">
                    <Image
                      src={room.egg_club_image}
                      alt={room.egg_club_name}
                      width={52}
                      height={52}
                      className="w-full h-full object-cover rounded-full border"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-center mb-1 ">
                      <Text variant="subtitle-16" className="text-gray-900 font-medium truncate max-w-[200px]">
                        {room.egg_day_chatting_room_name}
                      </Text>
                      <div className="flex items-center gap-4">
                        {room.egg_day_chatting[0].count > 0 && (
                          <Text variant="subtitle-16" className="text-gray-200">
                            {room.egg_day_chatting[0].count}{" "}
                          </Text>
                        )}
                        <Text variant="body-12" className="text-gray-400">
                          {room.last_message_time_value}
                        </Text>
                      </div>
                    </div>

                    <Text
                      variant="body_medium-12"
                      className=" w-[252px] text-gray-400 line-clamp-2 text-ellipsis overflow-hidden"
                    >
                      {room.last_message}
                    </Text>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-8 ">
              <Text variant="body_medium-16">채팅방이 없습니다.</Text>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegularClubChattingRoomPage;
