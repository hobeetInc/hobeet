// 위시리스트 아이텝 타입
export type WishItem = {
  r_c_id: {
    regular_club_id: number; // 클럽 ID
    regular_club_name: string; // 클럽 이름
    regular_club_image: string; // 클럽 이미지 URL
    regular_club_people_limited: number; // 클럽 정원
    user_id: {
      user_name: string; // 사용자 이름
      user_profile_img: string; // 사용자 프로필 이미지 URL
    }; // 사용자 배열
    r_c_member: {
      count: number; // 회원 수
    }[];
    wish_list: {
      r_c_id: number; // 클럽 ID
      user_id: string; // 사용자 ID
      wish_list_id: number; // 위시리스트 ID
    }[];
  };
};

// 인기있는 에그클럽 타입 정의
export type PopularEggClub = {
  regular_club_id: number; // 클럽 ID
  regular_club_name: string; // 클럽 이름
  regular_club_image: string; // 클럽 이미지 URL
  regular_club_people_limited: number; // 클럽 정원
  user_id: {
    user_name: string; // 사용자 이름
    user_profile_img: string; // 사용자 프로필 이미지 URL
  }; // 사용자 배열
  r_c_member: {
    count: number; // 회원 수
  }[]; // 회원 배열
  count: number;
  wish_list: {
    r_c_id: number; // 클럽 ID
    user_id: string; // 사용자 ID
    wish_list_id: number; // 위시리스트 ID
  }[]; // 각 클럽의 위시리스트 개수
};

// 에그팝과 에그클럽 공통 타입 정의
interface BaseClub {
  m_c_id: number;
  s_c_id: number;
  user_id: {
    user_profile_img: string;
    user_name: string;
  };
}

// 에그클럽 타입 정의
export interface EggClub extends BaseClub {
  type: "regular";
  regular_club_id: number;
  regular_club_name: string;
  regular_club_age: number;
  regular_club_gender: string;
  regular_club_people_limited: number;
  regular_club_image: string;
  regular_club_introduction: string;
  regular_club_create_at: string;
  regular_club_approval: boolean;
  r_c_member: { count: number }[];
  wish_list: {
    r_c_id: number;
    user_id: string;
    wish_list_id: number;
  }[];
}

// 에그팝 타입 정의
export interface EggPop extends BaseClub {
  type: "oneTime";
  one_time_club_id: number;
  one_time_club_name: string;
  one_time_age: number;
  one_time_gender: string | null;
  one_time_people_limited: number;
  one_time_image: string;
  one_time_club_introduction: string;
  one_time_create_at: string;
  one_time_club_date_time: string;
  one_time_club_location: string;
  one_time_tax: number;
}

// 에그팝과 에그클럽 타입 정의
export type Club = EggClub | EggPop;
