"use client";

import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`flex w-[390px] h-[48px] items-center flex-shrink-0 ${className || ""}`}>
      <Link href="/">
        <div className="flex w-[96px] h-[24px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
          <Image src={"/asset/MainLogo.svg"} alt="MainLogo" width={96} height={24} />
        </div>
      </Link>

      <div className="flex items-center ml-auto space-x-[16px] mr-[12px] mt-[12px] mb-[12px]">
        <Link href="/club">
          <Image src={"/asset/PlusIcon.png"} alt="PlusIcon" width={24} height={24} />
        </Link>
        <Image src={"/asset/BellIcon.png"} alt="BellIcon" width={24} height={24} />
        <Image src={"/asset/MenuIcon.png"} alt="MenuIcon" width={24} height={24} />
      </div>
    </header>
  );
}
