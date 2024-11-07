// 정기적모임 안의 공지 인풋 타입
export interface EggDay {
  user_id: string | null;
  egg_day_name: string;
  egg_day_content: string;
  egg_day_date_time: string;
  egg_day_location: string;
  egg_day_tax: number | null;
  egg_day_image: string | File | null;
  egg_club_id: number;
}

// 정기적모임 안의 공지 내역 받는 타입
export interface InSertEggDay {
  user_id: string | null;
  egg_day_id: number;
  egg_day_name: string;
  egg_day_content: string;
  egg_day_date_time: string;
  egg_day_location: string;
  egg_day_tax: number | null;
  egg_day_image: string;
  egg_club_id: number;
  egg_day_member: Array<{ count: number }>;
}

// 공지 참여 맴버 정보 {get}
export interface NotificationMember {
  egg_club_member_id: number;
  egg_day_id: number;
  user_id: string;
}

// 공지 맴버 테이블 {insert}
export interface InsertEggDayMember {
  egg_day_id: number;
  user_id: string | null;
}

// 멤버 정보 타입 정의
export type MemberInfo = {
  egg_day_id: number;
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
  egg_day_id: number;
  user_id: string;
  egg_day_name: string;
  egg_day_content: string;
  egg_day_date_time: string;
  egg_day_location: string;
  egg_day_tax: number;
  egg_day_create_at: string;
  egg_club_id: number;
  egg_day_image: string;
}

export interface EggDayMember {
  egg_day_id: number;
  egg_club_member_id: number;
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
    egg_day_id: number;
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
