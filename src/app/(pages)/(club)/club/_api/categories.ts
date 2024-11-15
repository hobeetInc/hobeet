import browserClient from "@/utils/supabase/client";

export const fetchMainCategories = async () => {
  const { data, error } = await browserClient.from("main_category").select("*").order("main_category_id");
  if (error) throw error;
  return data;
};

export const fetchSubCategories = async () => {
  const { data, error } = await browserClient
    .from("sub_category")
    .select("*")
    .order("main_category_id, sub_category_id");
  if (error) throw error;
  return data;
};

export const fetchNeedSubCategories = async (mainId: number) => {
  const { data, error } = await browserClient
    .from("sub_category")
    .select("*")
    .eq("main_category_id", mainId)
    .order("sub_category_id");
  if (error) throw error;
  return data;
};
