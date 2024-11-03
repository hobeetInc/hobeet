"use client";

import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const CreateLayout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center h-[48px] p-4 relative">
        <button onClick={() => router.back()} className="absolute left-4 text-lg">
          ←
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">에그데이</h1>
      </div>
      {children}
    </div>
  );
};

export default CreateLayout;
