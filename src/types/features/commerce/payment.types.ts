import { Tables } from "../../core/database.types";

// 에그팝 데이터 타입
export type EggPopData = Partial<Tables<"egg_pop">>;

// 에그클럽 데이터 타입
export type EggClubData = Partial<Tables<"egg_club">>;

// 에그데이 데이터 타입
export type EggDayData = Partial<Tables<"egg_day">>;

// 에그팝 지불 타입
export type EggPopPay = {
  egg_pop_kakaopay_cid: string;
  egg_pop_kakaopay_tid: string;
  egg_pop_kakaopay_create_at: string;
};

// 에그 클럽 지불 타입
export type EggClubPay = {
  egg_day_kakaopay_cid: string;
  egg_day_kakaopay_tid: string;
  egg_day_kakaopay_create_at: string;
};

// 에그팝 참가비 없는 버전
export type EggPopDataNoTax = {
  egg_pop_name: string;
  egg_pop_location: string;
  egg_pop_date_time: string;
  egg_pop_image: string | null;
};

// 에그클럽 참가비 없는 버전
export type EggClubDataNoTax = {
  egg_day_name: string;
  egg_day_location: string;
  egg_day_date_time: string;
  egg_day_image: string;
};
