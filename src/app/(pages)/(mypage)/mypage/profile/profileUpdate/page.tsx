"use client";

import Image from "next/image";
import React from "react";
import { FaCamera } from "react-icons/fa6";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/ui/atoms/text/Text";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "@/hooks/utils/features/profile/useProfile";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";

const ProfileEditPage = () => {
  const { userId, userEmail, userName, userGender, userBirth, userProfileImg, setUserProfileImg } = useAuthStore();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { providerQuery, uploadImageMutation } = useProfile(userId);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserProfileImg(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      await uploadImageMutation.mutateAsync({ userId, file });
      alert("프로필 이미지가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("이미지 처리 중 오류 발생:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  if (providerQuery.isLoading) return <LoadingSpinner />;
  if (providerQuery.error) return <div>프로필 정보 처리 중 오류</div>;

  return (
    <div className="w-full flex flex-col items-center lg:mt-6">
      <div className="flex w-full h-12 bg-white items-center lg:text-center">
        {isLargeScreen ? (
          ""
        ) : (
          <div className="left-0 m-3">
            <Link href="/mypage/profile">
              <HiOutlineChevronLeft className="w-6 h-6" />
            </Link>
          </div>
        )}

        <div className="flex flex-grow justify-center lg:w-full lg:text-center lg:py-5 lg:mb-2">
          <Text variant={isLargeScreen ? "header-20" : "header-16"} className="text-gray-900 lg:justify-center">
            내 프로필 수정
          </Text>
        </div>
      </div>

      <div className="relative flex justify-center mb-4">
        <div className="relative w-[78px] h-[78px]">
          <div className="rounded-full overflow-hidden w-[78px] h-[78px] mt-9">
            {userProfileImg ? (
              <Image
                src={userProfileImg}
                alt="프로필 이미지"
                width={78}
                height={78}
                className="object-cover w-[78px] h-[78px]"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <label
            htmlFor="profileImg"
            className="absolute w-[30px] h-[30px] mt-9 left-[48px] top-[48px] bg-white rounded-full border border-solid border-gray-50 flex items-center justify-center cursor-pointer"
          >
            <FaCamera />
          </label>
          <input type="file" id="profileImg" className="hidden" onChange={handleImageChange} />
        </div>
      </div>
      <div className="lg:mt-6">
        <div className="w-full flex flex-col justify-start items-start gap-2 my-[36px] lg:w-[480px] lg:my-10">
          <Text variant="subtitle-18" className="text-gray-900 ml-4 lg:ml-0">
            이름
          </Text>
          <div className="w-[358px] h-12 mx-4 lg:w-full lg:mx-0">
            <input
              id="userName"
              type="text"
              value={userName || "이름 정보가 없습니다"}
              readOnly
              className="flex-1 w-[358px] h-12 pl-5 rounded-lg border border-gray-100 text-gray-300 text-body-14 bg-gray-50 lg:w-[480px]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-2 mb-[36px] lg:w-full lg:mb-10">
          <Text variant="subtitle-18" className="text-gray-900 ml-4 lg:ml-0">
            이메일
          </Text>
          <div className="w-[358px] h-12 mx-4 lg:mx-0">
            <input
              id="email"
              type="email"
              value={userEmail || "이메일 정보가 없습니다"}
              readOnly
              className="flex-1 w-[358px] h-12 pl-5 rounded-lg border border-gray-100 text-gray-300 text-body-14 bg-gray-50 lg:w-[480px]"
            />
          </div>
          <Text className="text-gray-900 text-xs font-normal leading-[17.4px] ml-4 lg:ml-0">
            {`${providerQuery.data}로 가입한 계정이에요`}
          </Text>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-2 mb-[36px] lg:mb-10">
          <Text variant="subtitle-18" className="text-gray-900 ml-4 lg:ml-0">
            성별
          </Text>
          <div className="flex gap-3 mx-4 lg:mx-0">
            <div
              className={`w-[173px] h-12 rounded-lg flex justify-center items-center lg:w-[234px] lg:px-4 ${
                userGender === "남성"
                  ? "border-2 border-solid border-[#fdb800] text-[#fdb800] font-semibold"
                  : "border border-solid border-[#d9d9d9] text-neutral-800 font-normal"
              }`}
            >
              <Text variant="subtitle-14" className="text-center">
                남성
              </Text>
            </div>
            <div
              className={`w-[173px] h-12 rounded-lg flex justify-center items-center lg:w-[234px] lg:px-4 ${
                userGender === "여성"
                  ? "border-2 border-solid border-[#fdb800] text-[#fdb800] font-semibold"
                  : "border border-solid border-[#d9d9d9] text-neutral-800 font-normal"
              }`}
            >
              <Text variant="subtitle-14" className="text-center">
                여성
              </Text>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-2">
          <Text className="text-gray-900 text-lg font-semibold leading-normal ml-4 lg:ml-0">생년월일</Text>
          <div className="self-stretch flex justify-start items-center gap-3 ml-4 lg:ml-0">
            <div className="w-[111px] h-12 px-5 py-2.5 rounded-lg border border-solid border-gray-100 flex justify-end items-center gap-3 lg:w-[152px]">
              <Text variant="subtitle-14" className="text-center text-gray-100">
                {userBirth ? userBirth.split("-")[0] : "----"}
              </Text>
              <Text variant="subtitle-14" className="text-center text-gray-900 ">
                년
              </Text>
            </div>
            <div className="w-[111px] h-12 px-5 py-2.5 rounded-lg border border-solid border-gray-100 flex justify-end items-center gap-3 lg:w-[152px]">
              <Text variant="subtitle-14" className="text-center text-gray-100 ">
                {userBirth ? userBirth.split("-")[1] : "--"}
              </Text>
              <Text variant="subtitle-14" className="text-center text-gray-900 ">
                월
              </Text>
            </div>
            <div className="w-[111px] h-12 px-5 py-2.5 rounded-lg border border-solid border-gray-100 flex justify-end items-center gap-3 lg:w-[152px]">
              <Text variant="subtitle-14" className="text-center text-gray-100 ">
                {userBirth ? userBirth.split("-")[2] : "--"}
              </Text>
              <Text variant="subtitle-14" className="text-center text-gray-900 ">
                일
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
