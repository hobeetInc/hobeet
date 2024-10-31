"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  const pathname = usePathname();

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
            <Image
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
        <Link href="/club">
          <div className="flex w-[48px] h-[48px] flex-col justify-center items-center flex-shrink-0">
            <Image
              src={
                pathname === "/club"
                  ? "/asset/Bottom nav_Button__My gathering.png"
                  : "/asset/Bottom nav_Button__My gathering_Default.png"
              }
              alt="Bottom nav_Button__My gathering_Default"
              width={48}
              height={48}
            />
          </div>
        </Link>
        <Link href="/chat">
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
        </Link>
        <Link href="/mypage">
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
        </Link>
      </div>
    </footer>
  );
}
