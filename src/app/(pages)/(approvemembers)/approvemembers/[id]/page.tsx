"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/uiComponents/TextComponents/Text";
import ApproveMemberTabBar from "@/components/uiComponents/ApproveMemberTapBar";
import { fetchPendingAndActiveRequests, approveMember } from "../_api/approve.api";
import ActiveMembersTab from "../_components/ActiveMembers";
import PendingRequestsTab from "../_components/PendingRequestsTab";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function ApproveMembersPage() {
  // 활성 탭 상태 관리 (true: 활성, false: 대기)
  const [activeTab, setActiveTab] = useState(true);
  const params = useParams();
  const clubId = Number(params.id);
  const router = useRouter();

  // 멤버 데이터 조회 쿼리
  // 대기 중인 요청과 활성 멤버 조회
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

  // 멤버 승인 핸들러
  // 승인 요청을 처리하는 뮤테이션 호출
  const handleApproveMember = async (requestId: number) => {
    approveRequest({ requestId, clubId });
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return <Text variant="subtitle-16">로딩 중...</Text>;
  }

  if (error) {
    return <Text variant="subtitle-16">에러가 발생했습니다.</Text>;
  }

  const { pendingRequests, activeMembers } = data || { pendingRequests: [], activeMembers: [] };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center">
        <div className="left-0 m-3">
          <div onClick={handleBack}>
            <HiOutlineChevronLeft className="w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-grow justify-center">
          <Text variant="header-16" className="text-gray-900">
            에그즈 관리
          </Text>
        </div>
        <div className="w-6 m-3"></div>
      </div>
      <div className="w-full mt-12">
        <ApproveMemberTabBar activeTab={activeTab} onTabChange={setActiveTab} value="egges" />
        <div className="flex flex-col w-full mt-4 px-4">
          <div className="text-left mb-2">
            <span>총 {activeTab ? activeMembers.length : pendingRequests.length}명</span>
          </div>
          <div>
            {activeTab ? (
              <ActiveMembersTab activeMembers={activeMembers} />
            ) : (
              <PendingRequestsTab requests={pendingRequests} onApprove={handleApproveMember} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
