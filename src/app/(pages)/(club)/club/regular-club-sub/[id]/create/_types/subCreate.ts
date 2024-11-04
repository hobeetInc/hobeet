// 정기적모임 안의 공지 인풋 타입
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

// 정기적모임 안의 공지 내역 받는 타입
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
  r_c_notification_member: Array<{ count: number }>;
}

// 공지 참여 맴버 정보 {get}
export interface NotificationMember {
  r_c_member_id: number;
  r_c_notification_id: number;
  user_id: string;
}

// 공지 맴버 테이블 {insert}
export interface InsertNotificationMember {
  r_c_notification_id: number;
  user_id: string | null;
}
