"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { ChatRoomRecruiterEntrance } from "../(pages)/(chat)/_components/ChatRoomRecruiterEntrance";

export interface ParticipationRequest {
  r_c_participation_request_id: number;
  r_c_id: number;
  user_id: {
    user_id: string;
    user_name: string;
  };
  r_c_participation_request_status: "pending" | "approved" | "rejected";
}

export default function ApproveMembersPage({ clubId }: { clubId: number }) {
  const [requests, setRequests] = useState<ParticipationRequest[]>([]);
  const supabase = createClient();
  clubId = 18; // 상세페이지 생성 협의(어떻게 받아올 것인지 클럽아이디)
  useEffect(() => {
    const fetchPendingRequests = async () => {
      const { data, error } = await supabase
        .from("r_c_participation_request")
        .select(`*,user_id("*")`)
        .eq("r_c_participation_request_status", "pending")
        .eq("r_c_id", clubId);
      console.log("클럽아이디", data);
      if (error) {
        console.error("Error fetching pending requests:", error);
      } else if (data) {
        const mappedData: ParticipationRequest[] = data as ParticipationRequest[];
        setRequests(mappedData);
      }
    };

    fetchPendingRequests();
  }, [clubId]);

  const approveMember = async (requestId: number) => {
    const { data, error } = await supabase
      .from("r_c_participation_request")
      .update({ r_c_participation_request_status: "active" })
      .eq("r_c_participation_request_id", requestId)
      .select("*")
      .single();
    console.log("data", data);
    if (!error) {
      setRequests((prev) => prev.filter((req) => req.r_c_participation_request_id !== requestId));
      const { error } = await supabase.from("r_c_member").insert({
        user_id: data.user_id,
        r_c_id: data.r_c_id,
        r_c_participation_request_id: data.r_c_participation_request_id,
        regular_club_request_status: "active"
      });
      if (!error) {
        ChatRoomRecruiterEntrance({ r_c_id: clubId }); // 모임원 채팅방 입장(가입 승인 시)
        alert("가입이 승인 되었습니다.");
      }
    } else {
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const rejectMember = async (requestId: number) => {
    // 요청 상태를 "rejected"로 변경하여 가입 거부
    const { error } = await supabase
      .from("r_c_participation_request")
      .update({ r_c_participation_request_status: "rejected" })
      .eq("r_c_participation_request_id", requestId);

    if (!error) {
      setRequests((prev) => prev.filter((req) => req.r_c_participation_request_id !== requestId));
      alert("가입이 거부되었습니다.");
    } else {
      alert("거부 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>모임 가입 요청 승인</h2>
      {requests.map((req) => (
        <div key={req.r_c_participation_request_id}>
          <span>{req.user_id.user_name}</span>
          <button onClick={() => approveMember(req.r_c_participation_request_id)}>승인하기</button>
          <button onClick={() => rejectMember(req.r_c_participation_request_id)}>거부하기</button>
        </div>
      ))}
    </div>
  );
}
