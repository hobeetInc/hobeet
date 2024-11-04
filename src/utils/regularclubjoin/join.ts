import { ClubJoinError } from "@/utils/onetimeclubjoin/_api/supabase";
import { RegularClubAPI } from "./_api/supabase";

type RegularClubJoinParams = {
  clubId: number;
  userId: string;
};

export const regularClubJoin = async ({ clubId, userId }: RegularClubJoinParams) => {
  const clubAPI = new RegularClubAPI();

  try {
    const clubData = await clubAPI.getClubData(clubId);

    // 사용자가 이미 회원인지 확인
    const isExistingMember = await clubAPI.checkExistingMember(userId, clubId);
    if (isExistingMember) {
      throw new ClubJoinError("이미 가입된 모임입니다.");
    }

    // 가입 조건 검증 (나이, 성별 등)
    await clubAPI.validateJoinConditions(userId, clubId);
    console.log("모임 승인 상태에 따라 가입 신청!!!");

    // 모임 승인 상태에 따라 가입 신청
    await clubAPI.applyForMembership(clubId, userId);
    console.log("클럽 데이터", clubData);
    return {
      success: true,
      message: clubData.regular_club_approval
        ? "모임 가입이 완료 되었습니다."
        : "가입 신청이 완료되었습니다. 모임장의 승인을 기다려주세요.",
      status: clubData.regular_club_approval ? "pending" : "active"
    };
  } catch (error) {
    if (error instanceof ClubJoinError) {
      throw error;
    }
    throw new ClubJoinError("예기치 않은 오류가 발생했습니다."); // 예기치 않은 오류 처리
  }
};
