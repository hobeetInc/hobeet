import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { regularClubName, userId, clubId } = await req.json();

    const { data, error } = await supabase
      .from("egg_day_chatting_room")
      .insert([{ r_c_n_chatting_room_name: regularClubName, user_id: userId, regular_club_id: clubId }])
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
