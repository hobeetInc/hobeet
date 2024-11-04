import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    // 현재 로그인한 사용자 정보 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("사용자 정보를 가져오는 데 실패했습니다: ", userError);
      return NextResponse.json({ error: "사용자 정보를 가져오는 데 실패했습니다." }, { status: 401 });
    }
    const body = await req.json();
    const oneTimeClubMember = body.oneTimeClubMember;
    console.log("oneTimeClubMember", oneTimeClubMember.data[0].one_time_club_id);

    const userId = userData.user.id;
    console.log(userId);

    const { data: memberData, error: memberError } = await supabase
      .from("o_t_c_member")
      .select("o_t_c_member_id")
      .eq("user_id", userId)
      .eq("o_t_c_id", oneTimeClubMember.data[0].one_time_club_id)
      .single();
    console.log("memberData", memberData);

    if (memberError || !memberData) {
      console.error("멤버 정보를 가져오는 데 실패했습니다: ", memberError);
      return NextResponse.json({ error: "멤버 정보를 찾을 수 없습니다." }, { status: 404 });
    }

    const o_t_c_member_id = memberData.o_t_c_member_id;
    console.log("o_t_c_member_id", o_t_c_member_id);

    // const { regularClubMember } = await req.json();
    // console.log("채팅방 정보: ", regularClubMember);
    const chatRoomData = oneTimeClubMember.data[0].one_time_club_chatting_room_id;
    console.log("chatRoomData", chatRoomData);

    const { error: insertError } = await supabase.from("one_time_club_chatting_room_member").insert({
      one_time_club_chatting_room_id: oneTimeClubMember.data[0].one_time_club_chatting_room_id,
      one_time_member_id: o_t_c_member_id,
      one_time_club_id: oneTimeClubMember.data[0].one_time_club_id,
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
