"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@/components/ui/atoms/icons/Icon";
import Text from "@/components/ui/atoms/text/Text";
import { BsPlusLg } from "react-icons/bs";
import { useAuthStore } from "@/store/authStore";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { cn } from "@/utils/cn/util";
import HeaderSearchInput from "@/app/_components/HeaderSearchInput";

type NavItem = {
  path: string;
  icon: {
    active: string;
    default: string;
  };
  alt: string;
  label: string;
  requiresAuth?: boolean;
  onClick?: () => void;
};

export default function Header({ children }) {
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
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

  const handleAuthRequired = (path: string) => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/signin");
      return false;
    }
    router.push(path);
    return true;
  };

  const navItems: NavItem[] = [
    {
      path: "/alarm",
      icon: {
        active: "/asset/Navigation/Bottom nav_Button_Alarm.png",
        default: "/asset/Navigation/Bottom nav_Button_Alarm.png"
      },
      alt: "Alarm",
      label: "알림",
      requiresAuth: true,
      onClick: handleAlarm
    },
    {
      path: "/myclublist",
      icon: {
        active: "/asset/Navigation/Bottom nav_Button__My gathering_Default.png",
        default: "/asset/Navigation/Bottom nav_Button__My gathering_Default.png"
      },
      alt: "My Gathering",
      label: "내 모임",
      requiresAuth: true
    },
    {
      path: "/chat",
      icon: {
        active: "/asset/Navigation/Bottom nav_Button_My chat_Default.png",
        default: "/asset/Navigation/Bottom nav_Button_My chat_Default.png"
      },
      alt: "My Chat",
      label: "내 채팅",
      requiresAuth: true
    },
    {
      path: "/mypage/profile",
      icon: {
        active: "/asset/Navigation/Bottom nav_Button_My page_Default.png",
        default: "/asset/Navigation/Bottom nav_Button_My page_Default.png"
      },
      alt: "My Page",
      label: "마이",
      requiresAuth: true
    }
  ];

  const mobileNoHeaderFooterRoutes = [
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

  // 웹에서 헤더, 푸터 숨길 경로
  const desktopNoHeaderFooterRoutes = ["/signin", "/club"];

  const mobileNoHeaderRoutes = [/^\/category\/.*$/];
  const desktopNoHeaderRoutes = [];

  const showHeaderFooter = !(isLargeScreen ? desktopNoHeaderFooterRoutes : mobileNoHeaderFooterRoutes).some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
  const showHeader = !(isLargeScreen ? desktopNoHeaderRoutes : mobileNoHeaderRoutes).some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );

  const NavButton = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.path;
    const iconSrc = isActive ? item.icon.active : item.icon.default; // iconSrc 정의

    const ButtonContent = () => (
      <div className={cn("flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0")}>
        <Image src={iconSrc} alt={item.alt} width={48} height={48} />
      </div>
    );

    if (item.onClick) {
      return (
        <button onClick={item.onClick}>
          <ButtonContent />
        </button>
      );
    }

    if (item.requiresAuth) {
      return (
        <button onClick={() => handleAuthRequired(item.path)}>
          <ButtonContent />
        </button>
      );
    }

    return (
      <Link href={item.path}>
        <ButtonContent />
      </Link>
    );
  };

  const MobileHeader = () => (
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
        {(pathname === "/" || pathname === "/search" || pathname === "/myclublist") && (
          <button
            onClick={handleCreateMeet}
            className="w-6 h-6 flex items-center justify-center"
            aria-label="CreateMeet"
          >
            <BsPlusLg className="w-6 h-6" />
          </button>
        )}
        <button onClick={handleAlarm} className="w-6 h-6 flex items-center justify-center" aria-label="AlarmBell">
          <Icon name="bell" />
        </button>
      </div>
    </header>
  );

  const DesktopHeader = () => (
    <header className="flex  w-full h-[88px] px-5 fixed right-0 bg-white z-50">
      <div className="flex items-center justify-between w-full gap-5">
        <Link href="/">
          <Image src="/asset/Logo/MainLogo.svg" alt="MainLogo" width={96} height={24} priority />
        </Link>

        <div>
          <HeaderSearchInput />
        </div>
        <nav className="w-[240px] flex items-center gap-4">
          {navItems.map((item, index) => (
            <NavButton key={index} item={item} />
          ))}
        </nav>
      </div>
    </header>
  );

  return (
    <>
      {showHeaderFooter && showHeader && (isLargeScreen ? <DesktopHeader /> : <MobileHeader />)}
      <main
        className={`flex-1 overflow-y-auto scrollbar-hide ${
          isLargeScreen
            ? showHeaderFooter
              ? "mt-[88px]"
              : ""
            : showHeaderFooter
            ? showHeader
              ? "mt-[60px] mb-[60px]"
              : "mb-[60px]"
            : showHeader
            ? ""
            : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}
