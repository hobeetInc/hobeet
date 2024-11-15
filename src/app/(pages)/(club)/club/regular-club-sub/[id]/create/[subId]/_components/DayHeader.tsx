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

import { DayHeaderProps } from "@/types/안끝난거/eggday.types";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

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
    <div className="w-full flex items-center justify-between h-[48px] p-4 relative">
      <button onClick={handleBack} className="left-4">
        <IoIosArrowBack />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">
        {clubInfo?.egg_day_name.length > 8 ? `${clubInfo?.egg_day_name.slice(0, 8)}...` : clubInfo?.egg_day_name}
      </h1>
    </div>
  );
};

export default DayHeader;
