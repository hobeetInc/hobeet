import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();
  const { regularClubMember, user_id } = await req.json();
  console.log("user_id", user_id);

  try {
    const { data: memberData, error: memberError } = await supabase
      .from("r_c_member")
      .select("r_c_member_id")
      .eq("user_id", user_id)
      .single();

    if (memberError || !memberData) {
      console.error("멤버 정보를 가져오는 데 실패했습니다: ", memberError);
      return NextResponse.json({ error: "멤버 정보를 찾을 수 없습니다." }, { status: 404 });
    }
    debugger;
    const r_c_member_id = memberData.r_c_member_id;

    console.log("채팅방 정보: ", regularClubMember);
    const chatRoomData = regularClubMember.data[0];

    const { error: insertError } = await supabase.from("r_c_n_chatting").insert({
      r_c_n_chatting_room_id: chatRoomData.r_c_n_chatting_room_id,
      r_c_member_id: r_c_member_id,
      r_c_id: chatRoomData.r_c_id,
      admin: false
    });

    if (insertError) {
      console.error("데이터베이스 삽입 중 오류가 발생했습니다: ", insertError);
      return NextResponse.json({ error: "데이터베이스 삽입 중 오류가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json({ message: "성공적으로 처리되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
    return NextResponse.json({ error: "처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
