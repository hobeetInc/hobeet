// Footer.tsx
"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="flex w-[390px] h-[48px] items-center flex-shrink-0">
      <div className="flex w-[96px] h-[23.999px] flex-shrink-0 ml-[16px] mt-[12px] mb-[12px]">
        <Image src={"/asset/MainLogo.svg"} alt="MainLogo" width={96} height={24} />
      </div>
      <div className="flex p-[12px 12px 12px 0px] items-center">
        <Image src={"/asset/PlusIcon.png"} alt="PlusIcon" width={24} height={24} />
      </div>
      <div className="flex p-[12px 12px 12px 0px] items-center">
        <Image src={"/asset/BellIcon.png"} alt="BellIcon" width={24} height={24} />
      </div>
      <div className="flex p-[12px 12px 12px 0px] items-center">
        <Image src={"/asset/MenuIcon.png"} alt="MenuIcon" width={24} height={24} />
      </div>
    </header>
  );
}
