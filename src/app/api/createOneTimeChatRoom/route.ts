import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { oneTimeClubName, userId, oneTimeClubId } = await req.json();

    const { data, error } = await supabase
      .from("one_time_club_chatting_room")
      .insert([{ one_time_club_chatting_room_name: oneTimeClubName, user_id: userId, one_time_club_id: oneTimeClubId }])
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
