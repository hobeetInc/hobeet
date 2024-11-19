"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/store/AuthContext";
import { cn } from "@/utils/cn/util";

type NavItem = {
  path: string;
  icon: {
    active: string;
    default: string;
  };
  alt: string;
  requiresAuth?: boolean;
};

const navItems: NavItem[] = [
  {
    path: "/",
    icon: {
      active: "/asset/Bottom nav_Button_Home.png",
      default: "/asset/Bottom nav_Button_Home_Default.png"
    },
    alt: "Bottom nav_Button_Home_Default"
  },
  {
    path: "/search",
    icon: {
      active: "/asset/Bottom nav_Button_Search.png",
      default: "/asset/Bottom nav_Button_Search_Default.png"
    },
    alt: "Bottom nav_Button_Search_Default"
  },
  {
    path: "/myclublist",
    icon: {
      active: "/asset/Bottom nav_Button__My gathering.png",
      default: "/asset/Bottom nav_Button__My gathering_Default.png"
    },
    alt: "Bottom nav_Button__My gathering_Default",
    requiresAuth: true
  },
  {
    path: "/chat",
    icon: {
      active: "/asset/Bottom nav_Button_My chat.png",
      default: "/asset/Bottom nav_Button_My chat_Default.png"
    },
    alt: "Bottom nav_Button_My chat_Default",
    requiresAuth: true
  },
  {
    path: "/mypage/profile",
    icon: {
      active: "/asset/Bottom nav_Button_My page.png",
      default: "/asset/Bottom nav_Button_My page_Default.png"
    },
    alt: "Bottom nav_Button_My page_Default",
    requiresAuth: true
  }
];

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

export default function Footer() {
  const pathname = usePathname();
  const { userId } = useAuth();
  const router = useRouter();

  const handleAuthRequired = (path: string) => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/signin");
      return false;
    }
    router.push(path);
    return true;
  };

  const NavButton = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.path;
    const iconSrc = isActive ? item.icon.active : item.icon.default;

    const ButtonContent = () => (
      <div className={cn("flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0")}>
        <Image src={iconSrc} alt={item.alt} width={48} height={48} />
      </div>
    );

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

  const showHeaderFooter = !noHeaderFooterRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );

  if (!showHeaderFooter) return null;

  return (
    <footer
      className={cn(
        "flex w-full h-[60px]",
        "p-[8px 16px 0px 16px]",
        "justify-between items-center",
        "border-t border-solid border-[1px] border-[#F2F2F2]",
        "bg-[#fff]",
        "fixed bottom-[15px]",
        "flex-shrink-0"
      )}
    >
      <div className={cn("flex justify-around w-full")}>
        {navItems.map((item, index) => (
          <NavButton key={index} item={item} />
        ))}
      </div>
    </footer>
  );
}
