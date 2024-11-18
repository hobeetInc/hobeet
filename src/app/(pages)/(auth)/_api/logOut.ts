import supabase from "@/utils/supabase/client";

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  localStorage.removeItem("loginInfoStore");
};
