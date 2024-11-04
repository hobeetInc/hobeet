"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRegularClub } from "../_types/Crews";

type ClubHeaderProps = {
  clubInfo: getRegularClub;
};

const ClubHeader = ({ clubInfo }: ClubHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleCreate = () => {
    router.push(`/club/regular-club-sub/${clubInfo.regular_club_id}/create`);
  };

  return (
    <div className="flex justify-between items-center h-[48px] p-4 relative">
      <button onClick={handleBack} className="absolute left-4">
        <ChevronLeft />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">
        {clubInfo.regular_club_name.length > 8
          ? `${clubInfo.regular_club_name.slice(0, 8)}...`
          : clubInfo.regular_club_name}
      </h1>
      <button onClick={handleCreate}>+</button>
    </div>
  );
};

export default ClubHeader;