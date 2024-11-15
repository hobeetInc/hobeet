import browserClient from "@/utils/supabase/client";

export const getOneTimeClub = async () => {
  const { data, error } = await browserClient
    .from("egg_pop")
    .select(
      `
      *,
      user_id(user_name, user_profile_img),
      egg_pop_member(count)
    `
    )
    .order("egg_pop_create_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
};

export const getRegularClubList = async () => {
  const { data, error } = await browserClient
    .from("egg_club")
    .select(`*, user_id(user_name, user_profile_img), egg_club_member(count), wish_list(*)`)
    .order("egg_club_create_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
};

export const getAllOneTimeClub = async () => {
  const { data, error } = await browserClient
    .from("egg_pop")
    .select(
      `
      *,
      user_id(user_name, user_profile_img),
      egg_pop_member(count)
    `
    )
    .order("egg_pop_create_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getAllRegularClubList = async () => {
  const { data, error } = await browserClient
    .from("egg_club")
    .select(`*, user_id(user_name, user_profile_img), egg_club_member(count), wish_list(*)`)
    .order("egg_club_create_at", { ascending: false });
  if (error) throw error;
  return data;
};
