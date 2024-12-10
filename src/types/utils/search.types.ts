import { Tables } from "../core/database.types";

type ClubType = "eggPop" | "eggClub";

export type EggPopSearchResults = Tables<"egg_pop"> & { type: ClubType };
export type EggClubSearchResults = Tables<"egg_club"> & { type: ClubType };

export type WishItem = {
  egg_club_id: Pick<
    Tables<"egg_club">,
    "egg_club_id" | "egg_club_name" | "egg_club_image" | "egg_club_people_limited"
  > & {
    user_id: Pick<Tables<"user">, "user_name" | "user_profile_img">;
    egg_club_member: {
      count: number;
    }[];
    wish_list: Pick<Tables<"wish_list">, "egg_club_id" | "user_id" | "wish_list_id">[];
  };
};
