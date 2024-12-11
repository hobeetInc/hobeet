"use client";

import { useRouter } from "next/navigation";
import { EggPop } from "@/types/features/club/eggpop.types";
import Text from "@/components/ui/atoms/text/Text";
import { ChevronLeft } from "lucide-react";
import useScreenSizeStore from "@/store/useScreenSizeStore";

interface PopHeaderProps {
  clubInfo: EggPop;
}
const PopHeader = ({ clubInfo }: PopHeaderProps) => {
  const router = useRouter();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  // 추후 뒤로가기 고칠 예정 (지우지 마세요)
  // useEffect(() => {
  //   const isJustCreated = localStorage.getItem("justCreated") === "true";
  //   const fromKakaoPay = localStorage.getItem("fromKakaoPay") === "true";

  //   if (isJustCreated) {
  //     // 뒤로가기 방지를 위한 history 조작
  //     window.history.pushState(null, "", window.location.href);

  //     const handlePopState = () => {
  //       window.history.pushState(null, "", window.location.href);
  //       router.push("/"); // 또는 다른 페이지로 리다이렉트
  //     };

  //     window.addEventListener("popstate", handlePopState);

  //     // cleanup
  //     localStorage.removeItem("justCreated");

  //     return () => {
  //       window.removeEventListener("popstate", handlePopState);
  //     };
  //   }

  //   if (fromKakaoPay) {
  //     window.history.pushState(null, "", window.location.href);

  //     const handlePaymentPopState = () => {
  //       if (document.referrer.includes("kakaopay")) {
  //         window.history.pushState(null, "", window.location.href);
  //         router.push("/club");
  //       }
  //     };

  //     window.addEventListener("popstate", handlePaymentPopState);

  //     return () => {
  //       window.removeEventListener("popstate", handlePaymentPopState);
  //     };
  //   }
  // }, [router]);

  // const handleBack = () => {
  //   const isJustCreated = localStorage.getItem("justCreated") === "true";
  //   const isFromKakaoPay = localStorage.getItem("fromKakaoPay") === "true";

  //   if (isJustCreated || (isFromKakaoPay && !isJustCreated)) {
  //     router.push("/");
  //     return;
  //   }

  //   router.back();
  // };

  const handleBack = () => {
    router.push("/");
  };

  if (isLargeScreen) return null;

  return (
    <div className="flex justify-center items-center w-full">
      <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex">
        <ChevronLeft className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="flex-1 text-center pr-7">
        <Text variant="header-16">
          {clubInfo.egg_pop_name.length > 20 ? `${clubInfo.egg_pop_name.slice(0, 20)}...` : clubInfo.egg_pop_name}
        </Text>
      </div>
    </div>
  );
};

export default PopHeader;
