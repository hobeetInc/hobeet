import { EggPopMemberInput } from "@/types/features/club/eggpop.types";
import browserClient from "@/utils/supabase/client";

interface EggClubRequest {
  egg_club_id: number;
  user_id: string;
  egg_club_participation_request_status: string;
  egg_club_participation_request_approved_date: string;
}

export const putRepresentative = async (representative: EggClubRequest) => {
  const { data, error } = await browserClient
    .from("egg_club_participation_request")
    .insert([representative])
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

export const putRegularMember = async (member) => {
  const { data, error } = await browserClient.from("egg_club_member").insert([member]).select("*").single();
  if (error) throw error;
  return data;
};

export const putOneTimeMember = async (member: EggPopMemberInput) => {
  const { data, error } = await browserClient.from("egg_pop_member").insert([member]).select("*").single();
  if (error) throw error;
  return data;
};

export const getOneTimeMember = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("egg_pop_member")
    .select(`*, egg_pop(*), user(user_name, user_profile_img)`)
    .eq("egg_pop_id", clubId);
  if (error) throw error;
  return data;
};

export const getRegularMember = async (clubId: number) => {
  const { data, error } = await browserClient
    .from("egg_club_member")
    .select(`*, egg_club(*), user(user_name, user_profile_img)`)
    .eq("egg_club_id", clubId);
  if (error) throw error;

  return data;
};

export const getParticipationStatus = async ({ userId, clubId }: { userId: string | null; clubId: number }) => {
  const { data, error } = await browserClient
    .from("egg_club_participation_request")
    .select("*")
    .eq("user_id", userId)
    .eq("egg_club_id", clubId);
  if (error) throw error;
  return data;
};
