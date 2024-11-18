import { SetStateAction } from "react";

// 에그팝 폼 타입
export interface EggPopForm {
  main_category_id: number;
  egg_pop_age: number | null;
  egg_pop_date_time: string;
  egg_pop_id: number;
  egg_pop_introduction: string;
  egg_pop_location: string;

  egg_pop_name: string;
  egg_pop_create_at: string;
  egg_pop_gender: string | null;
  egg_pop_image: string | File | null;
  egg_pop_people_limited: number | null;
  egg_pop_tax: number | null;
  sub_category_id: number;
  user: {
    user_name: string;
    user_profile_img: string;
  };
  egg_pop_member: Array<{ count: number }>;
}

// 에그팝 폼 타입(이미지 타입 파일 빼고)
export interface StringEggPopForm {
  main_category_id: number;
  egg_pop_age: number | null;
  egg_pop_date_time: string;
  egg_pop_id: number;
  egg_pop_introduction: string;
  egg_pop_location: string;
  egg_pop_name: string;
  egg_pop_create_at: string;
  egg_pop_gender: string | null;
  egg_pop_image: string;
  egg_pop_people_limited: number | null;
  egg_pop_tax: number | null;
  sub_category_id: number;
  user_id: {
    user_name: string;
    user_profile_img: string;
  };
  egg_pop_member: Array<{ count: number }>;
}

// 에그팝 폼 props
export type EggPopProps = {
  formData: EggPopForm;
  setFormData: React.Dispatch<SetStateAction<EggPopForm>>;
};

// 멤버타입 props
export type MemberTypeProps = EggPopProps & {
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
  main_category_id: number;
  sub_category_id: number;
  user_id: string;
  egg_pop_age: number;
  egg_pop_tax: number;
  egg_pop_image: string;
  egg_pop_gender: string | null;
  egg_pop_id: number;
  egg_pop_name: string;
  egg_pop_create_at: string;
  egg_pop_location: string;
  egg_pop_date_time: string;
  egg_pop_people_limited: number;
  egg_pop_introduction: string;
}

// 에그팝헤더 props
export type PopHeaderProps = {
  clubInfo: GetEggPop;
};

// 멤버 정보 타입
export interface EggMember {
  egg_pop_member_id: number;
  egg_pop_id: number;
  user_id: string;
  egg_pop: GetEggPop;
  user: {
    user_name: string;
    user_profile_img: string;
  };
}

// 일회성 모임 참가자 맴버 테이블
export interface EggPopMember {
  egg_pop_id: number;
  user_id: string;
}
