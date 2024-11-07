import { EggDayUserIdData, EggPopIdInfo } from "@/types/mypage.types";
import browserClient from "@/utils/supabase/client";

// API 함수들
export const getEggDayPayList = async (): Promise<EggDayUserIdData[]> => {
  const { data: userData } = await browserClient.auth.getUser();

  const { data, error } = await browserClient
    .from("egg_day_kakaopay")
    .select(
      `
        egg_day_kakaopay_create_at,
        egg_club_id,
        egg_day_id (
          egg_day_id,
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

  return data as unknown as EggDayUserIdData[];
};

export const getEggPopPayList = async (): Promise<EggPopIdInfo[]> => {
  const { data: userData } = await browserClient.auth.getUser();

  const { data, error } = await browserClient
    .from("egg_pop_kakaopay")
    .select(
      `
        egg_pop_kakaopay_create_at,
        egg_pop_id(
        egg_pop_id,
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

  return data as unknown as EggPopIdInfo[];
};
