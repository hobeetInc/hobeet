"use client";

import { DayHeaderProps } from "@/types/eggday.types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DayHeader = ({ clubInfo }: DayHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-between h-[48px] p-4 relative">
      <button onClick={handleBack} className="absolute left-4">
        <ChevronLeft />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">
        {clubInfo?.r_c_notification_name.length > 8
          ? `${clubInfo?.r_c_notification_name.slice(0, 8)}...`
          : clubInfo?.r_c_notification_name}
      </h1>
    </div>
  );
};

export default DayHeader;
