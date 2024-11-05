import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Chatting, EggClubChatMessage, Member } from "@/types/eggclubchat.types";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { userId } = await req.json();

    const { data: memberData, error: memberError } = await supabase
      .from("egg_club_member")
      .select(
        `
        *,
        egg_day_chatting (
          *,
          egg_day_chatting_room (*)
        ),
        egg_club (*)
        `
      )
      .eq("user_id", userId);

    if (memberError) {
      return NextResponse.json({ error: memberError.message }, { status: 500 });
    }

    const enrichedData: Member[] = await Promise.all(
      (memberData as Member[]).map(async (member) => {
        const chattingWithMessages: Chatting[] = await Promise.all(
          member.egg_day_chatting.map(async (chatting) => {
            const { data: messages, error: messageError } = await supabase
              .from("egg_day_chatting_message")
              .select(
                `
                egg_day_chatting_message_content,
                egg_day_chatting_message_create_at
                `
              )
              .eq("egg_day_chatting_room_id", chatting.egg_day_chatting_id)
              .order("egg_day_chatting_message_create_at", { ascending: true });

            if (messageError) {
              console.error("메시지 조회 오류:", messageError);
              return {
                ...chatting,
                egg_day_chatting_message: []
              };
            }

            return {
              ...chatting,
              egg_day_chatting_message: (messages as EggClubChatMessage[]) || []
            };
          })
        );

        return {
          ...member,
          egg_day_chatting: chattingWithMessages
        };
      })
    );

    return NextResponse.json({ data: enrichedData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "요청을 잘못 보냈습니다" }, { status: 400 });
  }
}
