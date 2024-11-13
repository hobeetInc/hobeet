"use client";

import { DayHeaderProps } from "@/types/eggday.types";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const DayHeader = ({ clubInfo }: DayHeaderProps) => {
  const router = useRouter();
  const params = useParams();
  const clubId = params.clubId; // URL에서 clubId 파라미터 추출

  useEffect(() => {
    const isJustCreated = localStorage.getItem("justCreated") === "true";

    if (isJustCreated) {
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        window.history.pushState(null, "", window.location.href);
        router.push(`/club/regular-club-sub/${clubId}`); // clubId를 사용하여 상위 페이지로 이동
      };

      window.addEventListener("popstate", handlePopState);

      localStorage.removeItem("justCreated");

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [router, clubId]);

  const handleBack = () => {
    if (localStorage.getItem("justCreated") !== "true") {
      router.back();
    } else {
      router.push(`/club/regular-club-sub/${clubId}`); // clubId를 사용하여 상위 페이지로 이동
    }
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
