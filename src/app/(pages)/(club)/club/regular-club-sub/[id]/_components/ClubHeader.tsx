"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { GoPlus } from "react-icons/go";
import { useAuthStore } from "@/store/authStore";
import { useClubStore } from "@/store/crewStore";
import Text from "@/components/ui/atoms/text/Text";

const ClubHeader = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);

  const { clubInfo } = useClubStore();

  // 추후에 뒤로가기 고칠예정(지우지 마세요)

  // const currentPath = useParams();

  // useEffect(() => {
  //   const isJustCreated = localStorage.getItem("justCreated") === "true";

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
  // }, [router]);

  // const handleBack = () => {
  //   if (clubInfo.egg_club_id === Number(currentPath)) {
  //     router.push("/");
  //     return;
  //   }

  //   if (localStorage.getItem("fromKakaoPay") === "true") {
  //     router.push("/");
  //     return;
  //   }

  //   // 생성 직후가 아닐 때만 뒤로가기 허용
  //   if (localStorage.getItem("justCreated") !== "true") {
  //     router.back();
  //     return;
  //   } else {
  //     router.push("/");
  //     return;
  //   }
  // };

  const handleCreate = () => {
    router.replace(`/club/regular-club-sub/${clubInfo.egg_club_id}/create`);
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!clubInfo) return null;

  if (!clubInfo) return null;

  return (
    <div className="flex justify-between items-center h-[48px] p-3">
      <button onClick={handleBack} className="w-6 h-6">
        <ChevronLeft className="w-full h-full" />
      </button>
      <Text variant="header-16" className={`flex-1 text-center ${clubInfo?.user_id === userId ? "" : "pr-5"}`}>
        {clubInfo?.egg_club_name.length > 20 ? `${clubInfo?.egg_club_name.slice(0, 20)}...` : clubInfo?.egg_club_name}
      </Text>
      {clubInfo?.user_id === userId ? (
        <button onClick={handleCreate} className="w-6 h-6">
          <GoPlus className="w-full h-full" />
        </button>
      ) : null}
    </div>
  );
};

export default ClubHeader;
