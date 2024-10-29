// import { createClient } from "../supabase/client";

// export class ClubJoinError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = "ClubJoinError";
//   }
// }

// type OneTimeClubJoinParams = {
//   clubId: number;
//   userId: string;
// };

// export const oneTimeClubJoin = async ({ clubId, userId }: OneTimeClubJoinParams) => {
//   const supabase = createClient();

//   try {
//     const { data: userData, error: userError } = await supabase.from("user").select("*").eq("user_id", userId).single();

//     if (userError) {
//       throw new ClubJoinError("로그인 정보를 찾을 수 없습니다.");
//     }

//     const { data: clubData, error: clubError } = await supabase
//       .from("one_time_club")
//       .select("*")
//       .eq("one_time_club_id", clubId)
//       .single();

//     if (clubError) {
//       throw new ClubJoinError("모임 정보를 찾을 수 없습니다.");
//     }

//     const { data: existingMember } = await supabase
//       .from("o_t_c_member")
//       .select("*")
//       .eq("user_id", userId)
//       .eq("o_t_c_id", clubId)
//       .single();

//     if (existingMember) {
//       throw new ClubJoinError("이미 가입한 모임 입니다.");
//     }

//     const { count, error: countError } = await supabase
//       .from("o_t_c_member")
//       .select("*", { count: "exact" })
//       .eq("o_t_c_id", clubId);

//     if (countError) {
//       throw new ClubJoinError("모임 인원 확인 중 오류가 발생 했습니다.");
//     }

//     const currentMembers = count ?? 0;

//     if (currentMembers >= clubData.one_time_people_limited) {
//       throw new ClubJoinError("모임 인원이 가득 찼습니다.");
//     }

//     // 성별 제한 확인
//     if (clubData.one_time_gender !== 0) {
//       // 0이 아닐 경우 성별 제한이 있음
//       if (clubData.one_time_gender === 1 && userData.user_gender !== "male") {
//         throw new ClubJoinError("남성만 참여 가능한 모임입니다.");
//       }
//       if (clubData.one_time_gender === 2 && userData.user_gender !== "female") {
//         throw new ClubJoinError("여성만 참여 가능한 모임입니다.");
//       }
//     }

//     // 수정된 나이 제한 로직
//     if (clubData.one_time_age === 100) {
//       // 누구나 참여 가능
//     } else if (clubData.one_time_age === 50) {
//       // 50대 이상 제한
//       if (userData.user_age < 50) {
//         throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
//       }
//     } else {
//       // 특정 나이대 제한 (10대~40대)
//       const userAgeGroup = Math.floor(userData.user_age / 10) * 10;
//       const clubAgeGroup = clubData.one_time_age - (clubData.one_time_age % 10);

//       if (userAgeGroup !== clubAgeGroup) {
//         throw new ClubJoinError("나이 제한으로 인해 가입할 수 없습니다.");
//       }
//     }

//     const { error: joinError } = await supabase.from("o_t_c_member").insert({
//       o_t_c_id: clubId,
//       user_id: userId
//     });

//     if (joinError) {
//       throw new ClubJoinError("모임 가입 처리 중 오류가 발생했습니다.");
//     }

//     return {
//       success: true,
//       message: "모임 가입이 완료 되었습니다."
//     };
//   } catch (error) {
//     if (error instanceof ClubJoinError) {
//       throw error;
//     }
//     throw new ClubJoinError("예기치 않은 오류가 발생했습니다.");
//   }
// };

import { SupabaseClubAPI, ClubJoinError } from "./_api/supabase";

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
      throw new ClubJoinError("이미 가입한 모임 입니다.");
    }

    // 현재 회원 수 확인
    const currentMembers = await clubAPI.getCurrentMemberCount(clubId);
    if (
      clubData.one_time_people_limited !== null &&
      currentMembers !== null &&
      currentMembers >= clubData.one_time_people_limited
    ) {
      throw new ClubJoinError("모임 인원이 가득 찼습니다.");
    }

    // 성별 제한 확인
    clubAPI.validateGenderRestriction(userData.user_gender, clubData.one_time_gender);

    // 나이 제한 확인
    clubAPI.validateAgeRestriction(userData.user_age, clubData.one_time_age);

    // 회원 추가
    await clubAPI.insertMember(clubId, userId);

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
