"use client";

import { Icon } from "@/components/ui/atoms/icons/Icon";
import { GoPlus } from "react-icons/go";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function FloatingButton() {
  const [mounted, setMounted] = useState(false);
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePlus = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
    } else {
      router.push("/club");
    }
  };

  const hideFloatingButton = [
    "/signin",
    "/register",
    /^\/chat\/regularChat\/.*$/,
    "/club",
    "/club/one-time",
    "/club/regular-time",
    /^\/chat\/onetimeChat\/.*$/,
    /^\/club\/one-time-club-sub\/.*$/,
    /^\/club\/regular-club-sub\/.*$/,
    /^\/signupSecond\/.*$/,
    "/mypage/profile/profileUpdate",
    "/mypage/profile/inquiry",
    "/kakaopay/paymentConfirm",
    "/kakaopay/success",
    /^\/approvemembers\/.*$/
  ];

  if (
    !isLargeScreen ||
    hideFloatingButton.some((route) => (typeof route === "string" ? route === pathname : route.test(pathname)))
  ) {
    return null;
  }

  return (
    <div className="w-21 h-[176px] fixed right-0 bottom-0 flex flex-col justify-start gap-3 pr-5">
      <button className="w-16 h-16 rounded-full bg-white border border-1 border-gray-100 flex items-center justify-center">
        <Icon name="eggSpeechBubble" />
      </button>
      <button onClick={handlePlus} className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
        <GoPlus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
