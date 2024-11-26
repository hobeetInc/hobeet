import { createClient } from "@/utils/supabase/client";

export async function createRegularChatRoomAndEnterAsAdmin(
  egg_club_name: string,
  clubId: number,
  userId: string | null
) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("egg_day_chatting_room")
      .insert([
        {
          egg_day_chatting_room_name: egg_club_name,
          user_id: userId,
          egg_club_id: clubId
        }
      ])
      .select();

    if (error) {
      console.error("채팅방 생성 실패:", error.message);
      return;
    }

    if (data && data.length > 0) {
      const [clubChatRoom] = data;
      await enterChatRoomAsAdmin(clubChatRoom);
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}

export async function enterChatRoomAsAdmin(clubChatRoom) {
  try {
    const supabase = createClient();

    // 클럽 멤버 ID 조회
    const { data: memberData, error: memberError } = await supabase
      .from("egg_club_member")
      .select("egg_club_member_id")
      .eq("egg_club_id", clubChatRoom.egg_club_id)
      .eq("user_id", clubChatRoom.user_id)
      .single();

    if (memberError) {
      console.error("멤버 조회 실패:", memberError);
      return;
    }

    // 채팅 멤버 추가
    const { error: insertError } = await supabase.from("egg_day_chatting").insert({
      egg_day_chatting_room_id: clubChatRoom.egg_day_chatting_room_id,
      egg_club_member_id: memberData.egg_club_member_id,
      egg_club_id: clubChatRoom.egg_club_id,
      admin: true
    });

    if (insertError) {
      console.error("채팅 멤버 추가 실패:", insertError);
      return;
    }
  } catch (error) {
    console.error("처리 중 오류 발생:", error);
  }
}

export async function enterRegularChatRoom(club) {
  try {
    const supabase = createClient();

    // 채팅방 정보 조회
    const { data: chattingData, error: chattingError } = await supabase
      .from("egg_day_chatting")
      .select("*")
      .eq("egg_club_id", club.egg_club_id);

    if (chattingError) {
      throw new Error("정기 모임 정보를 가져오는 데 실패했습니다.");
    }

    // 현재 사용자의 클럽 멤버 ID 조회
    const { data: memberData, error: memberError } = await supabase
      .from("egg_club_member")
      .select("egg_club_member_id")
      .eq("user_id", club.user_id)
      .single();

    if (memberError) {
      throw new Error("멤버 정보를 찾을 수 없습니다.");
    }

    // 채팅방 멤버로 추가
    const { error: insertError } = await supabase.from("egg_day_chatting").insert({
      egg_day_chatting_room_id: chattingData[0].egg_day_chatting_room_id,
      egg_club_member_id: memberData.egg_club_member_id,
      egg_club_id: club.egg_club_id,
      admin: false
    });

    if (insertError) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}

interface ClubParams {
  egg_club_id: number;
  user_id: string;
}

export async function enterRegularChatRoomAfterApproval(params: ClubParams) {
  try {
    const supabase = createClient();

    // 채팅방 정보 조회
    const { data, error } = await supabase.from("egg_day_chatting").select("*").eq("egg_club_id", params.egg_club_id);

    if (error) {
      throw new Error("정기 모임 정보를 가져오는 데 실패했습니다.");
    }

    // 멤버 정보 조회
    const { data: memberData, error: memberError } = await supabase
      .from("egg_club_member")
      .select("egg_club_member_id")
      .eq("user_id", params.user_id)
      .eq("egg_club_id", data[0].egg_club_id)
      .single();

    if (memberError || !memberData) {
      throw new Error("멤버 정보를 찾을 수 없습니다.");
    }

    // 채팅방 멤버로 추가
    const { error: insertError } = await supabase.from("egg_day_chatting").insert({
      egg_day_chatting_room_id: data[0].egg_day_chatting_room_id,
      egg_club_member_id: memberData.egg_club_member_id,
      egg_club_id: data[0].egg_club_id,
      admin: false
    });

    if (insertError) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}

export async function fetchChatRoomMembers(userId: string) {
  const supabase = createClient();

  const { data: memberData, error: memberError } = await supabase
    .from("egg_club_member")
    .select(
      `
      *,
      egg_day_chatting (
        *,
        egg_day_chatting_room (*, egg_day_chatting(count))
      ),
      egg_club (*)
    `
    )
    .eq("user_id", userId);

  if (memberError) {
    throw new Error("멤버 데이터를 가져오는데 실패했습니다.");
  }

  if (!memberData || memberData.length === 0) {
    return null;
  }

  return memberData;
}

export async function fetchChattingMembers(egg_club_id: number) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("egg_day_chatting")
      .select(
        `* , 
        egg_club_member(* , 
          user(*)
        )
      `
      )
      .eq("egg_club_id", egg_club_id)
      .eq("active", true);

    if (error) {
      console.error("채팅 멤버 조회 실패:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("채팅 멤버 조회 중 오류 발생:", error);
    return null;
  }
}

export async function fetchEggClubId(roomId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_day_chatting")
    .select("egg_club_id")
    .eq("egg_day_chatting_room_id", roomId)
    .limit(1);

  if (error) throw error;
  return data ? data[0] : null;
}

export async function fetchMemberData(userId: string, clubId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_club_member")
    .select("egg_club_member_id")
    .eq("user_id", userId)
    .eq("egg_club_id", clubId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchChatInfo(roomId: string, memberId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_day_chatting")
    .select(`*, egg_day_chatting_room(*)`)
    .eq("egg_day_chatting_room_id", roomId)
    .eq("egg_club_member_id", memberId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchMessages(roomId: string, entryTime: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_day_chatting_message")
    .select(`*, user(*)`)
    .eq("egg_day_chatting_room_id", roomId)
    .gte("egg_day_chatting_message_create_at", entryTime)
    .order("egg_day_chatting_message_create_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

interface ChatInfo {
  egg_day_chatting_id: number;
  egg_club_member_id: number;
  egg_club_id: number;
}

export async function sendMessage(params: {
  roomId: string;
  userId: string;
  chatInfo: ChatInfo;
  messageContent: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("egg_day_chatting_message").insert([
    {
      egg_day_chatting_room_id: Number(params.roomId),
      user_id: params.userId,
      egg_day_chatting_id: params.chatInfo.egg_day_chatting_id,
      egg_club_member_id: params.chatInfo.egg_club_member_id,
      egg_club_id: params.chatInfo.egg_club_id,
      egg_day_chatting_message_content: params.messageContent
    }
  ]);

  if (error) throw error;
}
