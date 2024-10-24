import browserClient from "@/utils/supabase/client";

// 대분류 카테고리 조히
export const fetchMainCategories = async () => {
  const { data, error } = await browserClient.from("m_category").select("*").order("m_c_id");
  if (error) throw error;
  return data;
};

// 중분류 카테고리 조회
export const fetchSubCategories = async () => {
  const { data, error } = await browserClient.from("s_category").select("*").order("m_c_id, s_c_id");
  if (error) throw error;
  return data;
};

// 특정 대분류에 속한 소분류 카테고리만 조회
export const fetchNeedSubCategories = async (mainId: number) => {
  const { data, error } = await browserClient.from("s_category").select("*").eq("m_c_id", mainId).order("s_c_id");
  if (error) throw error;
  return data;
};
