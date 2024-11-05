import { SubCategory } from "@/types/category.types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getSubCategory = async (m_c_id: number) => {
  try {
    const { data, error } = await supabase.from("s_category").select("*").eq("m_c_id", m_c_id);

    if (error) {
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }
    // console.log(data);

    return data as SubCategory[];
  } catch (error) {
    console.error("getSubCategory 함수 에러:", error);
    throw error;
  }
};

export const getCategoryList = async (m_c_id: number, s_c_id: number) => {
  try {
    const { data, error } = await supabase
      .from("regular_club")
      .select(`*, user_id("user_profile_img", "user_name") , r_c_member(count), wish_list(count)`)
      .eq("m_c_id", m_c_id)
      .eq(s_c_id === 0 ? "m_c_id" : "s_c_id", s_c_id === 0 ? m_c_id : s_c_id);

    if (error) {
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    console.error("getCategoryList 함수 에러:", error);
    throw error;
  }
};
