import { EggClubChatRoom } from "@/types/eggclubchat.types";
import { RegularClubChatRoomMeetingPlace } from "./RegularClubChatRoomMeetingPlace";

// 모임 채팅방 생성
export async function RegularClubChatRoom(egg_club_name: string, clubId: number, userId: string | null) {
  try {
    const response = await fetch("/api/createChatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ egg_club_name, userId, clubId })
    });

    const { data, error }: { data: EggClubChatRoom[] | null; error?: string } = await response.json();

    if (response.ok && data && data.length > 0) {
      const [chatRoom] = data;

      // 모임장 채팅방에 입장
      await RegularClubChatRoomMeetingPlace(chatRoom);
      // console.log("채팅방 생성 완료:", chatRoom);
    } else {
      console.error("채팅방 생성 실패:", error || "Unknown error");
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}
