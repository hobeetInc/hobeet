import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const fetchCreatedClubs = async (userId: string) => {
  const { data: oneTime } = await supabase
    .from("egg_pop")
    .select("*")
    .eq("user_id", userId)
    .order("egg_pop_date_time", { ascending: false });

  const { data: regular } = await supabase
    .from("egg_club")
    .select("*")
    .eq("user_id", userId)
    .order("egg_club_create_at", { ascending: false });

  return { oneTime: oneTime || [], regular: regular || [] };
};

export const fetchJoinedClubs = async (userId: string) => {
  const { data: oneTimeMemberships } = await supabase.from("egg_pop_member").select("egg_pop_id").eq("user_id", userId);

  const { data: regularMemberships } = await supabase
    .from("egg_club_member")
    .select("egg_club_id")
    .eq("user_id", userId)
    .eq("egg_club_request_status", "active");

  const oneTimeIds = oneTimeMemberships?.map((m) => m.egg_pop_id) || [];
  const regularIds = regularMemberships?.map((m) => m.egg_club_id) || [];

  const oneTimeData = oneTimeIds.length
    ? await supabase
        .from("egg_pop")
        .select("*")
        .in("egg_pop_id", oneTimeIds)
        .neq("user_id", userId)
        .order("egg_pop_date_time", { ascending: false })
    : { data: [] };

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
