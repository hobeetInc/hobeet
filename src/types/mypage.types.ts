// 에그팝 데이터 타입
export type EggPopData = {
  o_t_c_id: EggPopPaymentDate;
  one_time_club_name: string;
  one_time_club_date_time: string;
  one_time_club_location: string;
  one_time_image: string;
};

// 에그클럽 데이터 타입
export type EggClubData = {
  r_c_notification_name: string;
  r_c_notification_date_time: string;
  r_c_notification_location: string;
  r_c_notification_image: string;
};

// 에그데이 데이터 타입
export type EggDayData = {
  r_c_notification_kakaopay_create_at: string;
  r_c_notification_id: EggClubData;
};

// 에그팝 결제 날짜
export type EggPopPaymentDate = {
  o_t_c_kakaopay_create_at: string;
};

// 에그팝 응답 타입
export type EggPopResponse = {
  o_t_c_id: EggPopData;
};

// 에그데이 응답 타입
export type EggDayResponse = {
  r_c_id: EggDayData;
};

// 클럽 정보 타입
export type EggClubInfo = {
  regular_club_name: string;
  regular_club_image: string;
  regular_club_people_limited: number;
  r_c_member: Array<{ count: number }>;
  wish_list: Array<{ count: number }>;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
};

// 위시리스트 응답 타입
export interface WishListResponse {
  r_c_id: EggClubInfo;
}
