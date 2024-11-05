// 정기적모임 안의 공지 인풋 타입
export interface EggDay {
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
export interface InSertEggDay {
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
export interface InsertEggDayMember {
  r_c_notification_id: number;
  user_id: string | null;
}

// 멤버 정보 타입 정의
export type MemberInfo = {
  notificationId: number;
  userId: string;
  userName: string;
  userImage: string;
};

// CrewList 컴포넌트 props 타입
export interface CrewListProps {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
  clubInfo: EggDay | undefined;
  secondId: number;
}

export interface EggDayInfo {
  r_c_notification_id: number;
  user_id: string;
  r_c_notification_name: string;
  r_c_notification_content: string;
  r_c_notification_date_time: string;
  r_c_notification_location: string;
  r_c_notification_tax: number;
  r_c_notification_create_at: string;
  r_c_id: number;
  r_c_notification_image: string;
}

export interface EggDayMember {
  r_c_notification_id: number;
  r_c_member_id: number;
  user_id: string;
  user: {
    user_name: string;
    user_profile_img: string;
  };
}

// 에그데이 헤더 props
export type DayHeaderProps = {
  clubInfo: EggDayInfo | undefined;
};

// 에그데이 모달 props
export type FullScreenModalProps = {
  crewList: {
    notificationId: number;
    userId: string;
    userName: string;
    userImage: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
};

// 에그데이 페이지 props
export type SubSubPageProps = {
  params: {
    id: string;
    subId: string;
  };
};
