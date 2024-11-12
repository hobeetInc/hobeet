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
    <div className="w-full flex items-center justify-between h-[48px] p-4 relative">
      <button onClick={handleBack} className="absolute left-4">
        <ChevronLeft />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">
        {clubInfo?.egg_day_name.length > 8 ? `${clubInfo?.egg_day_name.slice(0, 8)}...` : clubInfo?.egg_day_name}
      </h1>
    </div>
  );
};

export default DayHeader;
