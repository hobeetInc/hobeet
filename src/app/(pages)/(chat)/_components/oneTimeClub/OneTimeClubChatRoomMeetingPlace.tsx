// 모임 채팅 생성후 모임장 채팅에 입장 시키기

import { EggPopChatRoom } from "@/types/eggpopchat.types";

export async function OneTimeClubChatRoomMeetingPlace(OneTimeChatRoom: EggPopChatRoom) {
  try {
    await fetch("/api/oneTimeChatRoomMeetingPlace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ OneTimeChatRoom })
    });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
}
