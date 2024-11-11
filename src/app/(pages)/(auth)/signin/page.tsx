"use client";

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
    
    <div className="flex flex-col items-center justify-center w-[390px] h-[844px]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">hobeet</h1>
        <p className="text-lg font-light">우리들만의 취미공유</p>
      </div>

      <div className="space-y-4 w-full px-10">
        <button
          className="w-full py-4 bg-white text-center rounded-[27px] border border-gray-300 flex items-center justify-center space-x-2"
          onClick={handleSignInWithGoogle}
        >
          <Image width={24} height={24} src="/asset/icon-google.png" className="w-6 h-6" alt="Google Icon" />
          <span className="text-gray-700">구글로 시작하기</span>
        </button>

        <button
          className="w-full py-4 bg-yellow-300 text-center rounded-[27px] flex items-center justify-center space-x-2"
          onClick={handleSignInWithKakao}
        >
          <Image width={24} height={24} src="/asset/icon-kakao.png" className="w-6 h-6" alt="Kakao Icon" />
          <span className="text-black">카카오로 시작하기</span>
        </button>

        <button className="w-full py-4 bg-gray-200 text-center rounded-[27px] flex items-center justify-center space-x-2">
          <Image width={24} height={24} src="/asset/Message-Filled.png" className="w-6 h-6" alt="Email Icon" />
          <span className="text-black">이메일로 시작하기</span>
        </button>

        <div className="flex flex-col items-center justify-center mt-4">
          <Link href={"/"} className="text-sm text-gray-500">
            이메일로 간편하게 회원가입👉
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
