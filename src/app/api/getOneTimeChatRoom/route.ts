import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { OneTimeChatMessage, OneTimeChatting, OneTimeMember } from "@/types/eggpopchat.types";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { userId } = await req.json();

    const { data: memberData, error: memberError } = await supabase
      .from("egg_pop_member")
      .select(
        `
        *,
        egg_pop_chatting_room_member (
          *,
          egg_pop_chatting_room (*)
        ),
        egg_pop (*)
        `
      )
      .eq("user_id", userId);

    if (memberError) {
      return NextResponse.json({ error: memberError.message }, { status: 500 });
    }

    const enrichedData: OneTimeMember[] = await Promise.all(
      (memberData as OneTimeMember[]).map(async (member) => {
        const chattingWithMessages: OneTimeChatting[] = await Promise.all(
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
              egg_pop_chatting_room_message: (messages as OneTimeChatMessage[]) || []
            };
          })
        );

        return {
          ...member,
          egg_pop_chatting_room_member: chattingWithMessages
        };
      })
    );

    return NextResponse.json({ data: enrichedData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "요청을 잘못 보냈습니다" }, { status: 400 });
  }
}
