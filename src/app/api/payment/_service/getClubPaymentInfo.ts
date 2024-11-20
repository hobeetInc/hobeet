import supabase from "@/utils/supabase/client";

interface PaymentInfo {
  amount: number;
  itemName: string;
}

export const getClubPaymentInfo = async (clubType: boolean, clubId: number): Promise<PaymentInfo> => {
  if (clubType) {
    const { data, error } = await supabase
      .from("egg_pop")
      .select("egg_pop_name, egg_pop_tax")
      .eq("egg_pop_id", clubId)
      .single();

    if (error) {
      throw new Error("에그팝 모임 정보를 찾을 수 없습니다");
    }

    return {
      amount: data.egg_pop_tax,
      itemName: data.egg_pop_name
    };
  }

  const { data, error } = await supabase
    .from("egg_day")
    .select("egg_day_name, egg_day_tax")
    .eq("egg_day_id", clubId)
    .single();

  if (error) {
    throw new Error("에그데이 모임 정보를 찾을 수 없습니다");
  }

  return {
    amount: data.egg_day_tax,
    itemName: data.egg_day_name
  };
};
