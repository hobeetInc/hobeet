"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface ParticipationRequest {
  r_c_participation_request_id: number;
  r_c_id: number;
  user_id: string;
  r_c_participation_request_status: "pending" | "approved" | "rejected";
}

export default function ApproveMembersPage({ clubId }: { clubId: number }) {
  const [requests, setRequests] = useState<ParticipationRequest[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      const { data, error } = await supabase
        .from("r_c_participation_request")
        .select("r_c_participation_request_id, r_c_id, user_id, r_c_participation_request_status")
        .eq("r_c_participation_request_status", "pending");

      if (error) {
        console.error("Error fetching pending requests:", error);
      } else if (data) {
        // 타입을 일치시키기 위해 데이터 매핑
        const mappedData = data.map((item) => ({
          r_c_participation_request_id: item.r_c_participation_request_id,
          r_c_id: item.r_c_id,
          user_id: item.user_id,
          r_c_participation_request_status: item.r_c_participation_request_status
        })) as ParticipationRequest[];

        setRequests(mappedData);
      }
    };

    fetchPendingRequests();
  }, [clubId]);

  const approveMember = async (requestId: number, userId: string) => {
    try {
      console.log({
        clubId,
        userId,
        requestId
      });

      // approve_club_membership 함수 호출
      const { error: approvalError } = await supabase.rpc("approve_club_membership", {
        p_club_id: clubId,
        p_user_id: userId
      });

      if (approvalError) throw approvalError;

      // 성공적으로 처리된 경우
      setRequests((prev) => prev.filter((req) => req.r_c_participation_request_id !== requestId));
      alert("가입이 승인되었습니다.");
    } catch (error) {
      console.error("승인 처리 중 오류:", error);
      alert("승인 중 오류가 발생했습니다.");
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
          <span>{req.user_id}</span>
          <button onClick={() => approveMember(req.r_c_participation_request_id, req.user_id)}>승인하기</button>
          <button onClick={() => rejectMember(req.r_c_participation_request_id)}>거부하기</button>
        </div>
      ))}
    </div>
  );
}
