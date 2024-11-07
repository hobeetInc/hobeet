import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { egg_pop_name, userId, egg_pop_id } = await req.json();

    const { data, error } = await supabase
      .from("egg_pop_chatting_room")
      .insert([{ egg_pop_chatting_room_name: egg_pop_name, user_id: userId, egg_pop_id: egg_pop_id }])
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
