import { Tables } from "./database.types";

// 정기적모임 안의 공지 인풋 타입
export type EggDay = Partial<Tables<"egg_day">>;
export type EggDayMember = Partial<Tables<"egg_day_member">>;

export type EggDayRequired = Pick<
  Tables<"egg_day">,
  "egg_day_content" | "egg_day_date_time" | "egg_day_location" | "egg_day_name" | "egg_day_tax"
> &
  Partial<
    Omit<
      Tables<"egg_day">,
      "egg_day_content" | "egg_day_date_time" | "egg_day_location" | "egg_day_name" | "egg_day_tax"
    >
  >;

export type EggDayMemberRequired = Pick<Tables<"egg_day_member">, "egg_day_id" | "user_id"> &
  Partial<Omit<Tables<"egg_day_member">, "egg_day_id" | "user_id">>;

export type EggDayWithEggDayMember = EggDay & {
  egg_day_member: { count: number }[];
};
