import { OneTimeChatRoom } from "../../types/chat";
import { OneTimeClubChatRoomMeetingPlace } from "./OneTimeClubChatRoomMeetingPlace";

// 모임 채팅방 생성
export async function OneTimeClubChatRoom(oneTimeClubName: string, oneTimeClubId: number, userId: string | null) {
  try {
    const response = await fetch("/api/createOneTimeChatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ oneTimeClubName, userId, oneTimeClubId })
    });

    const { data, error }: { data: OneTimeChatRoom[] | null; error?: string } = await response.json();

    if (response.ok && data && data.length > 0) {
      const [OneTimeChatRoom] = data;

      // 모임장 채팅방에 입장
      await OneTimeClubChatRoomMeetingPlace(OneTimeChatRoom);
      console.log("채팅방 생성 완료:", OneTimeChatRoom);
    } else {
      console.error("채팅방 생성 실패:", error || "Unknown error");
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}
