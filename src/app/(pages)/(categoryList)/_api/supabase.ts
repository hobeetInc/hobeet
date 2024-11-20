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
