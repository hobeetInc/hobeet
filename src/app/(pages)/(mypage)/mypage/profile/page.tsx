// pages/mypage.js
"use client";

import { useAuth } from "@/app/store/AuthContext";
import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { logOut } from "../../_components/logout";

const ProfilePage = () => {
  const router = useRouter();
  const { userName, userProfileImg, setUserProfileImg } = useAuth();

  return (
    <div className="max-w-md mx-auto p-5">
      <div
        className="flex items-center bg-[#FFF1CC] p-4 rounded-lg mb-6 justify-between cursor-pointer"
        onClick={() => router.push("/mypage/profileUpdate")}
      >
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
          <Image src={userProfileImg} alt="프로필 이미지" width={64} height={64} className="object-cover w-16 h-16" />
          <input
            type="file"
            id="profileImg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUserProfileImg(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <div className="ml-4 flex-1">
          <h2 className="text-xl font-semibold text-gray-800 text-left">{userName}</h2>
        </div>
        <span className="text-gray-500 text-sm">
          <SlArrowRight />
        </span>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => router.push("/mypage/wishClubList")}
          className="flex items-center justify-between px-4 py-4 text-lg font-medium cursor-pointer border-solid border-b-[1px] border-gray-100"
        >
          내가 찜한 모임
          <span className="text-gray-500 text-sm">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => router.push("/mypage/paymentDetails")}
          className="flex items-center justify-between px-4 py-4 text-lg font-medium cursor-pointer border-solid border-b-[1px] border-gray-100"
        >
          내 결제 내역
          <span className="text-gray-500 text-sm">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => router.push("/mypage/inquiry")}
          className="flex items-center justify-between px-4 py-4 text-lg font-medium cursor-pointer border-solid border-b-[1px] border-gray-100"
        >
          문의하기
          <span className="text-gray-500 text-sm ">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => logOut()}
          className="flex items-center justify-between px-4 py-4 text-lg font-medium text-red-500 cursor-pointer border-solid border-b-[1px] border-gray-100"
        >
          로그아웃
          <span className="text-gray-500 text-sm ">
            <SlArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
