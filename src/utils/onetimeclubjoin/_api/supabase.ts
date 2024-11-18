import { enterOneTimeChatRoom } from "@/app/(pages)/(chat)/_api/onetime";
import { createClient } from "@/utils/supabase/client";

// 클럽 가입 관련 커스텀 에러
export class ClubJoinError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClubJoinError";
  }
}

export class SupabaseClubAPI {
  private supabase = createClient();

  // 사용자 데이터 가져오기
  // userId를 기반으로 사용자의 상세 정보를 데이터베이스에서 가져옵니다.
  async getUserData(userId: string) {
    const { data, error } = await this.supabase.from("user").select("*").eq("user_id", userId).single();

    if (error) {
      throw new ClubJoinError("로그인 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  // 모임 정보 조회
  // clubId를 기반으로 특정 모임의 상세 정보를 가져옴
  async getClubData(clubId: number) {
    const { data, error } = await this.supabase.from("egg_pop").select("*").eq("egg_pop_id", clubId).single();

    if (error) {
      throw new ClubJoinError("모임 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  // 기존 멤버 확인
  // 특정 사용자가 이미 해당 모임에 가입했는지 확인
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

  // 현재 멤버 수 조회
  // 특정 모임의 현재 멤버 수를 가져옴
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

  // 일회성 모임 멤버 추가
  // 새로운 멤버를 모임에 추가
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

  // 나이 제한 확인
  // 사용자의 나이가 모임의 나이 제한에 맞는지 확인
  validateAgeRestriction(userAge: number, clubAge: number): void {
    if (clubAge === 100) {
      return; // 누구나 참여 가능
    }

    // 50대 이상 참여 가능한 모임
    if (clubAge === 50) {
      if (userAge < 50) {
        throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
      }
      return;
    }

    // 그 외 나이 제한 확인
    const userAgeGroup = Math.floor(userAge / 10) * 10;
    const clubAgeGroup = clubAge - (clubAge % 10);

    if (userAgeGroup !== clubAgeGroup) {
      throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
    }
  }

  // 성별 제한 확인
  // 사용자의 성별이 모임의 성별 제한에 맞는지 확인
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
