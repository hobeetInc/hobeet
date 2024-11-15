import { enterRegularChatRoom } from "@/app/(pages)/(chat)/_api/regular";
import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { createClient } from "@/utils/supabase/client";

export class RegularClubAPI {
  private supabase = createClient();

  async validateJoinConditions(userId: string, clubId: number) {
    const [user, club, memberCount] = await Promise.all([
      this.getUserData(userId),
      this.getClubData(clubId),
      this.getCurrentMemberCount(clubId)
    ]);

    // 인원 제한 검증
    if (club.egg_club_people_limited !== 100 && memberCount >= club.egg_club_people_limited) {
      throw new ClubJoinError("모임 인원이 초과되었습니다.");
    }

    // 나이 제한 검증
    if (club.egg_club_age !== 100 && user.user_age !== 100) {
      if (club.egg_club_age === 50 && user.user_age < 50) {
        throw new ClubJoinError("50대 이상만 가입할 수 있는 모임입니다.");
      }
      const userAgeGroup = Math.floor(user.user_age / 10) * 10;
      const clubAgeGroup = club.egg_club_age - (club.egg_club_age % 10);
      if (userAgeGroup !== clubAgeGroup) {
        throw new ClubJoinError("해당 연령대만 가입할 수 있는 모임입니다.");
      }
    }

    // 성별 제한 검증
    if (club.egg_club_gender !== null && user.user_gender !== null) {
      if (club.egg_club_gender === "남성" && user.user_gender !== "남성") {
        throw new ClubJoinError("남성만 참여 가능한 모임입니다.");
      }
      if (club.egg_club_gender === "여성" && user.user_gender !== "여성") {
        throw new ClubJoinError("여성만 참여 가능한 모임입니다.");
      }
    }
  }

  async applyForMembership(clubId: number, userId: string) {
    const isExistingMember = await this.checkExistingMember(userId, clubId);
    if (isExistingMember) {
      throw new ClubJoinError("이미 가입된 모임입니다.");
    }

    await this.validateJoinConditions(userId, clubId);

    const club = await this.getClubData(clubId);

    if (!club) {
      throw new ClubJoinError("모임을 찾을 수 없습니다.");
    }

    if (club.egg_club_approval) {
      // r_c_participation_request 테이블에 pending 상태로 추가
      await this.supabase.from("egg_club_participation_request").insert({
        egg_club_id: clubId,
        user_id: userId,
        egg_club_participation_request_status: "pending"
      });
    } else {
      await this.insertMember(clubId, userId);
    }
  }

  async insertMember(clubId: number, userId: string) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const koreaTime = new Date(utc + koreaTimeDiff).toISOString();
    const { data } = await this.supabase
      .from("egg_club_participation_request")
      .insert({
        egg_club_id: clubId,
        user_id: userId,
        egg_club_participation_request_status: "active",
        egg_club_participation_request_approved_date: koreaTime
      })
      .select("*")
      .single();
    const { error } = await this.supabase.from("egg_club_member").insert({
      egg_club_id: clubId,
      user_id: userId,
      egg_club_request_status: "active",
      egg_club_participation_request_id: data.egg_club_participation_request_id
    });
    await enterRegularChatRoom({ egg_club_id: clubId });
    if (error) {
      throw new ClubJoinError("모임 가입 처리 중 오류가 발생했습니다.");
    }
  }

  async getUserData(userId: string) {
    const { data, error } = await this.supabase.from("user").select("*").eq("user_id", userId).single();
    if (error) throw new ClubJoinError("사용자 정보를 찾을 수 없습니다.");
    return data;
  }

  async getClubData(clubId: number) {
    const { data, error } = await this.supabase
      .from("egg_club")
      .select("*, user:user_id")
      .eq("egg_club_id", clubId)
      .single();
    if (error) throw new ClubJoinError("모임 정보를 찾을 수 없습니다.");
    return data;
  }

  async getCurrentMemberCount(clubId: number) {
    const { count, error } = await this.supabase
      .from("egg_club_member")
      .select("*", { count: "exact" })
      .eq("egg_club_id", clubId)
      .eq("egg_club_request_status", "active");

    if (error) {
      console.error("멤버 수 조회 오류:", error);
      throw new ClubJoinError("멤버 수 조회 중 오류가 발생했습니다.");
    }

    return count ?? 0;
  }

  async checkExistingMember(userId: string, clubId: number) {
    const { data, error } = await this.supabase
      .from("egg_club_member")
      .select("*")
      .eq("user_id", userId)
      .eq("egg_club_id", clubId)
      .single();

    return !error && !!data;
  }
}
