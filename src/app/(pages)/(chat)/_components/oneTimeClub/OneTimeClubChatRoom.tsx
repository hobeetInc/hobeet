import { EggPopChatRoom } from "@/types/eggpopchat.types";
import { OneTimeClubChatRoomMeetingPlace } from "./OneTimeClubChatRoomMeetingPlace";

// 모임 채팅방 생성
export async function OneTimeClubChatRoom(egg_pop_name: string, egg_pop_id: number, userId: string | null) {
  try {
    const response = await fetch("/api/createOneTimeChatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ egg_pop_name, userId, egg_pop_id })
    });

    const { data, error }: { data: EggPopChatRoom[] | null; error?: string } = await response.json();

    if (response.ok && data && data.length > 0) {
      const [EggPopChatRoom] = data;

      // 모임장 채팅방에 입장
      await OneTimeClubChatRoomMeetingPlace(EggPopChatRoom);
      // console.log("채팅방 생성 완료:", OneTimeChatRoom);
    } else {
      console.error("채팅방 생성 실패:", error || "Unknown error");
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}
