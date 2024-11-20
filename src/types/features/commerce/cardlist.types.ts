import { Tables } from "../../core/database.types";
import { User } from "../user/user.types";

// 에그팝 데이터 타입
export type EggPop = Tables<"egg_pop">;
export type EggClub = Tables<"egg_club">;

// 에그클럽 폼 타입
export interface EggClubForm extends EggClub {
  user: User;
  egg_club_member: { count: number }[];
  wish_list: Tables<"wish_list">[];
}
