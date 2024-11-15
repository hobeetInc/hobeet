import { Tables } from "../database.types";

// 정기적모임 안의 공지 인풋 타입
export type EggDay = Partial<Tables<"egg_day">>;
export type EggDayMember = Partial<Tables<"egg_day_member">>;

export type EggDayRequired = Pick<
  Tables<"egg_day">,
  "egg_day_content" | "egg_day_date_time" | "egg_day_location" | "egg_day_name" | "egg_day_tax"
> &
  Partial<
    Omit<
      Tables<"egg_day">,
      "egg_day_content" | "egg_day_date_time" | "egg_day_location" | "egg_day_name" | "egg_day_tax"
    >
  >;

export type EggDayMemberRequired = Pick<
  Tables<"egg_day_member">,
  "egg_day_id" | "user_id"
> &
  Partial<Omit<Tables<"egg_day_member">, "egg_day_id" | "user_id">>;

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
