"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/store/AuthContext";
import { ClubHeaderProps } from "@/types/eggclub.types";
import { IoIosArrowBack } from "react-icons/io";

const ClubHeader = ({ clubInfo }: ClubHeaderProps) => {
  const router = useRouter();
  const { userId } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleCreate = () => {
    router.push(`/club/regular-club-sub/${clubInfo.egg_club_id}/create`);
  };

  return (
    <div className="flex justify-between items-center h-[48px] p-4 relative">
      <button onClick={handleBack} className="absolute left-4">
        <IoIosArrowBack />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">
        {clubInfo.egg_club_name.length > 8 ? `${clubInfo.egg_club_name.slice(0, 8)}...` : clubInfo.egg_club_name}
      </h1>
      {clubInfo.user_id === userId ? <button onClick={handleCreate}>+</button> : null}
    </div>
  );
};

export default ClubHeader;
