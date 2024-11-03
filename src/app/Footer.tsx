"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./store/AuthContext";
import Image from "next/image";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  const pathname = usePathname();

  const { userId } = useAuth();

  const router = useRouter();
  const handleChattingRoom = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/signin");
    } else {
      router.push("/chat");
    }
  };
  const handleMyClubList = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/signin");
    } else {
      router.push("/myclublist");
    }
  };

  const handleMyPage = () => {
    if (!userId) {
      router.push("/signin");
    } else {
      router.push("/mypage");
    }
  };

  return (
    <footer
      className={`flex w-[390px] p-[8px 16px 0px 16px] justify-between items-center border-t border-solid border-[1px] border-[#F2F2F2] bg-[#fff] ${
        className || ""
      }`}
    >
      <div className="flex justify-around w-full">
        <Link href="/">
          <div className="flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0">
            <Image
              src={pathname === "/" ? "/asset/Bottom nav_Button_Home.png" : "/asset/Bottom nav_Button_Home_Default.png"}
              alt="Bottom nav_Button_Home_Defaul"
              width={48}
              height={48}
            />
          </div>
        </Link>
        <Link href="/search">
          <div className="flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0">
            <img
              src={
                pathname === "/search"
                  ? "/asset/Bottom nav_Button_Search.png"
                  : "/asset/Bottom nav_Button_Search_Default.png"
              }
              alt="Bottom nav_Button_Search_Default"
              width={48}
              height={48}
            />
          </div>
        </Link>
        <button onClick={handleMyClubList}>
          {/* <Link href="/myclublist"> */}
          <div className="flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0">
            <Image
              src={
                pathname === "/myclublist"
                  ? "/asset/Bottom nav_Button__My gathering.png"
                  : "/asset/Bottom nav_Button__My gathering_Default.png"
              }
              alt="Bottom nav_Button__My gathering_Default"
              width={48}
              height={48}
            />
          </div>
          {/* </Link> */}
        </button>
        <button onClick={handleChattingRoom}>
          <div className="flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0">
            <Image
              src={
                pathname === "/chat"
                  ? "/asset/Bottom nav_Button_My chat.png"
                  : "/asset/Bottom nav_Button_My chat_Default.png"
              }
              alt="Bottom nav_Button_My chat_Default"
              width={48}
              height={48}
            />
          </div>
        </button>
        <button onClick={handleMyPage}>
          {/* <Link href="/mypage"> */}
          <div className="flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0">
            <Image
              src={
                pathname === "/mypage"
                  ? "/asset/Bottom nav_Button_My page.png"
                  : "/asset/Bottom nav_Button_My page_Default.png"
              }
              alt="Bottom nav_Button_My page_Default"
              width={48}
              height={48}
            />
          </div>
          {/* </Link> */}
        </button>
      </div>
    </footer>
  );
}
