"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PopHeaderProps } from "@/types/eggpop.types";
import { useEffect } from "react";

const PopHeader = ({ clubInfo }: PopHeaderProps) => {
  const router = useRouter();

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

  return (
    <div className="flex items-center justify-between h-[48px] p-4 relative">
      <button onClick={handleBack} className="absolute left-4">
        <ChevronLeft />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">
        {clubInfo.egg_pop_name.length > 8 ? `${clubInfo.egg_pop_name.slice(0, 8)}...` : clubInfo.egg_pop_name}
      </h1>
    </div>
  );
};

export default PopHeader;
