import supabase from "@/utils/supabase/client";

export const fetchUser = async (userId: string) => {
  try {
    const { data } = await supabase.from("user").select("*").eq("user_id", userId).single();
    return data;
  } catch (error) {
    console.error("유저 정보를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};
