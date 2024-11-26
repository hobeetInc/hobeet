"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@/components/uiComponents/atoms/icons/Icon";
import Text from "@/components/uiComponents/atoms/text/Text";
import { BsPlusLg } from "react-icons/bs";
import { useAuthStore } from "@/store/authStore";

export default function Header({ children }) {
  const userId = useAuthStore((state) => state.userId);

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

  const noHeaderFooterRoutes = [
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
  const noHeaderRoutes = [/^\/category\/.*$/];
  const showHeaderFooter = !noHeaderFooterRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
  const showHeader = !noHeaderRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );

  return (
    <>
      {showHeaderFooter && showHeader && (
        <header className="flex w-full h-[48px] items-center flex-shrink-0 fixed top-0">
          {pathname === "/" && (
            <Link href="/">
              <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
                <Image src={"/asset/Logo/MainLogo.svg"} alt="MainLogo" width={96} height={24} />
              </div>
            </Link>
          )}

          {pathname === "/search" && (
            <Link href="/search">
              <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
                <div className="flex w-[35px] h-[27px] py-[10px] items-center gap-[10px]">
                  <Text variant="header-20" className="text-[#000] text-center">
                    검색
                  </Text>
                </div>
              </div>
            </Link>
          )}

          {pathname === "/chat" && (
            <Link href="/chat">
              <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
                <div className="flex w-[57px] h-[28px] py-[10px] items-center gap-[10px]">
                  <Text variant="header-20" className="text-[#000] text-center">
                    내 채팅
                  </Text>
                </div>
              </div>
            </Link>
          )}

          {pathname === "/myclublist" && (
            <Link href="/myclublist">
              <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
                <div className="flex w-[57px] h-[27px] py-[10px] items-center gap-[10px]">
                  <Text variant="header-20" className="text-[#000] text-center">
                    내 모임
                  </Text>
                </div>
              </div>
            </Link>
          )}

          {pathname === "/mypage/profile" && (
            <Link href="/mypage/profile">
              <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
                <div className="flex w-[57px] h-[27px] py-[10px] items-center gap-[10px]">
                  <Text variant="header-20" className="text-[#000] text-center">
                    마이
                  </Text>
                </div>
              </div>
            </Link>
          )}

          <div className="flex items-center ml-auto gap-4 mr-3 my-3">
            {pathname === "/" || pathname === "/search" || pathname === "/myclublist" ? (
              <button
                onClick={handleCreateMeet}
                className="w-6 h-6 flex items-center justify-center"
                aria-label="CreateMeet"
              >
                <BsPlusLg className="w-6 h-6" />
              </button>
            ) : null}
            <button onClick={handleAlarm} className="w-6 h-6 flex items-center justify-center" aria-label="AlarmBell">
              <Icon name="bell" />
            </button>
          </div>
        </header>
      )}
      <main
        className={`flex-1 overflow-y-auto scrollbar-hide ${
          showHeaderFooter ? (showHeader ? "mt-[60px] mb-[60px]" : "mb-[60px]") : showHeader ? "" : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}
