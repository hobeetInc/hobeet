import { createClient } from "@/utils/supabase/client";

export async function createOneTimeChatRoomAndEnterAsAdmin(
  egg_pop_name: string,
  egg_pop_id: number,
  userId: string | null
) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("egg_pop_chatting_room")
      .insert([
        {
          egg_pop_chatting_room_name: egg_pop_name,
          user_id: userId,
          egg_pop_id: egg_pop_id
        }
      ])
      .select();

    if (error) {
      console.error("채팅방 생성 실패:", error.message);
      return;
    }

    if (data && data.length > 0) {
      const [EggPopChatRoom] = data;
      await enterChatRoomAsAdmin(EggPopChatRoom);
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}

export async function enterChatRoomAsAdmin(EggPopChatRoom) {
  const supabase = createClient();

  try {
    // 모임 멤버 ID 조회
    const { data, error } = await supabase
      .from("egg_pop_member")
      .select("egg_pop_member_id")
      .eq("egg_pop_id", EggPopChatRoom.egg_pop_id)
      .eq("user_id", EggPopChatRoom.user_id);

    if (error) {
      console.error("멤버 조회 오류:", error);
      throw error;
    }

    const [adminUser] = data;
    const egg_pop_member_id = adminUser.egg_pop_member_id;

    // 채팅방 멤버로 등록
    const { error: insertError } = await supabase.from("egg_pop_chatting_room_member").insert({
      egg_pop_chatting_room_id: EggPopChatRoom.egg_pop_chatting_room_id,
      egg_pop_member_id: egg_pop_member_id,
      egg_pop_id: EggPopChatRoom.egg_pop_id,
      admin: true
    });

    if (insertError) {
      console.error("채팅방 멤버 등록 오류:", insertError);
      throw insertError;
    }
  } catch (error) {
    console.error("채팅방 입장 처리 중 오류:", error);
    throw error;
  }
}

export async function enterOneTimeChatRoom(egg_pop_id) {
  const supabase = createClient();

  try {
    // 채팅방 멤버 정보 조회
    const { data: chatRoomMembers, error: chatRoomError } = await supabase
      .from("egg_pop_chatting_room_member")
      .select(`*`)
      .eq("egg_pop_id", egg_pop_id.egg_pop_id);

    if (chatRoomError) {
      throw new Error("채팅방 멤버 정보를 가져오는 데 실패했습니다.");
    }

    // 현재 사용자 정보 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
    }

    // 멤버 정보 조회
    const { data: memberData, error: memberError } = await supabase
      .from("egg_pop_member")
      .select("egg_pop_member_id")
      .eq("user_id", userData.user.id)
      .eq("egg_pop_id", egg_pop_id.egg_pop_id)
      .single();

    if (memberError || !memberData) {
      throw new Error("멤버 정보를 찾을 수 없습니다.");
    }

    // 채팅방 멤버로 등록
    const { error: insertError } = await supabase.from("egg_pop_chatting_room_member").insert({
      egg_pop_chatting_room_id: chatRoomMembers[0].egg_pop_chatting_room_id,
      egg_pop_member_id: memberData.egg_pop_member_id,
      egg_pop_id: egg_pop_id.egg_pop_id,
      admin: false
    });

    if (insertError) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
    throw error;
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
      .select(`* , egg_pop_member(* , user(*))`)
      .eq("egg_pop_id", egg_pop_id)
      .eq("active", true);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching chat room members:", error);
    throw error;
  }
}

export async function getOneTimeChatRoom(userId: string) {
  const supabase = createClient();

  try {
    const { data: memberData, error: memberError } = await supabase
      .from("egg_pop_member")
      .select(
        `
        *,
        egg_pop_chatting_room_member (
          *,
          egg_pop_chatting_room (*, egg_pop_chatting_room_member(count))
        ),
        egg_pop (*)
        `
      )
      .eq("user_id", userId);

    if (memberError) {
      throw new Error(memberError.message);
    }

    const enrichedData = await Promise.all(
      memberData.map(async (member) => {
        const chattingWithMessages = await Promise.all(
          member.egg_pop_chatting_room_member.map(async (chatting) => {
            const { data: messages, error: messageError } = await supabase
              .from("egg_pop_chatting_room_message")
              .select(
                `
                egg_pop_chatting_room_message_content,
                created_at
                `
              )
              .eq("egg_pop_chatting_room_id", chatting.egg_pop_chatting_room_id)
              .order("created_at", { ascending: true });

            if (messageError) {
              console.error("메시지 조회 오류:", messageError);
              return {
                ...chatting,
                egg_pop_chatting_room_message: []
              };
            }

            return {
              ...chatting,
              egg_pop_chatting_room_message: messages || []
            };
          })
        );

        return {
          ...member,
          egg_pop_chatting_room_member: chattingWithMessages
        };
      })
    );

    return { data: enrichedData };
  } catch (error) {
    console.log(error);
    throw new Error("요청을 잘못 보냈습니다");
  }
}

export async function fetchEggPopId(roomId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_pop_chatting_room_member")
    .select("egg_pop_id")
    .eq("egg_pop_chatting_room_id", roomId)
    .limit(1);

  if (error) throw error;
  return data ? data[0] : null;
}

export async function fetchMemberData(userId: string, eggPopId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_pop_member")
    .select("egg_pop_member_id")
    .eq("user_id", userId)
    .eq("egg_pop_id", eggPopId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchChatInfo(roomId: string, memberId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_pop_chatting_room_member")
    .select(`*, egg_pop_chatting_room(*)`)
    .eq("egg_pop_chatting_room_id", roomId)
    .eq("egg_pop_member_id", memberId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchMessages(roomId: string, createdAt: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("egg_pop_chatting_room_message")
    .select(
      `
      *,
      user:user_id (
        user_id,
        user_name,
        user_profile_img
      )
    `
    )
    .eq("egg_pop_chatting_room_id", roomId)
    .gte("created_at", createdAt)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

interface SendMessageParams {
  roomId: string;
  userId: string;
  chatInfo: {
    egg_pop_chatting_room_member_id: number;
    egg_pop_member_id: number;
    egg_pop_id: number;
  };
  messageContent: string;
}

export async function sendMessage(params: SendMessageParams) {
  const supabase = createClient();
  const { error } = await supabase.from("egg_pop_chatting_room_message").insert([
    {
      egg_pop_chatting_room_id: Number(params.roomId),
      user_id: params.userId,
      egg_pop_chatting_room_member_id: params.chatInfo.egg_pop_chatting_room_member_id,
      egg_pop_member_id: params.chatInfo.egg_pop_member_id,
      egg_pop_id: params.chatInfo.egg_pop_id,
      egg_pop_chatting_room_message_content: params.messageContent
    }
  ]);

  if (error) throw error;
}

interface SendMessageMutationParams {
  roomId: string;
  userId: string;
  chatInfo: {
    egg_pop_chatting_room_member_id: number;
    egg_pop_member_id: number;
    egg_pop_id: number;
  };
  messageContent: string;
}

export const mutations = {
  sendMessage: {
    mutationFn: (params: SendMessageMutationParams) => {
      if (!params.chatInfo || !params.userId) throw new Error("전송실패실패실패");
      return sendMessage(params);
    }
  }
};
