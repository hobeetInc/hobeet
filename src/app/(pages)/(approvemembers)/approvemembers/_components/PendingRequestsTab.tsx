import { useState } from "react";
import Image from "next/image";
import { PendingRequestsTabProps } from "../_types/approve.types";
import ConfirmModal from "./ConfirmModal";

export default function PendingRequestsTab({ requests, onApprove }: PendingRequestsTabProps) {
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
            {req.user_id?.user_profile_img && (
              <Image
                src={req.user_id.user_profile_img}
                alt={`${req.user_id.user_name}의 프로필`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span>{req.user_id?.user_name}</span>
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
}
