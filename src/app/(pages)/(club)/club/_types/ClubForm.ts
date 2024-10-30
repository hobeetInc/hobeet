import { SetStateAction } from "react";

export interface OneTimeClubForm {
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
  user_id: string;
}

export interface MainCategory {
  m_c_id: number;
  m_c_name: string;
}

export interface SubCategory {
  s_c_id: number;
  m_c_id: number;
  s_c_name: string;
}

export type OneTimeProps = {
  formData: OneTimeClubForm;
  setFormData: React.Dispatch<SetStateAction<OneTimeClubForm>>;
};

// 정기적 모임 타입
export interface RegularClubForm {
  m_c_id: number;
  regular_club_age: number | null;
  regular_club_approval: boolean;
  regular_club_gender: string | null;
  regular_club_image: string | File | null;
  regular_club_introduction: string;
  regular_club_name: string;
  regular_club_people_limited: number | null;
  s_c_id: number;
  user_id: string;
}

export type RegularProps = {
  formData: RegularClubForm;
  setFormData: React.Dispatch<SetStateAction<RegularClubForm>>;
};

// 정기적 모임 참가자 요청 테이블
export interface RegularRequest {
  r_c_id: number;
  user_id: string;
  r_c_participation_request_status: string;
  r_c_participation_request_approved_date: string;
}

// 정기적 모임 참가자 맴버 테이블
export interface RegularMember {
  user_id: string;
  r_c_id: number;
  r_c_participation_request_id: number;
  regular_club_request_status: string;
}

// 일회성 모임 참가자 맴버 테이블
export interface OneTimeMember {
  o_t_c_id: number;
  user_id: string;
}
