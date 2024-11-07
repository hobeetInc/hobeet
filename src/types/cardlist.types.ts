// 에그팝 데이터 타입
export interface EggPop {
  egg_pop_id: number;
  egg_pop_name: string;
  egg_pop_location: string;
  egg_pop_date_time: string;
  egg_pop_image: string;
  egg_pop_people_limited: number;
  user_id: string;
}

// 에그클럽 데이터 타입
export interface EggClub {
  egg_club_id: number;
  egg_club_name: string;
  egg_club_image: string;
  egg_club_people_limited: number;
  user_id: string;
  approved_members: string[];
}

// 에그클럽 폼 타입
export interface EggClubForm {
  main_category_id: number;
  egg_club_member: { count: number }[];
  egg_club_age: number;
  egg_club_approval: boolean;
  egg_club_create_at: string;
  egg_club_id: number;
  egg_club_image: string;
  egg_club_introduction: string;
  egg_club_name: string;
  egg_club_people_limited: number;
  s_c_id: number;
  sub_category: {
    user_name: string;
    user_profile_img: string;
  };
  wish_list: {
    egg_club_id: number;
    user_id: string;
    wish_list_id: number;
  }[];
}
