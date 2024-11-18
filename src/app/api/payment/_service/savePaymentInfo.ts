import supabase from "@/utils/supabase/client";

export const savePaymentInfo = async (clubType: boolean, clubId: number, requestUserId: string, tid: string) => {
  if (clubType) {
    const { error } = await supabase.from("egg_pop_kakaopay").insert({
      egg_pop_id: clubId,
      user_id: requestUserId,
      egg_pop_kakaopay_cid: "TC0ONETIME",
      egg_pop_kakaopay_tid: tid
    });

    if (error) {
      throw new Error("에그팝 결제 정보 저장에 실패했습니다");
    }
    return;
  } else {
    const { data: rcIdData, error: rcIdError } = await supabase
      .from("egg_day")
      .select("egg_club_id")
      .eq("egg_day_id", clubId)
      .single();

    if (rcIdError) {
      throw new Error("에그데이 클럽 정보를 찾을 수 없습니다");
    }

    const { data: rcmIdData, error: rcmError } = await supabase
      .from("egg_club_member")
      .select("egg_club_member_id")
      .eq("egg_club_id", rcIdData.egg_club_id)
      .eq("user_id", requestUserId)
      .single();

    if (rcmError) {
      throw new Error("멤버 정보를 찾을 수 없습니다");
    }

    const { error } = await supabase.from("egg_day_kakaopay").insert({
      egg_club_member_id: rcmIdData.egg_club_member_id,
      egg_club_id: rcIdData.egg_club_id,
      egg_day_id: clubId,
      user_id: requestUserId,
      egg_day_kakaopay_cid: "TC0ONETIME",
      egg_day_kakaopay_tid: tid
    });

    if (error) {
      throw new Error("에그데이 결제 정보 저장에 실패했습니다");
    }
  }
};
