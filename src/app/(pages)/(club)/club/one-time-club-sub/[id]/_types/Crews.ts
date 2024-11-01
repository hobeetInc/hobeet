export interface GetOneTimeClub {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  one_time_age: number;
  one_time_tax: number;
  one_time_image: string;
  one_time_gender: string | null;
  one_time_club_id: number;
  one_time_club_name: string;
  one_time_create_at: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_people_limited: number;
  one_time_club_introduction: string;
}

export interface User {
  user_name: string;
  user_profile_img: string;
}

// 멤버 정보 타입
export interface Member {
  o_t_c_member_id: number;
  o_t_c_id: number;
  user_id: string;
  one_time_club: GetOneTimeClub;
  user: User;
}
