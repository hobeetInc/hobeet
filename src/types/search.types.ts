// 위시리스트 아이텝 타입
export type WishItem = {
  egg_club_id: {
    egg_club_id: number; // 클럽 ID
    egg_club_name: string; // 클럽 이름
    egg_club_image: string; // 클럽 이미지 URL
    egg_club_people_limited: number; // 클럽 정원
    user_id: {
      user_name: string; // 사용자 이름
      user_profile_img: string; // 사용자 프로필 이미지 URL
    }; // 사용자 배열
    egg_club_member: {
      count: number; // 회원 수
    }[];
    wish_list: {
      egg_club_id: number; // 클럽 ID
      user_id: string; // 사용자 ID
      wish_list_id: number; // 위시리스트 ID
    }[];
  };
};

// 인기있는 에그클럽 타입 정의
export type PopularEggClub = {
  egg_club_id: number; // 클럽 ID
  egg_club_name: string; // 클럽 이름
  egg_club_image: string; // 클럽 이미지 URL
  egg_club_people_limited: number; // 클럽 정원
  user_id: {
    user_name: string; // 사용자 이름
    user_profile_img: string; // 사용자 프로필 이미지 URL
  }; // 사용자 배열
  egg_club_member: {
    count: number; // 회원 수
  }[]; // 회원 배열
  count: number;
  wish_list: {
    egg_club_id: number; // 클럽 ID
    user_id: string; // 사용자 ID
    wish_list_id: number; // 위시리스트 ID
  }[]; // 각 클럽의 위시리스트 개수
};

// 에그팝과 에그클럽 공통 타입 정의
interface BaseClub {
  main_category_id: number;
  sub_category_id: number;
  user_id: {
    user_profile_img: string;
    user_name: string;
  };
}

// 에그클럽 타입 정의
export interface EggClub extends BaseClub {
  type: "eggClub";
  egg_club_id: number;
  egg_club_name: string;
  egg_club_age: number;
  egg_club_gender: string;
  egg_club_people_limited: number;
  egg_club_image: string;
  egg_club_introduction: string;
  egg_club_create_at: string;
  egg_club_approval: boolean;
  egg_club_member: { count: number }[];
  wish_list: {
    r_c_id: number;
    user_id: string;
    wish_list_id: number;
  }[];
}

// 에그팝 타입 정의
export interface EggPop extends BaseClub {
  type: "eggPop";
  egg_pop_id: number;
  egg_pop_name: string;
  egg_pop_age: number;
  egg_pop_gender: string | null;
  egg_pop_people_limited: number;
  egg_pop_image: string;
  egg_pop_introduction: string;
  egg_pop_create_at: string;
  egg_pop_date_time: string;
  egg_pop_location: string;
  egg_pop_tax: number;
  egg_pop_member: { count: number }[];
}

// 에그팝과 에그클럽 타입 정의
export type Club = EggClub | EggPop;
