"use client";

import { Icon } from "@/components/ui/atoms/icons/Icon";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function FloatingButton() {
  const [mounted, setMounted] = useState(false);
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePlus = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/signin");
    } else {
      router.push("/club");
    }
  };

  return (
    <div className="w-21 h-[176px] fixed right-0 bottom-[116px] flex flex-col justify-start gap-3 pr-5 z-10">
      <button className="w-16 h-16 rounded-full bg-white border border-1 border-gray-100 flex items-center justify-center">
        <Icon name="eggSpeechBubble" />
      </button>
      <button onClick={handlePlus} className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
        <GoPlus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
