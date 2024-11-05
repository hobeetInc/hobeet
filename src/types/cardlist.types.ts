// 에그팝 데이터 타입
export interface EggPop {
  one_time_club_id: number;
  one_time_club_name: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_image: string;
  one_time_people_limited: number;
  user_id: string;
}

// 에그클럽 데이터 타입
export interface EggClub {
  regular_club_id: number;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_people_limited: number;
  user_id: string;
  approved_members: string[];
}

// 에그클럽 폼 타입
export interface EggClubForm {
  m_c_id: number;
  r_c_member: { count: number }[];
  regular_club_age: number;
  regular_club_approbval: boolean;
  regular_club_create_at: string;
  regular_club_id: number;
  regular_club_image: string;
  regular_club_introduction: string;
  regular_clun_name: string;
  regular_club_people_limited: number;
  s_c_id: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
  wish_list: {
    r_c_id: number;
    user_id: string;
    wish_list_id: number;
  }[];
}
