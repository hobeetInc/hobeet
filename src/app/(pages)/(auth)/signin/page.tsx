"use client";

import browserClient from "@/utils/supabase/client";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  const supabase = browserClient;

  const handleSignInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      });
    } catch (err) {
      console.log("Google 로그인 에러", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[390px] h-[844px]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">hobeet</h1>
        <p className="text-lg font-light">우리들만의 취미공유</p>
      </div>

      <div className="space-y-4 w-full px-10">
        <button className="w-full py-4 bg-gray-300 text-center rounded-lg" onClick={handleSignInWithGoogle}>
          구글로 시작하기
        </button>
        <button className="w-full py-4 bg-gray-300 text-center rounded-lg">카카오로 시작하기</button>
        <button className="w-full py-4 bg-gray-300 text-center rounded-lg">이메일로 시작하기</button>
        <div className="flex flex-col items-center justify-center">
          <Link href={"/"} className="mb-4">
            회원가입하기
          </Link>
          <Link href={"/"}>둘러보기</Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
