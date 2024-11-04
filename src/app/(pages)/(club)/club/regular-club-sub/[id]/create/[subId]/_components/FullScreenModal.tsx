"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface FullScreenModalProps {
  crewList: {
    notificationId: number;
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
      <div className="max-w-screen-md mx-auto h-full flex flex-col">
        <header className="flex items-center p-4 border-b">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">참여 에그즈</h1>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <p className="text-gray-600 mb-4">{`총 ${crewList.length}명`}</p>

            <div className="space-y-4">
              {crewList?.map((member, index) => (
                <div
                  key={member.notificationId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12">
                      <Image src={member.userImage} alt={member.userName} fill className="rounded-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{member.userName}</p>
                      <p className="text-sm text-gray-500">{index === 0 ? "에그장" : "에그즈"}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">참여도</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
