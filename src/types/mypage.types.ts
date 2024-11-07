// 에그팝 데이터 타입
export type EggPopData = {
  egg_pop_id: EggPopPaymentDate;
  egg_pop_name: string;
  egg_pop_date_time: string;
  egg_pop_location: string;
  egg_pop_image: string;
};

// 에그클럽 데이터 타입
export type EggClubData = {
  egg_day_name: string;
  egg_day_date_time: string;
  egg_day_location: string;
  egg_day_image: string;
};

// 에그데이 데이터 타입
export type EggDayData = {
  egg_day_kakaopay_create_at: string;
  egg_day_id: EggClubData;
};

// 에그팝 결제 날짜
export type EggPopPaymentDate = {
  egg_pop_kakaopay_create_at: string;
};

// 에그팝 응답 타입
export type EggPopResponse = {
  egg_pop_id: EggPopData;
};

// 에그데이 응답 타입
export type EggDayResponse = {
  egg_club_id: EggDayData;
};

// 클럽 정보 타입
export type EggClubInfo = {
  egg_club_id: number;
  egg_club_name: string;
  egg_club_image: string;
  egg_club_people_limited: number;
  egg_club_member: Array<{ count: number }>;
  wish_list: Array<{ count: number }>;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
};

// 위시리스트 응답 타입
export interface WishListResponse {
  egg_club_id: EggClubInfo;
}

//에그팝 아이디를 가지고 있는 타입
export type EggPopIdInfo = {
  egg_pop_id: EggPopIdResponse;
};

export type EggPopIdResponse = {
  egg_pop_id: number;
  egg_pop_kakaopay_create_at: string;
  egg_pop_name: string;
  egg_pop_date_time: string;
  egg_pop_location: string;
  egg_pop_image: string;
};

// 에그데이유저ID포함한 데이터 타입
export type EggDayUserIdData = {
  egg_day_kakaopay_create_at: string;
  egg_club_id: number;
  egg_day_id: EggClubUserIdData;
};

// 에그클럽 유저Id포함한 데이터 타입
export type EggClubUserIdData = {
  egg_day_id: number;
  egg_day_name: string;
  egg_day_date_time: string;
  egg_day_location: string;
  egg_day_image: string;
};
