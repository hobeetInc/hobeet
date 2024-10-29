import { chattingRoom } from "../types/r_c_n_chatting_room";
import { ChatRoomMeetingPlace } from "./ChatRoomMeetingPlace";

// 모임 채팅방 생성
export async function CreateChatRoom(regularClubName: string, clubId: number, userId: string | null) {
  try {
    const response = await fetch("/api/createChatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ regularClubName, userId, clubId })
    });

    const { data, error }: { data: chattingRoom[] | null; error?: string } = await response.json();

    if (response.ok && data && data.length > 0) {
      const [chatRoom] = data;

      // 모임장 채팅방에 입장
      await ChatRoomMeetingPlace(chatRoom);
      console.log("채팅방 생성 완료:", chatRoom);
    } else {
      console.error("채팅방 생성 실패:", error || "Unknown error");
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}
