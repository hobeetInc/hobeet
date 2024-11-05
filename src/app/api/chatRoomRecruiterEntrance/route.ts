import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  // 현재 로그인한 사용자 정보 가져오기
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("사용자 정보를 가져오는 데 실패했습니다: ", userError);
    return NextResponse.json({ error: "사용자 정보를 가져오는 데 실패했습니다." }, { status: 401 });
  }

  const userId = userData.user.id;

  try {
    const { data: memberData, error: memberError } = await supabase
      .from("egg_club_member")
      .select("egg_club_member_id")
      .eq("user_id", userId)
      .single();

    if (memberError || !memberData) {
      console.error("멤버 정보를 가져오는 데 실패했습니다: ", memberError);
      return NextResponse.json({ error: "멤버 정보를 찾을 수 없습니다." }, { status: 404 });
    }

    const egg_club_member_id = memberData.egg_club_member_id;

    const { regularClubMember } = await req.json();
    // console.log("채팅방 정보: ", regularClubMember);
    const chatRoomData = regularClubMember.data[0];

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
