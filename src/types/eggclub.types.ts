import { ReactNode, SetStateAction } from "react";
import { User } from "./user.types";
import { InSertEggDay } from "./eggday.types";

// 정기적 모임 타입
export interface EggClubForm {
  m_c_id: number;
  regular_club_id: number;
  regular_club_age: number | null;
  regular_club_approval: boolean;
  regular_club_gender: string | null;
  regular_club_image: string | File | null;
  regular_club_introduction: string;
  regular_club_name: string;
  regular_club_people_limited: number | null;
  s_c_id: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
  r_c_member: Array<{ count: number }>;
}

// 에그클럽 폼 이미지 파일 타입 빼고
export interface StringEggClubForm {
  regular_club_id: string;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_people_limited: number;
  user_id: User;
  r_c_member: Array<{ count: number }>;
  wish_list: InsertWishList[];
  created_at: string;
  updated_at: string;
}

export type EggClubProps = {
  formData: EggClubForm;
  setFormData: React.Dispatch<SetStateAction<EggClubForm>>;
};

export type MemeberTypeProps = EggClubProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};

// 정기적 모임 참가자 요청 테이블
export interface EggClubRequest {
  r_c_id: number;
  user_id: string;
  r_c_participation_request_status: string;
  r_c_participation_request_approved_date: string;
}

// 정기적 모임 참가자 맴버 테이블
export interface EggClubMember {
  user_id: string;
  r_c_id: number;
  r_c_participation_request_id: number;
  regular_club_request_status: string;
}

// 위시리스트 타입(Get)
export interface WishList {
  wish_list_id: number;
  user_id: string | null;
  r_c_id: number;
}

// 위시리스트 타입(Insert)
export interface InsertWishList {
  user_id: string | null;
  r_c_id: number;
}

// 에그클럽 맴버 정보 (공통)
export type MemberInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

export interface getEggClub {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  pending_members: [];
  regular_club_id: number;
  approved_members: [];
  regular_club_age: number | null;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_gender: string | null;
  regular_club_approval: boolean;
  regular_club_create_at: string;
  regular_club_introduction: string;
  regular_club_people_limited: number;
}

export interface Member {
  r_c_member_id: number;
  user_id: string;
  r_c_id: number;
  r_c_participation_request_id: number;
  regular_club_request_status: string;
  regular_club: getEggClub;
  user: {
    user_name: string;
    user_profile_img: string;
  };
}

// 클럽 카드 props
export type ClubCardProps = { notification: InSertEggDay; crewMembers: MemberInfo[] };

// 클럽 헤더 props
export type ClubHeaderProps = {
  clubInfo: getEggClub;
};

// 유저 상태 정보
export type UserStatus = "not_applied" | "pending" | "active";

// CrewList 컴포넌트 props 타입
export type CrewListProps = {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
  notificationData: InSertEggDay[];
};

// 모달 props
export type FullScreenModalProps = {
  crewList: {
    memberId: number;
    userId: string;
    userName: string;
    userImage: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
};

// 홈 콘텐츠 props
export type HomeContentProps = {
  clubInfo: getEggClub;
  hostInfo: MemberInfo | undefined;
  crewMembers: MemberInfo[];
  regularClubId: number;
  notificationData: InSertEggDay[];
  stringCategory: string | undefined;
};

// 노티피케이션 props
export type NotificationListProps = {
  notificationData: InSertEggDay[];
  crewMembers: MemberInfo[];
};

// 에그클럽 공지 props
export type EggClubNotificationProps = {
  notificationData: InSertEggDay[];
  crewMembers: MemberInfo[];
};

// 탭 레이아웃 props
export type TabLayoutProps = {
  children: [ReactNode, ReactNode];
};

// 위시리스트하트 props
export type WishListHeartProps = {
  regularClubId: number;
};
