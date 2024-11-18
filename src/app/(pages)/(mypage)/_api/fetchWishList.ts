import supabase from "@/utils/supabase/client";

export interface WishlistItem {
  egg_club: {
    egg_club_id: number;
    egg_club_name: string;
    egg_club_image: string;
    egg_club_people_limited: number;
    egg_club_member: { count: number }[];
    wish_list: { count: number }[];
    user: {
      user_name: string;
      user_profile_img: string;
    };
  };
}

export const fetchWishlist = async (userId: string) => {
  const { data: wishlistData, error: fetchError } = await supabase
    .from("wish_list")
    .select(
      `egg_club(
        egg_club_id,
        egg_club_name,
        egg_club_image, 
        egg_club_people_limited,
        egg_club_member(count),
        wish_list(count),
        user(
          user_name, 
          user_profile_img
        )
      )`
    )
    .eq("user_id", userId);

  if (fetchError) throw fetchError;

  return wishlistData as WishlistItem[];
};
