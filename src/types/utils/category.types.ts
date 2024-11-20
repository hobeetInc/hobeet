import { Tables } from "../core/database.types";

export type MainCategory = Tables<"main_category">;
export type SubCategory = Tables<"sub_category">;

// 대분류 카테고리 타입
export interface Category {
  id: number;
  name: string;
  icon: string;
  alt: string;
}
