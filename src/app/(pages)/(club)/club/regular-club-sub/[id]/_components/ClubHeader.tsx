"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/store/AuthContext";
import { ClubHeaderProps } from "@/types/eggclub.types";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";

const ClubHeader = ({ clubInfo }: ClubHeaderProps) => {
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const isJustCreated = localStorage.getItem("justCreated") === "true";

    if (isJustCreated) {
      // 뒤로가기 방지를 위한 history 조작
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        window.history.pushState(null, "", window.location.href);
        router.push("/"); // 또는 다른 페이지로 리다이렉트
      };

      window.addEventListener("popstate", handlePopState);

      // cleanup
      localStorage.removeItem("justCreated");

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [router]);

  const handleBack = () => {
    // 생성 직후가 아닐 때만 뒤로가기 허용
    if (localStorage.getItem("justCreated") !== "true") {
      router.back();
    }
  };

  const handleCreate = () => {
    router.push(`/club/regular-club-sub/${clubInfo.egg_club_id}/create`);
  };

  return (
    <div className="flex justify-between items-center h-[48px] p-4">
      <button onClick={handleBack} className="left-4">
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
