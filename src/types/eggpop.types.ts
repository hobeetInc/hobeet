import { SetStateAction } from "react";

// 에그팝 폼 타입
export interface EggPopForm {
  m_c_id: number;
  one_time_age: number | null;
  one_time_club_date_time: string;
  one_time_club_id: number;
  one_time_club_introduction: string;
  one_time_club_location: string;
  one_time_club_name: string;
  one_time_create_at: string;
  one_time_gender: string | null;
  one_time_image: string | File | null;
  one_time_people_limited: number | null;
  one_time_tax: number | null;
  s_c_id: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
  o_t_c_member: Array<{ count: number }>;
}

// 에그팝 폼 타입(이미지 타입 파일 빼고)
export interface StringEggPopForm {
  m_c_id: number;
  one_time_age: number | null;
  one_time_club_date_time: string;
  one_time_club_id: number;
  one_time_club_introduction: string;
  one_time_club_location: string;
  one_time_club_name: string;
  one_time_create_at: string;
  one_time_gender: string | null;
  one_time_image: string;
  one_time_people_limited: number | null;
  one_time_tax: number | null;
  s_c_id: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
  o_t_c_member: Array<{ count: number }>;
}

// 에그팝 폼 props
export type EggPopProps = {
  formData: EggPopForm;
  setFormData: React.Dispatch<SetStateAction<EggPopForm>>;
};

// 멤버타입 props
export type MemeberTypeProps = EggPopProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};

// 멤버 정보 타입 정의 (공통)
export type MemberInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

// CrewList 컴포넌트 props 타입
export type CrewListProps = {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
};

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

export interface GetEggPop {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  one_time_age: number;
  one_time_tax: number;
  one_time_image: string;
  one_time_gender: string | null;
  one_time_club_id: number;
  one_time_club_name: string;
  one_time_create_at: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_people_limited: number;
  one_time_club_introduction: string;
}

// 에그팝헤더 props
export type PopHeaderProps = {
  clubInfo: GetEggPop;
};

// 멤버 정보 타입
export interface EggMember {
  o_t_c_member_id: number;
  o_t_c_id: number;
  user_id: string;
  one_time_club: GetEggPop;
  user: {
    user_name: string;
    user_profile_img: string;
  };
}

// 일회성 모임 참가자 맴버 테이블
export interface EggPopMember {
  o_t_c_id: number;
  user_id: string;
}
