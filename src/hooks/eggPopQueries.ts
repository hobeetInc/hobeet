import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./utils/queryKeys";
import browserClient from "@/utils/supabase/client";

const getOneTimeClubWithHost = async () => {
  const { data, error } = await browserClient
    .from("egg_pop")
    .select(
      `
        *,
        user_id (
          user_name,
          user_profile_img
        ),
        egg_pop_member (
          count
        )
      `
    )
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
};

export const useEggPopTenList = () => {
  return useQuery({
    queryKey: queryKeys.pop.tenList(10),
    queryFn: getOneTimeClubWithHost
  });
};
