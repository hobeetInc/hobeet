import browserClient from "@/utils/supabase/client";

type NotificationData = {
  r_c_notification_kakaopay_create_at: string;
  r_c_notification_id: RegularClubData;
};
type RegularClubData = {
  r_c_notification_name: string;
  r_c_notification_date_time: string;
  r_c_notification_location: string;
  r_c_notification_image: string;
};

type OneTimeClubData = {
  o_t_c_id: OneTimeClub;
  one_time_club_name: string;
  one_time_club_date_time: string;
  one_time_club_location: string;
  one_time_image: string;
};

type OneTimeClub = {
  o_t_c_kakaopay_create_at: string;
};

type OneTimeClubResponse = {
  o_t_c_id: OneTimeClubData;
};

type NotificationResponse = {
  r_c_id: NotificationData;
};
// API 함수들
export const getEggDayPayList = async (): Promise<NotificationResponse[]> => {
  const { data: userData } = await browserClient.auth.getUser();

  const { data, error } = await browserClient
    .from("egg_day_kakaopay")
    .select(
      `
        egg_day_kakaopay_create_at,
        egg_day_id (
          egg_day_name,
          egg_day_date_time,
          egg_day_location,
          egg_day_image
        )
      `
    )
    .order("egg_day_kakaopay_create_at", { ascending: false })
    .eq("user_id", userData.user?.id);

  if (error) throw error;

  return data as unknown as NotificationResponse[];
};

export const getEggPopPayList = async (): Promise<OneTimeClubResponse[]> => {
  const { data: userData } = await browserClient.auth.getUser();

  const { data, error } = await browserClient
    .from("egg_pop_kakaopay")
    .select(
      `
        egg_pop_kakaopay_create_at,
        egg_pop_id(
          egg_pop_name,
          egg_pop_date_time,
          egg_pop_location,
          egg_pop_image
        )
      `
    )
    .order("egg_pop_kakaopay_create_at", { ascending: false })
    .eq("user_id", userData.user?.id);

  if (error) throw error;

  return data as unknown as OneTimeClubResponse[];
};
