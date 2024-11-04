export type WishItem = {
  r_c_id: {
    regular_club_id: number;
    regular_club_name: string;
    regular_club_image: string;
    regular_club_people_limited: number;
    user_id: {
      user_name: string;
      user_profile_img: string;
    }[];
    r_c_member: {
      count: number;
    }[];
  };
};

export type PopularClub = {
  regular_club_id: number;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_people_limited: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  }[];
  r_c_member: {
    count: number;
  }[];
  count: number;
};

import browserClient from "@/utils/supabase/client";

export const getPopularClubs = async (): Promise<PopularClub[]> => {
  const { data, error } = await browserClient.from("wish_list").select(`
      r_c_id (
        regular_club_id,
        regular_club_name,
        regular_club_image,
        regular_club_people_limited,
        user_id (
          user_name,
          user_profile_img
        ),
        r_c_member (
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
  user_id: string;
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
    .from("regular_club")
    .select(
      `*, user_id(user_name,
          user_profile_img), r_c_member(count),wish_list(*)`
    )
    .ilike("regular_club_name", `%${searchTerm}%`);

  const { data: oneTimeClubs, error: oneTimeClubError } = await browserClient
    .from("one_time_club")
    .select(
      `*,user_id(user_name,
          user_profile_img)`
    )
    .ilike("one_time_club_name", `%${searchTerm}%`);

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
