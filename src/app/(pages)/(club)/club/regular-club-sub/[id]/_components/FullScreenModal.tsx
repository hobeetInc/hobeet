"use client";

import Image from "next/image";

interface FullScreenModalProps {
  crewList: {
    memberId: number;
    userId: string;
    userName: string;
    userImage: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenModal = ({ crewList, isOpen, onClose }: FullScreenModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="container h-screen flex flex-col">
        <div className="h-[48px] bg-pink-100 flex items-center">
          <button onClick={onClose} className="w-6 h-6 border-black border-2 ml-4">
            ←
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-10">
          <div>
            <h1 className="font-bold text-xl mb-4">결재 내역</h1>
            <p>결재 내역 공간입니다</p>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">{`참여 크루원 ${crewList.length}명`}</h1>
            {crewList?.map((member, index) => (
              <div key={member.userId} className="flex items-center gap-2 mb-4">
                <div className="relative w-[37px] h-[37px] overflow-hidden rounded-full">
                  <Image
                    src={member.userImage}
                    alt={member.userName}
                    width={37}
                    height={37}
                    className="w-full h-full object-cover border-2 border-black"
                  />
                </div>

                <div className="flex flex-col gap-1 justify-center">
                  <div className="flex gap-2">
                    <p>{member.userName}</p>
                    <p className="text-[13px]">{index === 0 ? "에그장" : "에그즈"}</p>
                  </div>
                  <p className="text-[13px]">참여도</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
