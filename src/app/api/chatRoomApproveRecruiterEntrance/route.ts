import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();
  const { regularClubMember, user_id } = await req.json();
  // console.log("user_id", user_id);
  console.log("야 이 새끼야", regularClubMember);

  try {
    const { data: memberData, error: memberError } = await supabase
      .from("egg_club_member")
      .select("egg_club_member_id")
      .eq("user_id", user_id)
      .eq("egg_club_id", regularClubMember.data[0].egg_club_id)
      .single();

    if (memberError || !memberData) {
      console.error("멤버 정보를 가져오는 데 실패했습니다: ", memberError);
      return NextResponse.json({ error: "멤버 정보를 찾을 수 없습니다." }, { status: 404 });
    }
    debugger;
    const egg_club_member_id = memberData.egg_club_member_id;
    console.log("에그클럽 멤버 아이디 egg_club_member_id", egg_club_member_id);

    // console.log("채팅방 정보: ", regularClubMember);
    const chatRoomData = regularClubMember.data[0];
    console.log("채팅방 데이터 chatRoomData", chatRoomData);

    const { error: insertError } = await supabase.from("egg_day_chatting").insert({
      egg_day_chatting_room_id: chatRoomData.egg_day_chatting_room_id,
      egg_club_member_id: egg_club_member_id,
      egg_club_id: chatRoomData.egg_club_id,
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
