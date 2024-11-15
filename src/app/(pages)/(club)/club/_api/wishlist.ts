import browserClient from "@/utils/supabase/client";
import { WishListData } from "@/types/eggclub.types";

export const submitWishList = async (wish: WishListData) => {
  const { data, error } = await browserClient.from("wish_list").insert(wish).select("*").single();
  if (error) throw error;
  return data;
};

export const getWishList = async (wish: WishListData) => {
  const { data, error } = await browserClient
    .from("wish_list")
    .select("*")
    .match({ egg_club_id: wish.egg_club_id, user_id: wish.user_id })
    .single();
  if (error) throw error;
  return data;
};

export const deleteWishList = async (wish: WishListData) => {
  const { data, error } = await browserClient
    .from("wish_list")
    .delete()
    .match({ egg_club_id: wish.egg_club_id, user_id: wish.user_id });
  if (error) throw error;
  return data;
};
