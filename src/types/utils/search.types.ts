import { Tables } from "../core/database.types";

// type ClubType = "eggPop" | "eggClub";

// export type EggPopSearchResults = Tables<"egg_pop"> & { type: ClubType };

export interface EggPopSearchResults {
  type: "eggPop";
  egg_pop_age: number | null;
  egg_pop_create_at: string;
  egg_pop_date_time: string;
  egg_pop_gender: string | null;
  egg_pop_id: number;
  egg_pop_image: string;
  egg_pop_introduction: string;
  egg_pop_location: string;
  egg_pop_member: {
    count: number;
  }[];
  egg_pop_name: string;
  egg_pop_people_limited: number;
  egg_pop_tax: number;
  main_category_id: number;
  sub_category_id: number;
  user_id: string;
  user: {
    user_name: string;
    user_profile_img: string;
  };
}
// export type EggClubSearchResults = Tables<"egg_club"> & { type: ClubType };
export interface EggClubSearchResults {
  type: "eggClub";
  egg_club_age: number | null;
  egg_club_approval: boolean;
  egg_club_create_at: string;
  egg_club_gender: string | null;
  egg_club_id: number;
  egg_club_image: string;
  egg_club_introduction: string;
  egg_club_name: string;
  egg_club_people_limited: number;
  main_category_id: number;
  sub_category_id: number;
  user_id: string;
  user: {
    user_name: string;
    user_profile_img: string;
  };
  egg_club_member: {
    count: number;
  }[];
  wish_list: {
    count: number;
  }[];
}

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
