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

export type CategoryProps = {
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
