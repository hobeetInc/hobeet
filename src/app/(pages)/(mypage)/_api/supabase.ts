import browserClient from "@/utils/supabase/client";

type NotificationData = {
  r_c_notification_kakaopay_create_at: string;
  r_c_notification_id: {
    r_c_notification_name: string;
    r_c_notification_date_time: string;
    r_c_notification_location: string;
    r_c_notification_image: string;
  }[];
};

export const getEggDayPayList = async (): Promise<NotificationData[]> => {
  const { data: userData } = await browserClient.auth.getUser();

  const { data, error } = await browserClient
    .from("r_c_notification_kakaopay")
    .select(
      `
        r_c_notification_kakaopay_create_at,
        r_c_notification_id (
          r_c_notification_name,
          r_c_notification_date_time,
          r_c_notification_location,
          r_c_notification_image
        )
      `
    )
    .eq("user_id", userData.user?.id);

  if (error) throw error;

  return data;
};
