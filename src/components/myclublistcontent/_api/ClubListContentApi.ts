import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const fetchCreatedClubs = async (userId: string) => {
  const { data: oneTime } = await supabase
    .from("one_time_club")
    .select("*")
    .eq("user_id", userId)
    .order("one_time_club_date_time", { ascending: false });

  const { data: regular } = await supabase
    .from("regular_club")
    .select("*")
    .eq("user_id", userId)
    .order("regular_club_create_at", { ascending: false });

  return { oneTime: oneTime || [], regular: regular || [] };
};

export const fetchJoinedClubs = async (userId: string) => {
  const { data: oneTimeMemberships } = await supabase.from("o_t_c_member").select("o_t_c_id").eq("user_id", userId);

  const { data: regularMemberships } = await supabase
    .from("r_c_member")
    .select("r_c_id")
    .eq("user_id", userId)
    .eq("regular_club_request_status", "active");

  const oneTimeIds = oneTimeMemberships?.map((m) => m.o_t_c_id) || [];
  const regularIds = regularMemberships?.map((m) => m.r_c_id) || [];

  const oneTimeData = oneTimeIds.length
    ? await supabase
        .from("one_time_club")
        .select("*")
        .in("one_time_club_id", oneTimeIds)
        .order("one_time_club_date_time", { ascending: false })
    : { data: [] };

  const regularData = regularIds.length
    ? await supabase
        .from("regular_club")
        .select("*")
        .in("regular_club_id", regularIds)
        .order("regular_club_create_at", { ascending: false })
    : { data: [] };

  return { oneTime: oneTimeData.data || [], regular: regularData.data || [] };
};
