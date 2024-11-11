"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { RegularClubApproveChatRoomRecruiterEntrance } from "@/app/(pages)/(chat)/_components/regularClub/RegularClubChatRoomRecruiterEntrance";
import ApproveMemberTabBar from "@/components/uiComponents/ApproveMemberTapBar";

export interface ParticipationRequest {
  egg_club_participation_request_id: number;
  egg_club_id: number;
  user_id: {
    user_id: string;
    user_name: string;
    user_profile_img: string;
  };
  egg_club_participation_request_status: "pending" | "active" | "rejected";
}

const ActiveMembersTab = ({ activeMembers }: { activeMembers: ParticipationRequest[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {activeMembers.map((member) => (
        <div key={member.egg_club_participation_request_id} className="flex items-center gap-3">
          <Image
            src={member.user_id.user_profile_img}
            alt={member.user_id.user_name}
            width={158}
            height={158}
            className="w-10 h-10 rounded-full"
          />
          <span>{member.user_id.user_name}</span>
        </div>
      ))}
    </div>
  );
};

const PendingRequestsTab = ({
  requests,
  onApprove
}: {
  requests: ParticipationRequest[];
  onApprove: (requestId: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-6">
      {requests.map((req) => (
        <div key={req.egg_club_participation_request_id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={req.user_id.user_profile_img}
              alt={req.user_id.user_name}
              width={158}
              height={158}
              className="w-10 h-10 rounded-full"
            />
            <span>{req.user_id.user_name}</span>
          </div>
          <button
            onClick={() => onApprove(req.egg_club_participation_request_id)}
            className="h-[39px] px-6 py-2.5 bg-neutral-800 rounded-[30px] justify-center items-center inline-flex hover:bg-neutral-700 transition-colors"
          >
            <span className="text-white text-sm font-semibold font-pretendard leading-[18.90px]">승인</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default function ApproveMembersPage() {
  const [requests, setRequests] = useState<ParticipationRequest[]>([]);
  const [activeMembers, setActiveMembers] = useState<ParticipationRequest[]>([]);
  const [activeTab, setActiveTab] = useState(true);
  const supabase = createClient();
  const params = useParams();
  const clubId = Number(params.id);
  // console.log(clubId);

  // params.clubId = 29; // 상세페이지 생성 협의(어떻게 받아올 것인지 클럽아이디)

  useEffect(() => {
    const fetchPendingAndActiveRequests = async () => {
      const { data: pendingData, error: pendingError } = await supabase
        .from("egg_club_participation_request")
        .select(`*,user_id("*")`)
        .eq("egg_club_participation_request_status", "pending")
        .eq("egg_club_id", clubId);

      const { data: activeData, error: activeError } = await supabase
        .from("egg_club_participation_request")
        .select(`*,user_id("*")`)
        .eq("egg_club_participation_request_status", "active")
        .eq("egg_club_id", clubId);

      if (pendingError || activeError) {
        console.error("Error fetching requests:", pendingError || activeError);
      } else {
        setRequests(pendingData as ParticipationRequest[]);
        setActiveMembers(activeData as ParticipationRequest[]);
      }
    };

    fetchPendingAndActiveRequests();
  }, [clubId]);

  const approveMember = async (requestId: number) => {
    const { data, error } = await supabase
      .from("egg_club_participation_request")
      .update({ egg_club_participation_request_status: "active" })
      .eq("egg_club_participation_request_id", requestId)
      .select("*")
      .single();
    if (!error) {
      setRequests((prev) => prev.filter((req) => req.egg_club_participation_request_id !== requestId));
      const { error } = await supabase.from("egg_club_member").insert({
        user_id: data.user_id,
        egg_club_id: data.egg_club_id,
        egg_club_participation_request_id: data.egg_club_participation_request_id,
        egg_club_request_status: "active"
      });
      const user_id = data.user_id as string;

      await RegularClubApproveChatRoomRecruiterEntrance({ egg_club_id: clubId, user_id: user_id }); // 모임원 채팅방 입장(가입 승인 시)

      if (!error) {
        alert("가입이 승인되었습니다.");
        location.reload();
      } else {
        alert("승인 처리 중 오류가 발생했습니다.");
        location.reload();
      }
    } else {
      alert("승인 처리 중 오류가 발생했습니다.");
      location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center mb-2">에그즈 관리</h2>
      <ApproveMemberTabBar activeTab={activeTab} onTabChange={setActiveTab} vlaue="egges" />
      <div className="flex flex-col w-full mt-4 px-4">
        <div className="text-left mb-2">
          <span>총 {activeTab ? activeMembers.length : requests.length}명</span>
        </div>
        <div>
          {activeTab ? (
            <ActiveMembersTab activeMembers={activeMembers} />
          ) : (
            <PendingRequestsTab requests={requests} onApprove={approveMember} />
          )}
        </div>
      </div>
    </div>
  );
}
