import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const fetchCreatedClubs = async (userId: string) => {
  // 사용자가 생성한 일회성 모임 조회
  // 날짜 기준 내림차순 정렬
  const { data: oneTime } = await supabase
    .from("egg_pop")
    .select("*")
    .eq("user_id", userId)
    .order("egg_pop_date_time", { ascending: false });

  // 사용자가 생성한 정기 모임 조회
  // 생성일 기준 내림차순 정렬
  const { data: regular } = await supabase
    .from("egg_club")
    .select("*")
    .eq("user_id", userId)
    .order("egg_club_create_at", { ascending: false });

  return { oneTime: oneTime || [], regular: regular || [] };
};

// 사용자가 참여한 모임 조회
export const fetchJoinedClubs = async (userId: string) => {
  // 참여한 일회성 모임 ID 목록 조회
  const { data: oneTimeMemberships } = await supabase.from("egg_pop_member").select("egg_pop_id").eq("user_id", userId);

  // 참여한 정기 모임 ID 목록 조회 (활성 상태인 것만)
  const { data: regularMemberships } = await supabase
    .from("egg_club_member")
    .select("egg_club_id")
    .eq("user_id", userId)
    .eq("egg_club_request_status", "active");

  // ID 목록 추출
  const oneTimeIds = oneTimeMemberships?.map((m) => m.egg_pop_id) || [];
  const regularIds = regularMemberships?.map((m) => m.egg_club_id) || [];

  // 참여한 일회성 모임 상세 정보 조회
  // 본인이 생성한 모임은 제외(neq)
  const oneTimeData = oneTimeIds.length
    ? await supabase
        .from("egg_pop")
        .select("*")
        .in("egg_pop_id", oneTimeIds)
        .neq("user_id", userId)
        .order("egg_pop_date_time", { ascending: false })
    : { data: [] };

  // 참여한 정기 모임 상세 정보 조회
  // 본인이 생성한 모임은 제외(neq)
  const regularData = regularIds.length
    ? await supabase
        .from("egg_club")
        .select("*")
        .in("egg_club_id", regularIds)
        .neq("user_id", userId)
        .order("egg_club_create_at", { ascending: false })
    : { data: [] };

  return { oneTime: oneTimeData.data || [], regular: regularData.data || [] };
};
