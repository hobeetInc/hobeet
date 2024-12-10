import { Tables } from "../../core/database.types";

export type User = Partial<Tables<"user">>;

export type MemberInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};
