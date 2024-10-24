import { createClient } from "@/utils/supabase/client";
import { chattingRoom } from "../types/r_c_n_chatting_room"; // chattingRoom 타입 임포트
import { ChatRoomMeetingPlace } from "./ChatRoomMeetingPlace"; // ChatRoomMeetingPlace 컴포넌트 임포트

// 모임 채팅방 생성
export async function CreateChatRoom(regularClubName: string, clubId: number) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error("사용자 정보 못가져왔음: ", error);
    return;
  }
  const userId = data.user.id;
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
