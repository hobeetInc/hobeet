import browserClient from "@/utils/supabase/client";
import { EggDay, InsertEggDayMember } from "@/types/eggday.types";

export const getRegularNotification = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("egg_day")
    .select("*")
    .eq("egg_club_id", clubId)
    .order("egg_day_create_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const submitRegularClubNotification = async (finalData: EggDay) => {
  const { data, error } = await browserClient.from("egg_day").insert([finalData]).select("*").single();
  if (error) throw error;
  return data;
};

export const submitRegularMember = async (member: InsertEggDayMember) => {
  const { data, error } = await browserClient.from("egg_day_member").insert(member).select("*").single();
  if (error) throw error;
  return data;
};

export const getRegularClubNotification = async (clubId: number) => {
  const currentDate = new Date().toISOString();
  const { data, error } = await browserClient
    .from("egg_day")
    .select("*, egg_day_member(count)")
    .eq("egg_club_id", clubId)
    .gte("egg_day_date_time", currentDate)
    .order("egg_day_date_time", { ascending: true });
  if (error) throw error;
  return data;
};

export const getNotificationData = async (clubId: number) => {
  const { data, error } = await browserClient.from("egg_day").select("*").eq("egg_club_id", clubId);
  if (error) throw error;
  return data;
};

export const getNotificationMember = async (notificationId: number | undefined) => {
  const { data, error } = await browserClient
    .from("egg_day_member")
    .select(`*, user(user_name, user_profile_img)`)
    .eq("egg_day_id", notificationId);
  if (error) throw error;
  return data;
};
