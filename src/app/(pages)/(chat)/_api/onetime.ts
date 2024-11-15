import { EggPopChatRoom } from "@/types/eggpopchat.types";
import { EggPopChattingMember, EggPopId } from "@/types/eggpopchat.types";

export async function createOneTimeChatRoomAndEnterAsAdmin(
  egg_pop_name: string,
  egg_pop_id: number,
  userId: string | null
) {
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
      await enterChatRoomAsAdmin(EggPopChatRoom);
      // console.log("채팅방 생성 완료:", OneTimeChatRoom);
    } else {
      console.error("채팅방 생성 실패:", error || "Unknown error");
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}

export async function enterChatRoomAsAdmin(EggPopChatRoom: EggPopChatRoom) {
  try {
    await fetch("/api/oneTimeChatRoomMeetingPlace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ EggPopChatRoom })
    });
  } catch (error) {
    console.log(error);
  }
}

export async function enterOneTimeChatRoom(egg_pop_id: EggPopId) {
  try {
    const response = await fetch(`/api/oneTimeClubChattingRoom?egg_pop_id=${egg_pop_id.egg_pop_id}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error("일회성 모임 정보를 가져오는 데 실패했습니다.");
    }

    const data: EggPopChattingMember = await response.json();

    const postResponse = await fetch("https://www.eggfriends.site/api/oneTimeChatRoomRecruiterEntrance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ EggPopChattingMember: data })
    });

    if (!postResponse.ok) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }

    await postResponse.json();
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}
