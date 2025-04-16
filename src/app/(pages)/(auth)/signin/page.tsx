"use client";

import { Icon } from "@/components/ui/atoms/icons/Icon";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";

const SigninPage = () => {
  const supabase = browserClient;
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const handleSignInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline", // 사용자가 앱에 로그인하지 않은 상태에서도 앱이 사용자의 데이터에 접근할 수 있게 해주는 권한
            prompt: "consent" // 사용자 동의 화면 표시(매번)
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
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex justify-start w-full h-12">
        <div className="w-12 h-12 flex justify-center items-center">
          <Link href="/">
            <HiOutlineChevronLeft className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="lg:flex lg:flex-col lg:items-center lg:justify-between lg:h-[545px] lg:w-[480px] lg:mt-[20%]">
        <div className="fixed lg:relative top-[25vh] lg:top-0 left-1/2 lg:left-auto -translate-x-1/2 lg:transform-none flex flex-col items-center">
          <h1 className="text-[#0c0c0c] text-center text-2xl font-black leading-normal lg:text-[32px] lg:w-[223px] lg:h-[43px] lg:leading-[43.2px]">
            EGG FRIENDS
          </h1>
          <Text variant="body_medium-16" className="text-gray-900 lg:text-body_medium-18">
            함께라서 더 즐거운 우리
          </Text>
        </div>

        <div className="fixed lg:relative top-[35vh] lg:top-0 lg:-mt-10 left-1/2 lg:left-auto -translate-x-1/2 lg:transform-none">
          <div className="flex items-center">
            <div className="w-[90px] h-[90px] z-10">
              <Icon name="whiteEgg" />
            </div>
            <div className="w-[90px] h-[90px] -ml-2">
              <Icon name="yellowEgg" />
            </div>
          </div>
        </div>

        <div className="fixed lg:relative lg:mt-10 bottom-[20vh] -translate-x-1/2 lg:bottom-0 w-full max-w-[480px] px-4 lg:p-0 lg:transform-none">
          <button
            onClick={handleSignInWithGoogle}
            className="w-full flex items-center px-7 py-3.5 mb-3 bg-white border border-gray-100 rounded-[27px]"
          >
            <Image width={24} height={24} src="/asset/Logo/icon-google.png" alt="Google Icon" />
            <Text as="span" variant="subtitle-16" className="flex-1 text-center text-gray-900">
              구글로 시작하기
            </Text>
          </button>

          <button
            onClick={handleSignInWithKakao}
            className="w-full flex items-center px-7 py-3.5 mb-3 bg-[#fcec4e] rounded-[27px]"
          >
            <Image width={24} height={24} src="/asset/Logo/icon-kakao.png" alt="Kakao Icon" />
            <Text variant="subtitle-16" className="flex-1 text-center text-gray-900">
              카카오로 시작하기
            </Text>
          </button>

          <button
            onClick={() => alert("서비스 준비 중입니다.")}
            className="w-full flex items-center px-7 py-3.5 bg-gray-50 rounded-[27px]"
          >
            <Image width={24} height={24} src="/asset/Logo/Message-Filled.png" alt="Email Icon" />
            <Text variant="subtitle-16" className="flex-1 text-center text-gray-900">
              이메일로 시작하기
            </Text>
          </button>
        </div>

        <div className="fixed lg:relative bottom-[13vh] lg:bottom-0 left-1/2 lg:left-auto -translate-x-1/2 lg:transform-none text-center">
          <button className="text-gray-900 flex" onClick={() => alert("서비스 준비 중입니다.")}>
            <Text variant="body_medium-14">이메일로 간편하게 회원가입</Text>
            <span className="h-[20px] ml-[2px] mb-[1px]">👉</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
