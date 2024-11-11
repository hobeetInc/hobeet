"use client";

import { Icon } from "@/components/uiComponents/Icon/Icon";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
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

  const handleSignInWithKakao = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      });
    } catch (err) {
      console.log("Kakao 로그인 에러", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start   p-6">
      <div className="flex flex-col items-center w-[174px] h-[176px] mb-[116px]">
        <h1 className="text-2xl font-black text-[#0c0c0c]  mt-[160px] mb-2">EGG FRIENDS</h1>
        <p className="text-base font-medium text-[#0c0c0c]">함께라서 더 즐거운 우리</p>
        <div className="h-[90px] w-full  mt-[32px] relative flex justify-center mb-[160px]">
          <div className="flex items-center">
            <div className="w-[90px] h-[90px] z-10">
              <Icon name="whiteEgg" />
            </div>
            <div className="w-[90px] h-[90px] -ml-2 ">
              <Icon name="yellowEgg" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[501px] left-[16px]  space-y-4">
        <button
          onClick={handleSignInWithGoogle}
          className="w-full flex items-center space-x-3 px-7 py-3.5 bg-white border border-[#f2f2f2] rounded-[27px] hover:bg-gray-50 transition"
        >
          <Image width={24} height={24} src="/asset/icon-google.png" alt="Google Icon" />
          <span className="flex-grow text-center text-black text-base font-semibold">구글로 시작하기</span>
        </button>

        <button
          onClick={handleSignInWithKakao}
          className="w-full flex items-center space-x-3 px-7 py-3.5 bg-[#fcec4e] rounded-[27px] hover:bg-yellow-400 transition"
        >
          <Image width={24} height={24} src="/asset/icon-kakao.png" alt="Kakao Icon" />
          <span className="flex-grow text-center text-black text-base font-semibold">카카오로 시작하기</span>
        </button>

        <button className="w-full flex items-center space-x-3 px-7 py-3.5 bg-[#f2f2f2] rounded-[27px] hover:bg-gray-300 transition">
          <Image width={24} height={24} src="/asset/Message-Filled.png" alt="Email Icon" />
          <span className="flex-grow text-center text-black text-base font-semibold">이메일로 시작하기</span>
        </button>
      </div>

      {/* 하단 링크 */}
      <div className="absolute left-[122px] top-[721px] text-xs font-medium text-black">
        <Link href="/" className="hover:underline">
          이메일로 간편하게 회원가입 👉
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;
