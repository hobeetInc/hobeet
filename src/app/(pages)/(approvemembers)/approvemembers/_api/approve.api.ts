import { createClient } from "@/utils/supabase/client";
import { ParticipationRequest } from "../_types/approve.types";
import { enterRegularChatRoomAfterApproval } from "@/app/(pages)/(chat)/_api/regular";

const supabase = createClient();

export const fetchPendingAndActiveRequests = async (clubId: number) => {
  // 대기 중인 요청과 활성 멤버 조회
  // pending인 요청 조회
  const { data: pendingData, error: pendingError } = await supabase
    .from("egg_club_participation_request")
    .select(
      `
      egg_club_participation_request_id,
      egg_club_id,
      egg_club_participation_request_status,
      user_id (
        user_id,
        user_name,
        user_profile_img
      )
    `
    )
    .eq("egg_club_participation_request_status", "pending")
    .eq("egg_club_id", clubId);

  // 활성 상태인 멤버 조회
  // active인 요청 조회
  const { data: activeData, error: activeError } = await supabase
    .from("egg_club_participation_request")
    .select(
      `
      egg_club_participation_request_id,
      egg_club_id,
      egg_club_participation_request_status,
      user_id (
        user_id,
        user_name,
        user_profile_img
      )
    `
    )
    .eq("egg_club_participation_request_status", "active")
    .eq("egg_club_id", clubId);

  if (pendingError || activeError) {
    throw new Error("Error fetching requests");
  }

  return {
    pendingRequests: pendingData as unknown as ParticipationRequest[],
    activeMembers: activeData as unknown as ParticipationRequest[]
  };
};

// 멤버 승인 처리
export const approveMember = async (requestId: number, clubId: number) => {
  // 요청 상태를 active로 업데이트
  const { data, error } = await supabase
    .from("egg_club_participation_request")
    .update({ egg_club_participation_request_status: "active" })
    .eq("egg_club_participation_request_id", requestId)
    .select("*")
    .single();

  if (error) throw new Error("승인 처리 중 오류가 발생했습니다");

  // 승인된 멤버를 egg_club_member 테이블에 추가
  const { error: memberError } = await supabase.from("egg_club_member").insert({
    user_id: data.user_id,
    egg_club_id: data.egg_club_id,
    egg_club_participation_request_id: data.egg_club_participation_request_id,
    egg_club_request_status: "active"
  });

  if (memberError) throw new Error("멤버 추가 중 오류가 발생했습니다");

  // 채팅방 입장 처리
  await enterRegularChatRoomAfterApproval({
    egg_club_id: clubId,
    user_id: data.user_id as string
  });

  return data;
};
