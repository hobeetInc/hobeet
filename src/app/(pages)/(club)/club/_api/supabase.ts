import browserClient from "@/utils/supabase/client";

import { EggDay, InsertEggDayMember } from "@/types/eggday.types";
import { EggPopForm, EggPopMember } from "@/types/eggpop.types";
import { EggClubForm, EggClubMember, EggClubRequest, InsertWishList } from "@/types/eggclub.types";

// supabase에 일회성 모임 제출

export const submitOneTimeClubData = async (finalFormData: EggPopForm) => {
  const { data, error } = await browserClient.from("egg_pop").insert([finalFormData]).select("*").single();
  if (error) throw error;
  return data;
};

// supabase에 정기적 모임 제출

export const submitRegularClubData = async (finalFormData: EggClubForm) => {
  const { data, error } = await browserClient.from("egg_club").insert([finalFormData]).select("*").single();

  if (error) throw error;
  return data;
};

// 대분류 카테고리 조회
export const fetchMainCategories = async () => {
  const { data, error } = await browserClient.from("main_category").select("*").order("main_category_id");
  if (error) throw error;
  return data;
};

// 중분류 카테고리 조회
export const fetchSubCategories = async () => {
  const { data, error } = await browserClient
    .from("sub_category")
    .select("*")
    .order("main_category_id, sub_category_id");
  if (error) throw error;
  return data;
};

// 특정 대분류에 속한 소분류 카테고리만 조회
export const fetchNeedSubCategories = async (mainId: number) => {
  const { data, error } = await browserClient
    .from("sub_category")
    .select("*")
    .eq("main_category_id", mainId)
    .order("sub_category_id");
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

// 일회성 모임리스트 불러오기(10개씩)
export const getOneTimeClub = async () => {
  const { data, error } = await browserClient
    .from("egg_pop")
    .select(
      `
      *,
      user_id(user_name, user_profile_img),
      egg_pop_member(count)`
    )
    .order("egg_pop_create_at", { ascending: false })
    .limit(10);
  if (error) throw error;

  return data;
};

// 정기적 모임리스트 불러오기(10개씩)
export const getRegularClubList = async () => {
  const { data, error } = await browserClient
    .from("egg_club")
    .select(`*, user_id(user_name, user_profile_img), egg_club_member(count) , wish_list(*)`)
    .order("egg_club_create_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
};

// 일회성 모임리스트 불러오기(전체)
export const getAllOneTimeClub = async () => {
  const { data, error } = await browserClient
    .from("egg_pop")
    .select(
      `
      *,
      user_id(user_name, user_profile_img),
      egg_pop_member(count)`
    )
    .order("egg_pop_create_at", { ascending: false });
  if (error) throw error;

  return data;
};

// 정기적 모임리스트 불러오기(전체)
export const getAllRegularClubList = async () => {
  const { data, error } = await browserClient
    .from("egg_club")
    .select(`*, user_id(user_name, user_profile_img), egg_club_member(count) , wish_list(*)`)
    .order("egg_club_create_at", { ascending: false });
  if (error) throw error;
  return data;
};

// 모임장 정기적 모임 승인 테이블에 집어넣기
export const putRepresentative = async (representative: EggClubRequest) => {
  const { data, error } = await browserClient
    .from("egg_club_participation_request")
    .insert([representative])
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

// 모임장 정기적 모임 맴버 테이블에 집어넣기

export const putRegularMember = async (member: EggClubMember) => {
  const { data, error } = await browserClient.from("egg_club_member").insert([member]).select("*").single();

  if (error) throw error;
  return data;
};

// 모임장 일회성 모임 맴버 테이블에 집어넣기

export const putOneTimeMember = async (member: EggPopMember) => {
  const { data, error } = await browserClient.from("egg_pop_member").insert([member]).select("*").single();

  if (error) throw error;
  return data;
};

// 일회성 모임 상세 페이지 불러오기
export const getOneTimeMember = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("egg_pop_member")
    .select(`*, egg_pop(*), user(user_name, user_profile_img)`)
    .eq("egg_pop_id", clubId);
  if (error) throw error;
  return data;
};

// 정기 모임 멤버, 유저, 모임 정보 한 번에 가져오기
export const getRegularMember = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("egg_club_member")
    .select(`*, egg_club(*), user(user_name, user_profile_img)`)
    .eq("egg_club_id", clubId);
  if (error) throw error;
  return data;
};

// 정기 모임 공지사항 가져오기
export const getRegularNotification = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("egg_day")
    .select("*")
    .eq("egg_club_id", clubId)
    .order("egg_day_create_at", { ascending: false });

  if (error) throw error;
  return data;
};

// 정기모임의 공지 집어넣기
export const submitRegularClubNotification = async (finalData: EggDay) => {
  const { data, error } = await browserClient.from("egg_day").insert([finalData]).select("*").single();

  if (error) throw error;
  return data;
};

// 정기적 공지 맴버로 집어넣기

export const submitRegularMember = async (member: InsertEggDayMember) => {
  const { data, error } = await browserClient.from("egg_day_member").insert(member).select("*").single();

  if (error) throw error;
  return data;
};

// 정기모임의 공지 가져오기
export const getRegularClubNotification = async (clubId: number) => {
  const currentDate = new Date().toISOString();

  const { data, error } = await browserClient
    .from("egg_day")
    .select("*, egg_day_member(count)")
    .eq("egg_club_id", clubId)
    .gte("egg_day_date_time", currentDate)
    .order("egg_day_date_time", { ascending: true });
  if (error) throw error;
  return data;
};

type GetParticipationStatusProps = {
  userId: string | null;
  clubId: number;
};

//정기적모임 참여 요청 정보 가져오기
export const getParticipationStatus = async ({ userId, clubId }: GetParticipationStatusProps) => {
  const { data, error } = await browserClient
    .from("egg_club_participation_request")
    .select("*")
    .eq("user_id", userId)
    .eq("egg_club_id", clubId);
  if (error) throw error;
  return data;
};

// 정기적 모임안의 공지 정보 가져오기
export const getNotificationData = async (clubId: number) => {
  const { data, error } = await browserClient.from("egg_day").select("*").eq("egg_club_id", clubId);
  if (error) throw error;
  return data;
};

// 정기적 모임 공지 맴버 가져오기
export const getNotificationMember = async (notificationId: number | undefined) => {
  const { data, error } = await browserClient
    .from("egg_day_member")
    .select(`*, user(user_name, user_profile_img)`)
    .eq("egg_day_id", notificationId);

  if (error) throw error;
  return data;
};

// 위시리스트에 집어넣기
export const submitWishList = async (wish: InsertWishList) => {
  const { data, error } = await browserClient.from("wish_list").insert(wish).select("*").single();
  if (error) throw error;
  return data;
};

// 해당 위시리스트 가져오기
export const getWishList = async (wish: InsertWishList) => {
  const { data, error } = await browserClient
    .from("wish_list")
    .select("*")
    .match({ r_c_id: wish.r_c_id, user_id: wish.user_id })
    .single();
  if (error) throw error;
  return data;
};

// 위시리스트 삭제
export const deleteWishList = async (wish: InsertWishList) => {
  const { data, error } = await browserClient
    .from("wish_list")
    .delete()
    .match({ r_c_id: wish.r_c_id, user_id: wish.user_id });
  if (error) throw error;
  return data;
};
