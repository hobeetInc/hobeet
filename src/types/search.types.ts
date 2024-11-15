import { Tables } from "./database.types";

type ClubType = "eggPop" | "eggClub";

export type EggPopSearchResults = Tables<"egg_pop"> & { type: ClubType };
export type EggClubSearchResults = Tables<"egg_club"> & { type: ClubType };
