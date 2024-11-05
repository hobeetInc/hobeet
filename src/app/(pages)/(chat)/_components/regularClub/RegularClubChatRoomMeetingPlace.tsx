// 모임 채팅 생성후 모임장 채팅에 입장 시키기

import { chattingRoom } from "../../types/r_c_n_chatting_room";

export async function RegularClubChatRoomMeetingPlace(chattingRoom: chattingRoom) {
  try {
    await fetch("/api/chatRoomMeetingPlace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ chattingRoom })
    });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
}
