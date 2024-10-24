export interface OneTimeClubForm {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  one_time_club_name: string;
  one_time_club_date_time: string;
  one_time_club_location: string;
  one_time_club_limited: number | null;
  one_time_tax: number;
  one_time_gender: string | null;
  one_time_age: number | null;
  one_time_image: string | null;
  one_time_club_introduction: string;
}

export interface MainCategory {
  id: number;
  m_c_name: string;
}

export interface SubCategory {
  id: number;
  m_c_id: number;
  s_c_name: string;
}
