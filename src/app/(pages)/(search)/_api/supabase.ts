import { EggClubSearchResults, EggPopSearchResults } from "@/types/search.types";
import browserClient from "@/utils/supabase/client";

export const getPopularClubs = async () => {
  const { data, error } = await browserClient
    .from("wish_list")
    .select(
      `
      egg_club(
        egg_club_id,
        egg_club_name,
        egg_club_image,
        egg_club_people_limited,
        user(
          user_name,
          user_profile_img
        ),
        egg_club_member (
          count
        ),
        wish_list(
          count
        )
      )
    `
    )
    .order("wish_list(count)", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
};

export const getSearchedRegularClubs = async (searchTerm: string): Promise<EggClubSearchResults[]> => {
  const { data: regularClubs, error: regularClubError } = await browserClient
    .from("egg_club")
    .select(
      `*, 
      user(
        user_name,
        user_profile_img
      ),
      egg_club_member(count),
      wish_list(count)
    `
    )
    .ilike("egg_club_name", `%${searchTerm}%`);

  if (regularClubError) {
    console.error("정기 모임 검색 중 에러 발생:", regularClubError);
    throw new Error("정기 모임 검색 중 에러가 발생했습니다.");
  }

  const typedRegularClubs = (regularClubs || []).map((club) => ({
    ...club,
    type: "eggClub" as const
  }));

  return typedRegularClubs;
};

export const getSearchedOneTimeClubs = async (searchTerm: string): Promise<EggPopSearchResults[]> => {
  const { data: oneTimeClubs, error: oneTimeClubError } = await browserClient
    .from("egg_pop")
    .select(
      `
      *,
      user(
        user_name,
        user_profile_img
      ),
      egg_pop_member(count)
    `
    )
    .ilike("egg_pop_name", `%${searchTerm}%`);

  if (oneTimeClubError) {
    console.error("일회성 모임 검색 중 에러 발생:", oneTimeClubError);
    throw new Error("일회성 모임 검색 중 에러가 발생했습니다.");
  }

  const typedOneTimeClubs = (oneTimeClubs || []).map((club) => ({
    ...club,
    type: "eggPop" as const
  }));

  return typedOneTimeClubs;
};
