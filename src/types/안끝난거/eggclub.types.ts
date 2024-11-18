import { ReactNode, SetStateAction } from "react";
import { MemberInfo, User } from "../user.types";
import { EggDay } from "../eggday.types";
import { Tables } from "../database.types";

export type EggClub = Tables<"egg_club">;
// 위시리스트 타입(Get)
export type WishList = Tables<"wish_list">;

// 정기적 모임 타입
export interface EggClubForm extends EggClub {
  user: Pick<Tables<"user">, "user_name" | "user_profile_img">;
  egg_club_member: { count: number }[];
  wish_list: WishList[];
}

export interface EggClubFormWithImageFile extends Omit<EggClubForm, "egg_club_image"> {
  egg_club_image: File;
}

// 에그클럽 폼 이미지 파일 타입 빼고
export interface StringEggClubForm {
  egg_club_id: string;
  egg_club_name: string;
  egg_club_image: string;
  egg_club_people_limited: number;
  user_id: User;
  egg_club_member: Array<{ count: number }>;
  wish_list: WishListData[];
  created_at: string;
  updated_at: string;
}

export type EggClubProps = {
  formData: EggClubFormWithImageFile;
  setFormData: React.Dispatch<SetStateAction<EggClubFormWithImageFile>>;
};

export type MemberTypeProps = EggClubProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};

// 정기적 모임 참가자 요청 테이블
export interface EggClubRequest {
  egg_club_id: number;
  user_id: string;
  egg_club_participation_request_status: string;
  egg_club_participation_request_approved_date: string;
}

// 정기적 모임 참가자 맴버 테이블
export interface EggClubMember {
  user_id: string;
  egg_club_id: number;
  egg_club_participation_request_id: number;
  egg_club_participation_request_status: string;
}

// 위시리스트 타입(Insert)
export type WishListData = Omit<WishList, "wish_list_id">;

export interface getEggClub {
  main_category_id: number;
  sub_category_id: number;
  user_id: string;
  pending_members: [];
  egg_club_id: number;
  approved_members: [];
  egg_club_age: number | null;
  egg_club_name: string;
  egg_club_image: string;
  egg_club_gender: string | null;
  egg_club_approval: boolean;
  egg_club_create_at: string;
  egg_club_introduction: string;
  egg_club_people_limited: number;
}

export interface Member {
  egg_club_member_id: number;
  user_id: string;
  egg_club_id: number;
  egg_club_participation_request_id: number;
  egg_club_participation_request_status: string;
  egg_club: getEggClub;
  user: {
    user_name: string;
    user_profile_img: string;
  };
}

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
  notificationData: EggDay[];
};

// 홈 콘텐츠 props
export type HomeContentProps = {
  clubInfo: getEggClub;
  hostInfo: MemberInfo | undefined;
  crewMembers: MemberInfo[];
  egg_club_id: number;
  notificationData: EggDay[];
  stringCategory: string | undefined;
};

// 에그클럽 공지 props
export type EggClubNotificationProps = {
  notificationData: EggDay[];
  crewMembers: MemberInfo[];
  egg_club_id: number;
};

// 탭 레이아웃 props
export type TabLayoutProps = {
  children: [ReactNode, ReactNode];
};

// 위시리스트하트 props
export type WishListHeartProps = {
  egg_club_id: number;
};

export type InsertMember = {
  user_id: string;
  egg_club_id: number;
  egg_club_participation_request_id: number;
  egg_club_request_status: string;
};
