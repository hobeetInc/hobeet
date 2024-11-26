import supabase from "@/utils/supabase/client";

export const fetchUser = async (userId: string) => {
  const { data, error } = await supabase.from("user").select("*").eq("user_id", userId).single();

  if (error) throw error;

  return data;
};
