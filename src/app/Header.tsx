"use client";
import Link from "next/link";
import { useAuth } from "./store/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";



export default function Header({ className }: { className: string }) {
  const { userId } = useAuth();
  const pathname = usePathname();

  const router = useRouter();
  const handleCreateMeet = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      router.push("/club");
    }
  };

  const handleAlarm = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      alert("알람 서비스 준비중입니다.");
    }
  };
  return (
    <header className={`flex w-full h-[48px] items-center flex-shrink-0 ${className || ""}`}>
      {pathname === "/" && (
        <Link href="/">
          <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
            <Image src={"/asset/MainLogo.svg"} alt="MainLogo" width={96} height={24} />
          </div>
        </Link>
      )}

      {pathname === "/search" && (
        <Link href="/search">
          <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
            <div className="flex w-[35px] h-[28px]  py-[10px] items-center gap-[10px]">
              <p
                className="text-[#000] text-center font-pretendard text-[20px] not-italic font-[700px]	leading-[27px]"
              >
                탐색
              </p>
            </div>
          </div>
        </Link>
      )}

      {pathname === "/chat" && (
        <Link href="/chat">
          <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
            <div className="flex w-[57px] h-[28px]  py-[10px] items-center gap-[10px]">
              <p
                className="text-[#000] text-center font-pretendard text-[20px] not-italic font-[700px]	leading-[27px]"
              >
                내 채팅
              </p>
            </div>
          </div>
        </Link>
      )}

      {pathname === "/myclublist" && (
        <Link href="/myclublist">
          <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
            <div className="flex w-[35px] h-[28px]  py-[10px] items-center gap-[10px]">
              <p
                className="text-[#000] text-center font-pretendard
               text-[20px] not-italic font-[700px]	leading-[27px]"
              >
                내 모임
              </p>
            </div>
          </div>
        </Link>
      )}

      <div className="flex items-center ml-auto gap-4 mr-3 my-3">
        {pathname === "/" || pathname === "/search" || pathname === "/myclublist" ? (
          <button onClick={handleCreateMeet} className="w-6 h-6 flex items-center justify-center">
            <GoPlus className="w-6 h-6" />
          </button>
        ) : null}
        <button onClick={handleAlarm} className="w-6 h-6 flex items-center justify-center">
          <Icon name="bell" />
        </button>
      </div>
    </header>
  );
}
