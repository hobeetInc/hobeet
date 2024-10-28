"use client";

import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "./store/authStore";
import Link from "next/link";

export default function Home() {
  const { user_name } = useAuthStore();
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    } else {
      alert("지웠음");
    }
  };
  return (
    <div>
      홈 입니다.{user_name}
      <button className="bg-gray-400" onClick={handleLogout}>
        로그아웃
      </button>
      <Link className="bg-gray-400 ml-4" href={"/signin"}>
        로그인
      </Link>
    </div>
  );
}
