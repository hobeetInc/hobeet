import { SetStateAction } from "react";
import { Tables } from "../database.types";
import { MemberInfo } from "../user.types";

export type EggPop = Tables<"egg_pop">;

export interface EggPopForm extends EggPop {
  user: Pick<Tables<"user">, "user_name" | "user_profile_img">;
  egg_pop_member: { count: number }[];
}

export interface EggPopFormWithImageFile extends Omit<EggPopForm, "egg_pop_image"> {
  egg_pop_image: File;
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
  formData: EggPopFormWithImageFile;
  setFormData: React.Dispatch<SetStateAction<EggPopFormWithImageFile>>;
};

// 멤버타입 props
export type MemberTypeProps = EggPopProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};

// CrewList 컴포넌트 props 타입
export type CrewListProps = {
  crewMembers: MemberInfo[];
  clubId: number;
  clubHostId: string;
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
