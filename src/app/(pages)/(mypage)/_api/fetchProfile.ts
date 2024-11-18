import supabase from "@/utils/supabase/client";

interface UserProfile {
  user_name: string;
  user_profile_img: string;
}

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("user_name, user_profile_img")
    .eq("user_id", userId)
    .single();

  if (userError) throw userError;

  return {
    user_name: userData.user_name,
    user_profile_img: userData.user_profile_img
  };
};
