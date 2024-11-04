"use client";

import { ChevronLeft } from "lucide-react";
import { GetOneTimeClub } from "../_types/Crews";
import { useRouter } from "next/navigation";

type PopHeaderProps = {
  clubInfo: GetOneTimeClub;
};

const PopHeader = ({ clubInfo }: PopHeaderProps) => {
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
        {clubInfo.one_time_club_name.length > 8
          ? `${clubInfo.one_time_club_name.slice(0, 8)}...`
          : clubInfo.one_time_club_name}
      </h1>
    </div>
  );
};

export default PopHeader;
