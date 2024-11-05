import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { chattingRoom } = await req.json();

    // console.log("받은 채팅방 정보:", chattingRoom);
    // console.log("받은 사용자 정보:", chattingRoom.user_id);

    const { data, error } = await supabase
      .from("r_c_member")
      .select("r_c_member_id")
      .eq("r_c_id", chattingRoom.regular_club_id)
      .eq("user_id", chattingRoom.user_id);
    if (error) {
      console.error("데이터베이스 조회 오류:", error);
      return NextResponse.json({ error: "데이터베이스 조회 중 오류가 발생했습니다." }, { status: 500 });
    }

    const [adminUser] = data;
    const r_c_member_id = adminUser.r_c_member_id;
    // console.log("모임장 ID:", adminUser);

    const { error: insertError } = await supabase.from("r_c_n_chatting").insert({
      r_c_n_chatting_room_id: chattingRoom.r_c_n_chatting_room_id,
      r_c_member_id: r_c_member_id,
      r_c_id: chattingRoom.regular_club_id,
      admin: true
    });

    if (insertError) {
      console.error("데이터베이스 삽입 오류:", error);
      return NextResponse.json({ error: "데이터베이스 삽입 중 오류가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json({ message: "성공적으로 처리되었습니다." });
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json({ error: "처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
