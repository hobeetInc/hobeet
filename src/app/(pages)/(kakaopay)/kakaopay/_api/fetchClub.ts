import { EggClubDataNoTax, EggPopDataNoTax } from "@/types/features/commerce/payment.types";
import supabase from "@/utils/supabase/client";

interface ClubResponse {
  oneTimeClubData?: EggPopDataNoTax;
  regularClubData?: EggClubDataNoTax;
}

export const fetchClubData = async (clubId: string, isOneTimeClub: boolean): Promise<ClubResponse> => {
  if (isOneTimeClub) {
    const { data, error } = await supabase
      .from("egg_pop")
      .select("egg_pop_name, egg_pop_location, egg_pop_date_time, egg_pop_image")
      .eq("egg_pop_id", parseInt(clubId))
      .single();

    if (error) throw error;
    return { oneTimeClubData: data };
  }

  const { data, error } = await supabase
    .from("egg_day")
    .select("egg_day_name, egg_day_location, egg_day_date_time, egg_day_image")
    .eq("egg_day_id", parseInt(clubId))
    .single();

  if (error) throw error;
  return { regularClubData: data };
};

export const fetchRegularClubId = async (clubId: string) => {
  const { data, error } = await supabase
    .from("egg_day")
    .select("egg_club_id")
    .eq("egg_day_id", parseInt(clubId))
    .single();

  if (error) throw error;
  return data;
};
