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

// export interface MainCategory {
//   m_c_id: number;
//   m_c_name: string;
// }

// export interface SubCategory {
//   s_c_id: number;
//   m_c_id: number;
//   s_c_name: string;
// }

export const MAIN_CATEGORIES = [
  { m_c_id: 1, m_c_name: "아웃도어/여행" },
  { m_c_id: 2, m_c_name: "댄스/무용" },
  { m_c_id: 3, m_c_name: "사교/인맥" },
  { m_c_id: 4, m_c_name: "사진/영상" },
  { m_c_id: 5, m_c_name: "운동/스포츠" },
  { m_c_id: 6, m_c_name: "문화/공연/축제" }
] as const;

export const SUB_CATEGORIES = [
  // 아웃도어/캠핑
  { s_c_id: 1, m_c_id: 1, s_c_name: "전체" },
  { s_c_id: 2, m_c_id: 1, s_c_name: "캠핑" },
  { s_c_id: 3, m_c_id: 1, s_c_name: "여행" },
  { s_c_id: 4, m_c_id: 1, s_c_name: "등산/트레킹" },
  { s_c_id: 5, m_c_id: 1, s_c_name: "낚시" },
  // 댄스/무용
  { s_c_id: 6, m_c_id: 2, s_c_name: "전체" },
  { s_c_id: 7, m_c_id: 2, s_c_name: "댄스스포츠" },
  { s_c_id: 8, m_c_id: 2, s_c_name: "스트릿댄스" },
  { s_c_id: 9, m_c_id: 2, s_c_name: "방송댄스" },
  { s_c_id: 10, m_c_id: 2, s_c_name: "발레/무용" },
  // 사교/인맥
  { s_c_id: 11, m_c_id: 3, s_c_name: "전체" },
  { s_c_id: 12, m_c_id: 3, s_c_name: "맛집" },
  { s_c_id: 13, m_c_id: 3, s_c_name: "독서" },
  { s_c_id: 14, m_c_id: 3, s_c_name: "스터디" },
  { s_c_id: 15, m_c_id: 3, s_c_name: "친목" },
  // 사진/영상
  { s_c_id: 16, m_c_id: 4, s_c_name: "전체" },
  { s_c_id: 17, m_c_id: 4, s_c_name: "필름카메라" },
  { s_c_id: 18, m_c_id: 4, s_c_name: "영상제작" },
  { s_c_id: 19, m_c_id: 4, s_c_name: "DLSR" },
  { s_c_id: 20, m_c_id: 4, s_c_name: "스냅촬영" },
  // 운동/스포츠
  { s_c_id: 21, m_c_id: 5, s_c_name: "전체" },
  { s_c_id: 22, m_c_id: 5, s_c_name: "스키/스노우보드" },
  { s_c_id: 23, m_c_id: 5, s_c_name: "러닝/라이딩" },
  { s_c_id: 24, m_c_id: 5, s_c_name: "구기스포츠" },
  { s_c_id: 25, m_c_id: 5, s_c_name: "수상레포츠" },
  { s_c_id: 26, m_c_id: 5, s_c_name: "피트니스" },
  // 문화/공연/축제
  { s_c_id: 22, m_c_id: 6, s_c_name: "전체" },
  { s_c_id: 23, m_c_id: 6, s_c_name: "영화" },
  { s_c_id: 24, m_c_id: 6, s_c_name: "공연/연극" },
  { s_c_id: 25, m_c_id: 6, s_c_name: "전시회" },
  { s_c_id: 26, m_c_id: 6, s_c_name: "파티/페스티벌" },
  { s_c_id: 27, m_c_id: 6, s_c_name: "스포츠관람" }
] as const;
