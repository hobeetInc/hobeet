import { ClubJoinError, SupabaseClubAPI } from "./_api/supabase";

type OneTimeClubJoinParams = {
  clubId: number;
  userId: string;
};

export const oneTimeClubJoin = async ({ clubId, userId }: OneTimeClubJoinParams) => {
  const clubAPI = new SupabaseClubAPI();

  try {
    // 사용자 데이터 가져오기
    const userData = await clubAPI.getUserData(userId);

    // 클럽 데이터 가져오기
    const clubData = await clubAPI.getClubData(clubId);

    // 이미 가입한 회원인지 확인
    const isExistingMember = await clubAPI.checkExistingMember(userId, clubId);
    if (isExistingMember) {
      // alert("이미 가입한 모임 입니다.");
      throw new ClubJoinError("이미 가입한 모임 입니다.");
    }
    // 현재 회원 수 확인
    const currentMembers = await clubAPI.getCurrentMemberCount(clubId);
    if (
      clubData.egg_pop_people_limited !== null &&
      currentMembers !== null &&
      currentMembers >= clubData.egg_pop_people_limited
    ) {
      // alert("모임 인원이 가득 찼습니다.");
      throw new ClubJoinError("모임 인원이 가득 찼습니다.");
    }
    // 성별 제한 확인
    clubAPI.validateGenderRestriction(userData.user_gender, clubData.egg_pop_gender);

    // 나이 제한 확인
    clubAPI.validateAgeRestriction(userData.user_age, clubData.egg_pop_age);

    // 결제 금액이 0원인 경우 바로 가입 처리
    if (clubData.egg_pop_tax === 0) {
      await clubAPI.insertMember(String(clubId), userId);
      // alert("모임 가입이 완료 되었습니다.");
      location.reload();
      return {
        message: "모임 가입이 완료 되었습니다."
      };
    }

    // 결제 페이지로 이동
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
