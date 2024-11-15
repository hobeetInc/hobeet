import { enterOneTimeChatRoom } from "@/app/(pages)/(chat)/_api/onetime";
import { createClient } from "@/utils/supabase/client";

export class ClubJoinError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClubJoinError";
  }
}

export class SupabaseClubAPI {
  private supabase = createClient();

  async getUserData(userId: string) {
    const { data, error } = await this.supabase.from("user").select("*").eq("user_id", userId).single();

    if (error) {
      throw new ClubJoinError("로그인 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  async getClubData(clubId: number) {
    const { data, error } = await this.supabase.from("egg_pop").select("*").eq("egg_pop_id", clubId).single();

    if (error) {
      throw new ClubJoinError("모임 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  async checkExistingMember(userId: string, clubId: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from("egg_pop_member")
      .select("*")
      .eq("user_id", userId)
      .eq("egg_pop_id", clubId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  }

  async getCurrentMemberCount(clubId: number): Promise<number | null> {
    const { count, error } = await this.supabase
      .from("egg_pop_member")
      .select("*", { count: "exact" })
      .eq("egg_pop_id", clubId);

    if (error) {
      throw new ClubJoinError("모임 인원 확인 중 오류가 발생 했습니다.");
    }

    return count;
  }

  // 가입
  async insertMember(clubId: string | null, userId: string | null): Promise<void> {
    const { error } = await this.supabase.from("egg_pop_member").insert({
      egg_pop_id: Number(clubId),
      user_id: userId
    });

    await enterOneTimeChatRoom({ egg_pop_id: Number(clubId) });
    if (error) {
      throw new ClubJoinError("모임 가입 처리 중 오류가 발생했습니다.");
    }
  }
  // 에그 데이 가입
  async eggDayInsertMember(clubId: string | null, userId: string | null): Promise<void> {
    const { error } = await this.supabase.from("egg_day_member").insert({
      egg_day_id: Number(clubId),
      user_id: userId
    });

    await enterOneTimeChatRoom({ egg_pop_id: Number(clubId) });
    if (error) {
      throw new ClubJoinError("모임 가입 처리 중 오류가 발생했습니다.");
    }
  }

  validateAgeRestriction(userAge: number, clubAge: number): void {
    if (clubAge === 100) {
      return; // 누구나 참여 가능
    }

    if (clubAge === 50) {
      if (userAge < 50) {
        throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
      }
      return;
    }

    const userAgeGroup = Math.floor(userAge / 10) * 10;
    const clubAgeGroup = clubAge - (clubAge % 10);

    if (userAgeGroup !== clubAgeGroup) {
      throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
    }
  }

  validateGenderRestriction(userGender: string, clubGender: string): void {
    if (clubGender !== null) {
      if (clubGender === "남성" && userGender !== "남성") {
        throw new ClubJoinError("남성만 참여 가능한 모임입니다.");
      }
      if (clubGender === "여성" && userGender !== "여성") {
        throw new ClubJoinError("여성만 참여 가능한 모임입니다.");
      }
    }
  }
}
