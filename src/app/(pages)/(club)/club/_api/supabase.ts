import browserClient from "@/utils/supabase/client";
import {
  InsertWishList,
  OneTimeClubForm,
  OneTimeMember,
  RegularClubForm,
  RegularMember,
  RegularRequest
} from "../_types/ClubForm";
import { InsertNotificationMember, RegularClubNotification } from "../regular-club-sub/[id]/create/_types/subCreate";

// supabase에 일회성 모임 제출
export const submitOneTimeClubData = async (finalFormData: OneTimeClubForm) => {
  const { data, error } = await browserClient.from("one_time_club").insert([finalFormData]).select("*").single();
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

// 일회성 모임리스트 불러오기(10개씩)
export const getOneTimeClub = async () => {
  const { data, error } = await browserClient
    .from("one_time_club")
    .select(
      `
      *,
      user_id(user_name, user_profile_img),
      o_t_c_member(count)`
    )
    .order("one_time_create_at", { ascending: false })
    .limit(10);
  if (error) throw error;

  return data;
};

// 정기적 모임리스트 불러오기(10개씩)
export const getRegularClubList = async () => {
  const { data, error } = await browserClient
    .from("regular_club")
    .select(`*, user_id(user_name, user_profile_img), r_c_member(count) , wish_list(*)`)
    .order("regular_club_create_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
};

// 일회성 모임리스트 불러오기(전체)
export const getAllOneTimeClub = async () => {
  const { data, error } = await browserClient
    .from("one_time_club")
    .select(
      `
      *,
      user_id(user_name, user_profile_img),
      o_t_c_member(count)`
    )
    .order("one_time_create_at", { ascending: false });
  if (error) throw error;

  return data;
};

// 정기적 모임리스트 불러오기(전체)
export const getAllRegularClubList = async () => {
  const { data, error } = await browserClient
    .from("regular_club")
    .select(`*, user_id(user_name, user_profile_img), r_c_member(count) , wish_list(*)`)
    .order("regular_club_create_at", { ascending: false });
  if (error) throw error;
  return data;
};

// 모임장 정기적 모임 승인 테이블에 집어넣기
export const putRepresentative = async (representative: RegularRequest) => {
  const { data, error } = await browserClient
    .from("r_c_participation_request")
    .insert([representative])
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

// 모임장 정기적 모임 맴버 테이블에 집어넣기
export const putRegularMember = async (member: RegularMember) => {
  const { data, error } = await browserClient.from("r_c_member").insert([member]).select("*").single();
  if (error) throw error;
  return data;
};

// 모임장 일회성 모임 맴버 테이블에 집어넣기
export const putOneTimeMember = async (member: OneTimeMember) => {
  const { data, error } = await browserClient.from("o_t_c_member").insert([member]).select("*").single();
  if (error) throw error;
  return data;
};

// 일회성 모임 상세 페이지 불러오기
export const getOneTimeMember = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("o_t_c_member")
    .select(`*, one_time_club(*), user(user_name, user_profile_img)`)
    .eq("o_t_c_id", clubId);
  if (error) throw error;
  return data;
};

// 정기 모임 멤버, 유저, 모임 정보 한 번에 가져오기
export const getRegularMember = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("r_c_member")
    .select(`*, regular_club(*), user(user_name, user_profile_img)`)
    .eq("r_c_id", clubId);
  if (error) throw error;
  return data;
};

// 정기 모임 공지사항 가져오기
export const getRegularNotification = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("r_c_notification")
    .select("*")
    .eq("r_c_id", clubId)
    .order("r_c_notification_create_at", { ascending: false });

  if (error) throw error;
  return data;
};

// 정기모임의 공지 집어넣기
export const submitRegularClubNotification = async (finalData: RegularClubNotification) => {
  const { data, error } = await browserClient.from("r_c_notification").insert([finalData]).select("*").single();
  if (error) throw error;
  return data;
};

// 정기적 공지 맴버로 집어넣기
export const submitRegularMember = async (member: InsertNotificationMember) => {
  const { data, error } = await browserClient.from("r_c_notification_member").insert(member).select("*").single();
  if (error) throw error;
  return data;
};

// 정기모임의 공지 가져오기
export const getRegularClubNotification = async (clubId: number) => {
  const currentDate = new Date().toISOString();

  const { data, error } = await browserClient
    .from("r_c_notification")
    .select("*, r_c_notification_member(count)")
    .eq("r_c_id", clubId)
    .gte("r_c_notification_date_time", currentDate)
    .order("r_c_notification_date_time", { ascending: true });

  // console.log("이거 지금 가져오!!!!!!!!!", data);

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
    .from("r_c_participation_request")
    .select("*")
    .eq("user_id", userId)
    .eq("r_c_id", clubId)
    .single();
  if (error) throw error;

  return data;
};

// 정기적 모임안의 공지 정보 가져오기
export const getNotificationData = async (clubId: number) => {
  const { data, error } = await browserClient.from("r_c_notification").select("*").eq("r_c_id", clubId);
  if (error) throw error;
  return data;
};

// 정기적 모임 공지 맴버 가져오기
export const getNotificationMember = async (notificationId: number | undefined) => {
  const { data, error } = await browserClient
    .from("r_c_notification_member")
    .select(`*, user(user_name, user_profile_img)`)
    .eq("r_c_notification_id", notificationId);
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
