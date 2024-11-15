import browserClient from "@/utils/supabase/client";
import { EggPopForm } from "@/types/eggpop.types";
import { EggClubForm } from "@/types/eggclub.types";

export const submitOneTimeClubData = async (finalFormData: EggPopForm) => {
  const { data, error } = await browserClient.from("egg_pop").insert([finalFormData]).select("*").single();
  if (error) throw error;
  return data;
};

export const submitRegularClubData = async (finalFormData: EggClubForm) => {
  const { data, error } = await browserClient.from("egg_club").insert([finalFormData]).select("*").single();
  if (error) throw error;
  return data;
};

export const uploadImage = async (file: File) => {
  const { data, error } = await browserClient.storage.from("club-images").upload(`club-images/${Date.now()}`, file);
  if (error) throw error;

  const {
    data: { publicUrl }
  } = browserClient.storage.from("club-images").getPublicUrl(data.path);
  return publicUrl;
};
