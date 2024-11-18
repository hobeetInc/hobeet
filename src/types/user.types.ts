// 유저 타입
// export type User = {
//   user_id: string;
//   user_name: string;
//   user_profile_img: string;
// };

import { Tables } from "./database.types";

export type User = Partial<Tables<"user">>;

export type MemberInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};
