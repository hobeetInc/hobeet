import supabase from "@/utils/supabase/client";

export const updateUser = async (
  userId: string,
  updateData: {
    user_name: string;
    user_gender: string;
    user_age: number;
    user_profile_img: string;
    user_birth: string;
  }
) => {
  const { error } = await supabase.from("user").update(updateData).eq("user_id", userId);

  if (error) throw error;
  return true;
};
