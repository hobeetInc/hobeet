"use client";
import { useState } from "react";
import ActiveMembersTab from "./ActiveMembers";
import PendingRequestsTab from "./PendingRequestsTab";
import { IoClose } from "react-icons/io5";
import { useQuery, useMutation } from "@tanstack/react-query";
import { approveMember, fetchPendingAndActiveRequests } from "../_api/approve.api";
import Text from "@/components/ui/atoms/text/Text";
import ApproveMemberTabBar from "@/components/ui/molecules/navigation/ApproveMemberTapBar";

type ApproveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clubId: number;
};

const ApproveModal = ({ isOpen, onClose, clubId }: ApproveModalProps) => {
  const [activeTab, setActiveTab] = useState(true);

  // 멤버 데이터 조회 쿼리
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["clubMembers", clubId],
    queryFn: () => fetchPendingAndActiveRequests(clubId)
  });

  // 멤버 승인 처리
  const { mutate: approveRequest } = useMutation({
    mutationFn: ({ requestId, clubId }: { requestId: number; clubId: number }) => approveMember(requestId, clubId),
    onSuccess: () => {
      alert("가입이 승인되었습니다.");
      refetch();
    },
    onError: () => {
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  });

  const handleApproveMember = async (requestId: number) => {
    approveRequest({ requestId, clubId });
  };

  if (!isOpen) return null;

  if (isLoading) {
    return <Text variant="subtitle-16">로딩 중...</Text>;
  }

  if (error) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

  const { pendingRequests, activeMembers } = data || { pendingRequests: [], activeMembers: [] };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
      <div className="bg-white w-[696px] h-[796px] rounded-xl shadow-lg relative flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-center items-center w-full h-12 mt-6">
          <Text variant="header-16" className="text-gray-900 w-[648px] h-[27px] text-center">
            에그즈 관리
          </Text>
          <button onClick={onClose} className="w-12 h-12 pl-2">
            <IoClose className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1">
          <ApproveMemberTabBar activeTab={activeTab} onTabChange={setActiveTab} value="egges" />

          <div className="flex flex-col w-full mt-4 px-6 overflow-y-auto scrollbar-hide">
            <div className="text-left mb-8">
              <Text variant="body-14" className="text-gray-500">
                총 {activeTab ? activeMembers.length : pendingRequests.length}명
              </Text>
            </div>

            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {activeTab ? (
                <ActiveMembersTab activeMembers={activeMembers} />
              ) : (
                <PendingRequestsTab requests={pendingRequests} onApprove={handleApproveMember} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
