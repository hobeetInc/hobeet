import supabase from "@/utils/supabase/client";

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("로그아웃 중 오류가 발생했습니다:", error);
    throw error;
  } finally {
    localStorage.removeItem("loginInfoStore");
  }
};
