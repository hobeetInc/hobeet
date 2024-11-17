import { ConfirmModalProps } from "../_types/approve.types";

export default function ConfirmModal({ isOpen, onClose, onConfirm }: ConfirmModalProps) {
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
}
