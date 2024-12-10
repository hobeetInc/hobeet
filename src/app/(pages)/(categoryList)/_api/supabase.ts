import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getSubCategory = async (main_category_id: number) => {
  try {
    const { data, error } = await supabase.from("sub_category").select("*").eq("main_category_id", main_category_id);

    if (error) {
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    console.error("getSubCategory 함수 에러:", error);
    throw error;
  }
};

export const getAllMainCategory = async () => {
  try {
    const { data, error } = await supabase.from("main_category").select("*");

    if (error) {
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    console.error("getAllMainCategory 함수 에러:", error);
    throw error;
  }
};

export const getEggPopMainCategory = async (main_category_id: number) => {
  console.log(main_category_id);
  try {
    const query = supabase.from("egg_pop").select(`* , user(user_profile_img, user_name) , egg_pop_member(count)`);

    if (main_category_id !== 0) {
      query.eq("main_category_id", main_category_id);
    }

    const { data } = await query;
    return data;
  } catch (error) {
    console.error("getEggPopMainCategory 함수 에러:", error);
    throw error;
  }
};

export const getCategoryList = async (main_category_id: number, sub_category_id: number) => {
  try {
    const { data, error } = await supabase
      .from("egg_club")
      .select(
        `
        *,
        user(user_profile_img, user_name),
        egg_club_member(count),
        wish_list(*)
      `
      )
      .eq("main_category_id", main_category_id)
      .eq(
        sub_category_id === 0 ? "main_category_id" : "sub_category_id",
        sub_category_id === 0 ? main_category_id : sub_category_id
      );

    if (error) {
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    console.error("getCategoryList 함수 에러:", error);
    throw error;
  }
};

export const getUserId = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    if (data) {
      return data.user.id;
    }
  } catch (error) {
    console.error("getUserId 함수 에러:", error);
    throw error;
  }
};
