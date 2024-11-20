import { WishListData } from "@/types/features/club/eggclub.types";
import browserClient from "@/utils/supabase/client";

export const addClubToWishList = async (wish: WishListData) => {
  const { data, error } = await browserClient.from("wish_list").insert(wish).select("*").single();
  if (error) throw error;
  return data;
};

export const getClubWishListStatus = async (wish: WishListData) => {
  const { data, error } = await browserClient
    .from("wish_list")
    .select("*")
    .match({ egg_club_id: wish.egg_club_id, user_id: wish.user_id })
    .single();
  if (error) {
    // 위시리스트를 찾을 수 없는 상황 (정상적인 상황)
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data;
};

export const removeClubFromWishList = async (wish: WishListData) => {
  const { data, error } = await browserClient
    .from("wish_list")
    .delete()
    .match({ egg_club_id: wish.egg_club_id, user_id: wish.user_id });
  if (error) throw error;
  return data;
};
