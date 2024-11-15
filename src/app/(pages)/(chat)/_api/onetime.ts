import { EggPopChatRoom } from "@/types/eggpopchat.types";
import { EggPopChattingMember, EggPopId } from "@/types/eggpopchat.types";
import { createClient } from "@/utils/supabase/client";

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

export async function fetchEggPopChatRoomWithMembers(roomId: string, userId: string) {
  const supabase = createClient();
  try {
    // 채팅방 정보 조회
    const { data: roomData, error: roomError } = await supabase
      .from("egg_pop_chatting_room")
      .select("*")
      .eq("egg_pop_chatting_room_id", roomId)
      .single();

    if (roomError) throw roomError;

    // 채팅 멤버 정보 조회
    const { data: chatMember, error: chatMemberError } = await supabase
      .from("egg_pop_member")
      .select("egg_pop_member_id")
      .eq("user_id", userId)
      .eq("egg_pop_id", roomData.egg_pop_id)
      .single();

    if (chatMemberError) throw chatMemberError;

    // 채팅방 멤버 정보 조회
    const { data: chattingData, error: chattingError } = await supabase
      .from("egg_pop_chatting_room_member")
      .select("*")
      .eq("egg_pop_chatting_room_id", roomId)
      .eq("egg_pop_member_id", chatMember.egg_pop_member_id)
      .single();

    if (chattingError) throw chattingError;

    return {
      roomData,
      chatMember,
      chattingData
    };
  } catch (error) {
    console.error("Error fetching chat room data:", error);
    throw error;
  }
}

export async function fetchChatRoomMembers(egg_pop_id: number) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("egg_pop_chatting_room_member")
      .select(`* , egg_pop_member_id(* , user_id(*))`)
      .eq("egg_pop_id", egg_pop_id)
      .eq("active", true);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching chat room members:", error);
    throw error;
  }
}
