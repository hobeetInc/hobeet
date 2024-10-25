import { createClient } from "../supabase/client";

export class ClubJoinError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClubJoinError";
  }
}

export const joinClub = async (clubId: number, userId: string) => {
  const supabase = createClient();

  try {
    const { data: userData, error: userError } = await supabase.from("user").select("*").eq("user_id", userId).single();

    if (userError) {
      throw new ClubJoinError("로그인 정보를 찾을 수 없습니다.");
    }

    const { data: clubData, error: clubError } = await supabase
      .from("one_time_club")
      .select("*")
      .eq("one_time_club_id", clubId)
      .single();

    if (clubError) {
      throw new ClubJoinError("모임 정보를 찾을 수 없습니다.");
    }

    const { data: existingMember } = await supabase
      .from("o_t_c_member")
      .select("*")
      .eq("user_id", userId)
      .eq("o_t_c_id", clubId)
      .single();

    if (existingMember) {
      throw new ClubJoinError("이미 가입한 모임 입니다.");
    }

    const { count, error: countError } = await supabase
      .from("o_t_c_member")
      .select("*", { count: "exact" })
      .eq("o_t_c_id", clubId);

    if (countError) {
      throw new ClubJoinError("모임 인원 확인 중 오류가 발생 했습니다.");
    }

    const currentMembers = count ?? 0;

    if (currentMembers >= clubData.one_time_people_limited) {
      throw new ClubJoinError("모임 인원이 가득 찼습니다.");
    }

    if (userData.user_age < clubData.one_time_age) {
      throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
    }

    const { error: joinError } = await supabase.from("o_t_c_member").insert({
      o_t_c_id: clubId,
      user_id: userId
    });

    if (joinError) {
      throw new ClubJoinError("모임 가입 처리 중 오류가 발생했습니다.");
    }

    return {
      success: true,
      message: "모임 가입이 완료 되었습니다."
    };
  } catch (error) {
    if (error instanceof ClubJoinError) {
      throw error;
    }
    throw new ClubJoinError("예기치 않은 오류가 발생했습니다.");
  }
};
