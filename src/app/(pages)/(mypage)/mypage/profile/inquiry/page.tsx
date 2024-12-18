"use client";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import Link from "next/link";
import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";

const InquiryPage = () => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  return (
    <div className="max-w-md mx-auto bg-white p-6 border border-gray-200 rounded-lg lg:mx-5 lg:max-w-none lg:mt-10">
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center">
        {isLargeScreen ? (
          ""
        ) : (
          <div className="left-0 m-3">
            <Link href="/mypage/profile">
              <HiOutlineChevronLeft className="w-6 h-6" />
            </Link>
          </div>
        )}

        <div className="flex flex-grow items-center justify-center lg:py-5 lg:mt-[300px]">
          <Text variant={isLargeScreen ? "header-20" : "header-16"} className="text-gray-900 mt-10">
            문의하기
          </Text>
        </div>
      </div>

      <div className="mt-[60px] lg:w-full lg:mt-0">
        <div className="mb-6 mt-10">
          <h1 className="font-bold text-gray-800 mb-4 lg:mb-6">{`[운영 관련 안내]`}</h1>
          <h2 className="text-sm font-bold text-gray-800 mb-2 ml-1">1. 탈퇴 및 강퇴</h2>
          <p className="text-sm text-gray-700 leading-relaxed ml-[18px]">
            커뮤니티 회원의 자발적인 탈퇴나 커뮤니티 정책 위반에 따른 강퇴에 관한 사항은 운영진이 직접 관리합니다.
            <br />
            필요 시 운영진에게 문의해 주시기 바랍니다.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 mb-2 ml-1">2. 비밀번호 수정</h2>
          <p className="text-sm text-gray-700 leading-relaxed ml-[18px]">
            회원님의 안전한 이용을 위해 비밀번호 변경을 권장드리며,
            <br />
            비밀번호 수정과 관련된 문의는 언제든 운영진에게 연락주시면 도와드리겠습니다.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 mb-2 ml-1">3. 기타 문의사항</h2>
          <p className="text-sm text-gray-700 leading-relaxed ml-[18px]">
            위의 사항을 제외한 다른 궁금한 점이나 문제가 있는 경우, 운영진에게 문의해 주세요.
            <br />
            최대한 신속히 답변드리도록 하겠습니다.
          </p>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          커뮤니티의 원활한 운영을 위해 회원 여러분의 협조 부탁드리며,
          <br />
          운영진은 언제나 여러분의 편리한 이용을 위해 최선을 다하겠습니다. 감사합니다.
        </p>

        <div className="mt-4 text-center lg:py-4">
          <p className="text-sm font-medium text-gray-800">
            문의 이메일 : <span className="text-[#007aff]">jang@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
