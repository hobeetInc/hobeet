import { OneTimeClubChatRoomRecruiterEntrance } from "@/app/(pages)/(chat)/_components/oneTimeClub/OneTimeClubChatRoomRecruiterEntrance";
import { createClient } from "@/utils/supabase/client";

export class ClubJoinError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClubJoinError";
  }
}

export interface OneTimeClub {
  one_time_club_id: number;
  m_c_id: number;
  user_id: string;
  one_time_club_name: string;
  one_time_club_introduction: string;
  one_time_club_date_time: string;
  one_time_club_location: string;
  one_time_people_limited: number;
  one_time_tax: number;
  one_time_gender: string;
  one_time_age: number;
  one_time_image: string;
  one_time_create_at: string;
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
  o_t_c_id: number;
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
    const { data, error } = await this.supabase
      .from("one_time_club")
      .select("*")
      .eq("one_time_club_id", clubId)
      .single();

    if (error) {
      throw new ClubJoinError("모임 정보를 찾을 수 없습니다.");
    }

    return data;
  }

  async checkExistingMember(userId: string, clubId: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from("o_t_c_member")
      .select("*")
      .eq("user_id", userId)
      .eq("o_t_c_id", clubId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  }

  async getCurrentMemberCount(clubId: number): Promise<number | null> {
    const { count, error } = await this.supabase
      .from("o_t_c_member")
      .select("*", { count: "exact" })
      .eq("o_t_c_id", clubId);

    if (error) {
      throw new ClubJoinError("모임 인원 확인 중 오류가 발생 했습니다.");
    }

    return count;
  }

  // 가입
  async insertMember(clubId: number, userId: string): Promise<void> {
    const { error } = await this.supabase.from("o_t_c_member").insert({
      o_t_c_id: clubId,
      user_id: userId
    });

    await OneTimeClubChatRoomRecruiterEntrance({ one_time_club_id: clubId, user_id: userId });
    if (error) {
      throw new ClubJoinError("모임 가입 처리 중 오류가 발생했습니다.");
    }
  }

  validateAgeRestriction(userAge: number, clubAge: number): void {
    if (clubAge === null) {
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
