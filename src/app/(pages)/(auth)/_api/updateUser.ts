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
  try {
    await supabase.from("user").update(updateData).eq("user_id", userId);

    return true;
  } catch (error) {
    console.error("유저 정보를 업데이트 하던 도중 오류가 발생했습니다:", error);
    throw error;
  }
};
