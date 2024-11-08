"use client";

import { Icon } from "@/components/uiComponents/icon";
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
    <div className="flex flex-col items-center justify-start w-[390px] min-h-[844px] p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-black text-[#0c0c0c]  mt-[160px] mb-2">EGG FRIENDS</h1>
        <p className="text-base font-medium text-[#0c0c0c]">함께라서 더 즐거운 우리</p>
        <div className="h-[90px] w-full mb-8  mt-[32px] relative flex justify-center">
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

      <div className="w-full space-y-4 px-4">
        <button
          onClick={handleSignInWithGoogle}
          className="w-full flex items-center justify-center space-x-3 px-4 py-4 bg-white rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <Image width={24} height={24} src="/asset/icon-google.png" alt="Google Icon" className="w-6 h-6" />
          <span className="text-gray-700 font-medium">구글로 시작하기</span>
        </button>

        <button
          onClick={handleSignInWithKakao}
          className="w-full flex items-center justify-center space-x-3 px-4 py-4 bg-yellow-300 rounded-full hover:bg-yellow-400 transition-colors"
        >
          <Image width={24} height={24} src="/asset/icon-kakao.png" alt="Kakao Icon" className="w-6 h-6" />
          <span className="text-black font-medium">카카오로 시작하기</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-3 px-4 py-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <Image width={24} height={24} src="/asset/Message-Filled.png" alt="Email Icon" className="w-6 h-6" />
          <span className="text-black font-medium">이메일로 시작하기</span>
        </button>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            이메일로 간편하게 회원가입👉
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
