import browserClient from "@/utils/supabase/client";

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

// PopularClub 타입 정의
export type PopularClub = {
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

export const getPopularClubs = async (): Promise<PopularClub[]> => {
  const { data, error } = await browserClient.from("wish_list").select(`
      egg_club_id (
        egg_club_id,
        egg_club_name,
        egg_club_image,
        egg_club_people_limited,
        user_id (
          user_name,
          user_profile_img
        ),
        egg_club_member (
          count
        ),
        wish_list(*)
      )
    `);

  if (error) throw error;

  const wishes = data as unknown as WishItem[];

  const grouped = wishes.reduce<Record<number, PopularClub>>((acc, curr) => {
    const clubId = curr.r_c_id.regular_club_id;
    if (!acc[clubId]) {
      acc[clubId] = {
        ...curr.r_c_id,
        count: 1
      };
    } else {
      acc[clubId].count += 1;
    }
    return acc;
  }, {});

  return Object.values(grouped)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

// 정규 모임과 일회성 모임의 공통 타입 정의
interface BaseClub {
  m_c_id: number;
  s_c_id: number;
  user_id: {
    user_profile_img: string;
    user_name: string;
  };
}

// 정규 모임 타입 정의
interface RegularClub extends BaseClub {
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

// 일회성 모임 타입 정의
interface OneTimeClub extends BaseClub {
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

type Club = RegularClub | OneTimeClub;

export const getSearchedClubs = async (searchTerm: string): Promise<Club[]> => {
  const { data: regularClubs, error: regularClubError } = await browserClient
    .from("egg_club")
    .select(
      `*, user_id(user_name,
          user_profile_img), egg_club_member(count),wish_list(*)`
    )
    .ilike("egg_club_name", `%${searchTerm}%`);

  const { data: oneTimeClubs, error: oneTimeClubError } = await browserClient
    .from("egg_pop")
    .select(
      `*,user_id(user_name,
          user_profile_img)`
    )
    .ilike("egg_pop_name", `%${searchTerm}%`);

  if (regularClubError || oneTimeClubError) {
    console.error("검색 중 에러 발생:", { regularClubError, oneTimeClubError });
    throw new Error("검색 중 에러가 발생했습니다.");
  }

  const typedRegularClubs: RegularClub[] = (regularClubs || []).map((club) => ({
    ...club,
    type: "regular" as const
  }));

  const typedOneTimeClubs: OneTimeClub[] = (oneTimeClubs || []).map((club) => ({
    ...club,
    type: "oneTime" as const
  }));

  return [...typedRegularClubs, ...typedOneTimeClubs];
};
