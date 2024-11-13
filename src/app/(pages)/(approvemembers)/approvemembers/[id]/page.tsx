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

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[328px] h-[166px] pt-2 bg-white rounded-2xl flex-col justify-start items-start inline-flex">
        <div className="w-[328px] px-6 pt-4 pb-2 justify-start items-center inline-flex">
          <div className="text-gray-900 text-lg font-bold font-Pretendard leading-normal">참여 신청을 승인할까요?</div>
        </div>
        <div className="w-[328px] px-6 pb-2 justify-start items-center gap-2.5 inline-flex">
          <div className="text-gray-300 text-sm font-normal font-Pretendard leading-tight">
            승인 후에 취소할 수 없어요
          </div>
        </div>
        <div className="w-[328px] px-6 pt-4 pb-6 justify-center items-center gap-2 inline-flex">
          <button
            onClick={onClose}
            className="w-[136px] h-[42px] px-4 py-1.5 rounded-lg border border-gray-100 justify-center items-center gap-2.5 flex"
          >
            <span className="text-center text-gray-400 text-sm font-semibold font-Pretendard leading-[18.90px]">
              아니요
            </span>
          </button>
          <button
            onClick={onConfirm}
            className="w-[136px] h-[42px] px-4 py-1.5 bg-neutral-800 rounded-lg justify-center items-center gap-2.5 flex"
          >
            <span className="text-center text-white text-sm font-semibold font-Pretendard leading-[18.90px]">
              네, 승인할게요
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ActiveMembersTab = ({ activeMembers }: { activeMembers: ParticipationRequest[] }) => {
  return (
    <div className="flex flex-col gap-6 ">
      {activeMembers.map((member, index) => (
        <div key={member.egg_club_participation_request_id} className="flex items-center gap-3">
          <Image
            src={member.user_id.user_profile_img}
            alt={member.user_id.user_name}
            width={158}
            height={158}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-900 font-semibold font-pretendard">{member.user_id.user_name}</span>
          {index === 0 ? (
            // 에그장 뱃지 (첫 번째 멤버)
            <div className="w-[42px] h-[19px] px-2 py-0.5 bg-gray-800 rounded-[124px] justify-center items-center inline-flex">
              <div className="text-white text-[10px] font-normal font-pretendard leading-[14.50px]">에그장</div>
            </div>
          ) : (
            // 에그즈 뱃지 (나머지 멤버)
            <div className="w-[42px] h-[19px] px-2 py-0.5 bg-primary-300 rounded-[124px] justify-center items-center inline-flex">
              <div className="text-gray-900 text-[10px] font-normal font-pretendard leading-[14.50px]">에그즈</div>
            </div>
          )}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  const handleApproveClick = (requestId: number) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  const handleConfirmApproval = () => {
    if (selectedRequestId) {
      onApprove(selectedRequestId);
      setIsModalOpen(false);
      setSelectedRequestId(null);
    }
  };

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
            onClick={() => handleApproveClick(req.egg_club_participation_request_id)}
            className="h-[39px] px-6 py-2.5 bg-neutral-800 rounded-[30px] justify-center items-center inline-flex hover:bg-neutral-700 transition-colors"
          >
            <span className="text-white text-sm font-semibold font-pretendard leading-[18.90px]">승인</span>
          </button>
        </div>
      ))}
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmApproval} />
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
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-center h-12 text-gray-900 content-center font-bold font-pretendard mb-2">에그즈 관리</h2>
      <ApproveMemberTabBar activeTab={activeTab} onTabChange={setActiveTab} value="egges" />
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
