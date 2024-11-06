import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { egg_club_name, userId, clubId } = await req.json();

    const { data, error } = await supabase
      .from("egg_day_chatting_room")
      .insert([{ egg_day_chatting_room_name: egg_club_name, user_id: userId, egg_club_id: clubId }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "요청 잘못 보냈습니다" }, { status: 400 });
  }
}
