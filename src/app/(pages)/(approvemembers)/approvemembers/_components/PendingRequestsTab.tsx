import { useState } from "react";
import Image from "next/image";
import { PendingRequestsTabProps } from "../_types/approve.types";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import Text from "@/components/ui/atoms/text/Text";

export default function PendingRequestsTab({ requests, onApprove }: PendingRequestsTabProps) {
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

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
        <div key={req.egg_club_participation_request_id}>
          {expandedRequestId === req.egg_club_participation_request_id && isLargeScreen ? (
            <div className="flex flex-col bg-[#f2f2f2] rounded-2xl p-4 w-[648px] gap-4">
              <div className="flex items-center justify-between">
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
                  <Text variant="subtitle-16">{req.user_id?.user_name}</Text>
                </div>
                <button className="w-36 h-[39px] px-6 py-2.5 bg-gray-200 rounded-[30px] justify-center items-center inline-flex">
                  <Text variant="subtitle-14" className="text-white">
                    승인
                  </Text>
                </button>
              </div>
              <div className="border border-solid border-gray-100"></div>
              <div className="flex">
                <div className="flex flex-col w-[394px]">
                  <Text variant="header-18" className="text-gray-900">
                    참여 신청을 승인할까요?
                  </Text>
                  <Text variant="body-14" className="text-gray-500">
                    승인 후에 취소할 수 없어요
                  </Text>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="w-[103px] h-[42px] px-4 py-1.5 bg-[#f2f2f2] rounded-lg border border-[#bfbfbf]"
                  >
                    <Text variant="body-14" className="text-gray-400">
                      아니요
                    </Text>
                  </button>
                  <button
                    onClick={() => handleConfirmApproval(req.egg_club_participation_request_id)}
                    className="w-[115px] h-[42px] px-4 py-1.5 bg-neutral-800 rounded-lg"
                  >
                    <Text variant="body-14" className="text-white">
                      네, 승인할게요
                    </Text>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
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
                onClick={
                  isLargeScreen
                    ? () => handleApproveClick(req.egg_club_participation_request_id)
                    : () => handleConfirmApproval(req.egg_club_participation_request_id)
                }
                className="w-36 h-[39px] px-6 py-2.5 bg-neutral-800 rounded-[30px] justify-center items-center inline-flex hover:bg-neutral-700 transition-colors"
              >
                <span className="text-white text-sm font-semibold leading-[18.90px]">승인</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
