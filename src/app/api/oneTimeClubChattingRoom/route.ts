import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createClient();

  try {
    const url = new URL(req.url);
    const one_time_club_id = url.searchParams.get("one_time_club_id");

    const { data, error } = await supabase
      .from("one_time_club_chatting_room_member")
      .select(`*`)
      .eq("one_time_club_id", one_time_club_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "요청을 잘못 보냈습니다" }, { status: 400 });
  }
}
