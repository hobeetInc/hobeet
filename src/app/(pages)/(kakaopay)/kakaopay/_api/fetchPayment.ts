import supabase from "@/utils/supabase/client";

export const fetchPaymentData = async (requestUserId: string, clubId: string, isOneTimeClub: boolean) => {
  if (isOneTimeClub) {
    const { data, error } = await supabase
      .from("egg_pop_kakaopay")
      .select("egg_pop_kakaopay_cid, egg_pop_kakaopay_tid, egg_pop_kakaopay_create_at")
      .eq("user_id", requestUserId)
      .eq("egg_pop_id", parseInt(clubId))
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return { oneTimeClubPayData: data };
  }

  const { data, error } = await supabase
    .from("egg_day_kakaopay")
    .select("egg_day_kakaopay_cid, egg_day_kakaopay_tid, egg_day_kakaopay_create_at")
    .eq("user_id", requestUserId)
    .eq("egg_day_id", parseInt(clubId))
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return { regularClubPayData: data };
};
