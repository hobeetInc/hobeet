"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useAuth } from "./store/AuthContext";
import { useAuthStore } from "./store/authStore";

export default function Home() {
  const { userName } = useAuth();
  const reset = useAuthStore((state) => state.reset);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    reset();
    if (error) {
      console.log(error);
      return;
    } else {
      alert("지웠음");
    }
  };

  return (
    <div>
      홈 입니다.{userName}
      <button className="bg-gray-400" onClick={handleLogout}>
        로그아웃
      </button>
      <Link className="bg-gray-400 ml-4" href={"/signin"}>
        로그인
      </Link>
    </div>
  );
}
