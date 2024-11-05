// 모임 채팅 생성후 모임장 채팅에 입장 시키기

import { OneTimeChatRoom } from "../../types/chat";

export async function OneTimeClubChatRoomMeetingPlace(OneTimeChatRoom: OneTimeChatRoom) {
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
