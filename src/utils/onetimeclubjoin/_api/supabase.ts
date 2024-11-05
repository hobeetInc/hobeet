import { OneTimeClubChatRoomRecruiterEntrance } from "@/app/(pages)/(chat)/_components/oneTimeClub/OneTimeClubChatRoomRecruiterEntrance";
import { createClient } from "@/utils/supabase/client";

export class ClubJoinError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClubJoinError";
  }
}

export interface OneTimeClub {
  egg_pop_id: number;
  main_category_id: number;
  user_id: string;
  egg_pop_name: string;
  egg_pop_introduction: string;
  egg_pop_date_time: string;
  egg_pop_location: string;
  egg_pop_people_limited: number;
  egg_pop_tax: number;
  egg_pop_gender: string;
  egg_pop_age: number;
  egg_pop_image: string;
  egg_pop_create_at: string;
}

export interface User {
  user_id: string;
  user_email: string;
  user_nickname: string;
  user_gender: string;
  user_age: number;
  user_profile_img: string;
  user_roletype: boolean;
  user_create_at: string;
}

export interface ClubMember {
  egg_pop_id: number;
  user_id: string;
}

export class SupabaseClubAPI {
  private supabase = createClient();

  async getUserData(userId: string): Promise<User> {
    const { data, error } = await this.supabase.from("user").select("*").eq("user_id", userId).single();

    if (error) {
      throw new ClubJoinError("로그인 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  async getClubData(clubId: number): Promise<OneTimeClub> {
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
      o_t_c_id: clubId,
      user_id: userId
    });

    await OneTimeClubChatRoomRecruiterEntrance({ egg_pop_id: Number(clubId) });
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
