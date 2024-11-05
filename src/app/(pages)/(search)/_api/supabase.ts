import { Club, EggClub, EggPop, PopularEggClub, WishItem } from "@/types/search.types";
import browserClient from "@/utils/supabase/client";

export const getPopularClubs = async (): Promise<PopularEggClub[]> => {
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

  const grouped = wishes.reduce<Record<number, PopularEggClub>>((acc, curr) => {
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

  const typedRegularClubs: EggClub[] = (regularClubs || []).map((club) => ({
    ...club,
    type: "regular" as const
  }));

  const typedOneTimeClubs: EggPop[] = (oneTimeClubs || []).map((club) => ({
    ...club,
    type: "oneTime" as const
  }));

  return [...typedRegularClubs, ...typedOneTimeClubs];
};
