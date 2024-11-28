"use client";

import Text from "@/components/uiComponents/atoms/text/Text";
import { EggDay } from "@/types/features/club/eggday.types";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface DayHeaderProps {
  clubInfo: EggDay | undefined;
}
const DayHeader = ({ clubInfo }: DayHeaderProps) => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // 추후에 뒤로가기 고칠 예정(지우지 마세요)
  // useEffect(() => {
  //   const isJustCreated = localStorage.getItem("justCreated") === "true";
  //   const fromKakaoPay = localStorage.getItem("fromKakaoPay") === "true";

  //   if (isJustCreated) {
  //     window.history.pushState(null, "", window.location.href);

  //     const handlePopState = () => {
  //       window.history.pushState(null, "", window.location.href);
  //       router.push(`/club/regular-club-sub/${id}`);
  //     };

  //     window.addEventListener("popstate", handlePopState);
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
  // }, [router, id]);

  // const handleBack = () => {
  //   if (localStorage.getItem("justCreated") !== "true") {
  //     // 결제 페이지에서 왔으면 클럽 메인으로
  //     if (localStorage.getItem("fromKakaoPay") === "true") {
  //       router.push(`/club/regular-club-sub/${id}`);
  //     } else {
  //       router.back();
  //     }
  //   } else {
  //     router.push(`/club/regular-club-sub/${id}`);
  //   }
  // };

  const handleBack = () => {
    router.push(`/club/regular-club-sub/${id}`);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex">
        <ChevronLeft className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="flex-1 text-center pr-7">
        <Text variant="header-16">
          {clubInfo?.egg_day_name.length > 20 ? `${clubInfo?.egg_day_name.slice(0, 20)}...` : clubInfo?.egg_day_name}
        </Text>
      </div>
    </div>
  );
};

export default DayHeader;
