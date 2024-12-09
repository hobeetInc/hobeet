// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { PendingRequestsTabProps } from "../_types/approve.types";
// import ConfirmModal from "./ConfirmModal";

// export default function PendingRequestsTab({ requests, onApprove }: PendingRequestsTabProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

//   // 승인 버튼 클릭 시 모달 열기
//   const handleApproveClick = (requestId: number) => {
//     setSelectedRequestId(requestId);
//     setIsModalOpen(true);
//   };

//   // 승인 버튼 클릭 시 승인 처리
//   const handleConfirmApproval = () => {
//     if (selectedRequestId) {
//       onApprove(selectedRequestId);
//       setIsModalOpen(false);
//       setSelectedRequestId(null);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       {requests.map((req) => (
//         <div key={req.egg_club_participation_request_id} className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {req.user_id?.user_profile_img && (
//               <Image
//                 src={req.user_id.user_profile_img}
//                 alt={`${req.user_id.user_name}의 프로필`}
//                 width={40}
//                 height={40}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//             )}
//             <span>{req.user_id?.user_name}</span>
//           </div>

//           <button
//             onClick={() => handleApproveClick(req.egg_club_participation_request_id)}
//             className="w-36 h-[39px] px-6 py-2.5 bg-neutral-800 rounded-[30px] justify-center items-center inline-flex hover:bg-neutral-700 transition-colors"
//           >
//             <span className="text-white text-sm font-semibold font-pretendard leading-[18.90px]">승인</span>
//           </button>
//         </div>
//       ))}
//       <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmApproval} />
//     </div>
//   );
// }

import { useState } from "react";
import Image from "next/image";
import { PendingRequestsTabProps } from "../_types/approve.types";

export default function PendingRequestsTab({ requests, onApprove }: PendingRequestsTabProps) {
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);

  const handleApproveClick = (requestId: number) => {
    setExpandedRequestId(requestId);
  };

  const handleConfirmApproval = (requestId: number) => {
    onApprove(requestId);
    setExpandedRequestId(null);
  };

  const handleCancel = () => {
    setExpandedRequestId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {requests.map((req) => (
        <div key={req.egg_club_participation_request_id} className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
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
              className="w-36 h-[39px] px-6 py-2.5 bg-neutral-800 rounded-[30px] justify-center items-center inline-flex hover:bg-neutral-700 transition-colors"
            >
              <span className="text-white text-sm font-semibold font-pretendard leading-[18.90px]">승인</span>
            </button>
          </div>

          {expandedRequestId === req.egg_club_participation_request_id && (
            <div className="w-full py-4 bg-[#f2f2f2] rounded-2xl flex flex-col gap-4">
              <div className="px-5 flex flex-col gap-1">
                <div className="text-[#0c0c0c] text-lg font-bold font-pretendard">참여 신청을 승인할까요?</div>
                <div className="text-[#727272] text-sm font-normal font-pretendard">승인 후에 취소할 수 없어요</div>
              </div>
              <div className="w-full px-5 flex justify-end items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="w-[103px] h-[42px] px-4 py-1.5 bg-[#f2f2f2] rounded-lg border border-[#bfbfbf]"
                >
                  <span className="text-center text-[#8c8c8c] text-sm font-normal font-pretendard">아니요</span>
                </button>
                <button
                  onClick={() => handleConfirmApproval(req.egg_club_participation_request_id)}
                  className="w-[103px] h-[42px] px-4 py-1.5 bg-neutral-800 rounded-lg"
                >
                  <span className="text-center text-white text-sm font-normal font-pretendard">네, 승인할게요</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
