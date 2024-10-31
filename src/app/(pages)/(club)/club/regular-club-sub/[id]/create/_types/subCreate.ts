export interface RegularClubNotification {
  user_id: string | null;
  r_c_notification_name: string;
  r_c_notification_content: string;
  r_c_notification_date_time: string;
  r_c_notification_location: string;
  r_c_notification_tax: number | null;
  r_c_notification_image: string | File | null;
  r_c_id: number;
}

export interface InSertRegularClubNotification {
  user_id: string | null;
  r_c_notification_id: number;
  r_c_notification_name: string;
  r_c_notification_content: string;
  r_c_notification_date_time: string;
  r_c_notification_location: string;
  r_c_notification_tax: number | null;
  r_c_notification_image: string;
  r_c_id: number;
}
