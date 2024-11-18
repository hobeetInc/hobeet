// "use client";

// import { DayHeaderProps } from "@/types/eggday.types";
// import { ChevronLeft } from "lucide-react";
// import { useRouter, useParams } from "next/navigation";
// import { useEffect } from "react";

// const DayHeader = ({ clubInfo }: DayHeaderProps) => {
//   const router = useRouter();
//   const params = useParams();
//   const { id } = params;

//   // console.log("params:", params);

//   useEffect(() => {
//     const isJustCreated = localStorage.getItem("justCreated") === "true";

//     if (isJustCreated) {
//       window.history.pushState(null, "", window.location.href);

//       const handlePopState = () => {
//         window.history.pushState(null, "", window.location.href);
//         router.push(`/club/regular-club-sub/${id}`);
//       };

//       window.addEventListener("popstate", handlePopState);

//       localStorage.removeItem("justCreated");

//       return () => {
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [router, id]);

//   const handleBack = () => {
//     if (localStorage.getItem("justCreated") !== "true") {
//       router.back();
//     } else {
//       router.push(`/club/regular-club-sub/${id}`);
//     }
//   };

//   return (
//     <div className="w-full flex items-center justify-between h-[48px] p-4 relative">
//       <button onClick={handleBack} className="absolute left-4">
//         <ChevronLeft />
//       </button>
//       <h1 className="flex-1 text-center text-lg font-semibold">
//         {clubInfo?.egg_day_name.length > 8 ? `${clubInfo?.egg_day_name.slice(0, 8)}...` : clubInfo?.egg_day_name}
//       </h1>
//     </div>
//   );
// };

// export default DayHeader;

"use client";

import Text from "@/components/uiComponents/TextComponents/Text";
import { DayHeaderProps } from "@/types/eggday.types";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const DayHeader = ({ clubInfo }: DayHeaderProps) => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const isJustCreated = localStorage.getItem("justCreated") === "true";
    const fromKakaoPay = localStorage.getItem("fromKakaoPay") === "true";

    if (isJustCreated) {
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        window.history.pushState(null, "", window.location.href);
        router.push(`/club/regular-club-sub/${id}`);
      };

      window.addEventListener("popstate", handlePopState);
      localStorage.removeItem("justCreated");

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }

    if (fromKakaoPay) {
      window.history.pushState(null, "", window.location.href);

      const handlePaymentPopState = () => {
        if (document.referrer.includes("kakaopay")) {
          window.history.pushState(null, "", window.location.href);
          router.push("/club");
        }
      };

      window.addEventListener("popstate", handlePaymentPopState);

      return () => {
        window.removeEventListener("popstate", handlePaymentPopState);
      };
    }
  }, [router, id]);

  const handleBack = () => {
    if (localStorage.getItem("justCreated") !== "true") {
      // 결제 페이지에서 왔으면 클럽 메인으로
      if (localStorage.getItem("fromKakaoPay") === "true") {
        router.push(`/club/regular-club-sub/${id}`);
      } else {
        router.back();
      }
    } else {
      router.push(`/club/regular-club-sub/${id}`);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex">
        <ChevronLeft className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="flex-1 text-center pr-7">
        <Text variant="header-16">
          {clubInfo?.egg_day_name.length > 8 ? `${clubInfo?.egg_day_name.slice(0, 8)}...` : clubInfo?.egg_day_name}
        </Text>
      </div>
    </div>

    // <div className="w-full flex items-center justify-between h-[48px] p-4 relative">
    //   <button onClick={handleBack} className="w-6 h-6">
    //     <ChevronLeft className="w-full h-full" />
    //   </button>
    //   <h1 className="flex-1 text-center text-lg font-semibold">
    //     {clubInfo?.egg_day_name.length > 8 ? `${clubInfo?.egg_day_name.slice(0, 8)}...` : clubInfo?.egg_day_name}
    //   </h1>
    // </div>
  );
};

export default DayHeader;
