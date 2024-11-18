"use client";

import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import Text from "@/components/uiComponents/TextComponents/Text";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
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
  //TODO - 계란 이미지와 위 텍스트 위치 수정
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="fixed top-[209px] flex flex-col items-center">
        <h1 className="text-[#0c0c0c] text-2xl font-black">EGG FRIENDS</h1>
        <Text variant="body_medium-16" className="text-gray-900">
          함께라서 더 즐거운 우리
        </Text>
      </div>

      <div className="fixed top-[295px]">
        <div className="flex items-center">
          <div className="w-[90px] h-[90px] z-10">
            <Icon name="whiteEgg" />
          </div>
          <div className="w-[90px] h-[90px] -ml-2">
            <Icon name="yellowEgg" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-[129px] w-full px-4">
        <button
          onClick={handleSignInWithGoogle}
          className="w-full flex items-center px-7 py-3.5 mb-3 bg-white border border-gray-100 rounded-[27px]"
        >
          <Image width={24} height={24} src="/asset/icon-google.png" alt="Google Icon" />
          <Text as="span" variant="subtitle-16" className="flex-1 text-center text-gray-900">
            구글로 시작하기
          </Text>
        </button>

        <button
          onClick={handleSignInWithKakao}
          className="w-full flex items-center px-7 py-3.5 mb-3 bg-[#fcec4e] rounded-[27px]"
        >
          <Image width={24} height={24} src="/asset/icon-kakao.png" alt="Kakao Icon" />
          <Text variant="subtitle-16" className="flex-1 text-center text-gray-900">
            카카오로 시작하기
          </Text>
        </button>

        <button
          onClick={() => alert("서비스 준비 중입니다.")}
          className="w-full flex items-center px-7 py-3.5 bg-gray-50 rounded-[27px]"
        >
          <Image width={24} height={24} src="/asset/Message-Filled.png" alt="Email Icon" />
          <Text variant="subtitle-16" className="flex-1 text-center text-gray-900">
            이메일로 시작하기
          </Text>
        </button>
      </div>

      <div className="fixed bottom-[72px] text-center">
        <button className="text-gray-900 flex" onClick={() => alert("서비스 준비 중입니다.")}>
          <Text variant="body_medium-14">이메일로 간편하게 회원가입</Text>
          <span className="h-[20px] ml-[2px] mb-[1px]">👉</span>
        </button>
      </div>
    </div>
  );
};

export default SigninPage;
