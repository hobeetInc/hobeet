import browserClient from "@/utils/supabase/client";
import { OneTimeClubForm, RegularClubForm } from "../_types/ClubForm";

// supabase에 일회성 모임 제출
export const submitOneTimeClubData = async (finalFormData: OneTimeClubForm) => {
  const { data, error } = await browserClient.from("one_time_club").insert([finalFormData]);
  if (error) throw error;
  return data;
};

// supabase에 정기적 모임 제출
export const submitRegularClubData = async (finalFormData: RegularClubForm) => {
  const { data, error } = await browserClient.from("regular_club").insert([finalFormData]).select("*").single();
  if (error) throw error;
  return data;
};

// 대분류 카테고리 조회
export const fetchMainCategories = async () => {
  const { data, error } = await browserClient.from("m_category").select("*").order("m_c_id");
  if (error) throw error;
  return data;
};

// 중분류 카테고리 조회
export const fetchSubCategories = async () => {
  const { data, error } = await browserClient.from("s_category").select("*").order("m_c_id, s_c_id");
  if (error) throw error;
  return data;
};

// 특정 대분류에 속한 소분류 카테고리만 조회
export const fetchNeedSubCategories = async (mainId: number) => {
  const { data, error } = await browserClient.from("s_category").select("*").eq("m_c_id", mainId).order("s_c_id");
  if (error) throw error;
  return data;
};

// 스토리지에 이미지 넣기
export const uploadImage = async (file: File) => {
  const { data, error } = await browserClient.storage.from("club-images").upload(`club-images/${Date.now()}`, file);

  if (error) throw error;

  // 업로드된 이미지 URL 가져오기
  const {
    data: { publicUrl }
  } = browserClient.storage.from("club-images").getPublicUrl(data.path);

  return publicUrl;
};

// 일회성 모임리스트 불러오기
export const getOneTimeClub = async () => {
  const { data, error } = await browserClient.from("one_time_club").select("*");
  if (error) throw error;
  return data;
};

// 정기적 모임리스트 불러오기
export const getRegularClubList = async () => {
  const { data, error } = await browserClient.from("regular_club").select("*");
  if (error) throw error;
  return data;
};
