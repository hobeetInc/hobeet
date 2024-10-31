"use client";

import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const CreateLayout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center h-[48px] p-4">
        <button onClick={() => router.back()} className="text-lg">
          ←
        </button>
        <h1 className="text-lg font-semibold">에그데이</h1>
        {/* <button className="text-lg">+</button> */}
      </div>
      {children}
    </div>
  );
};

export default CreateLayout;
