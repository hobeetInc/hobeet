"use client";

import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";
import { useRouter } from "next/navigation";
import Text from "@/components/uiComponents/TextComponents/Text";
import { FaCamera } from "react-icons/fa6";
import { signOut } from "../../_api/logout";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);
  const { profileQuery } = useProfile(userId);

  if (profileQuery.isLoading) return <div>로딩중...</div>;
  if (profileQuery.error) return <div>프로필 정보 처리 중 오류</div>;

  const { user_name: userName, user_profile_img: userProfileImg } = profileQuery.data;

  return (
    <div className="max-w-md mx-auto p-4">
      <div
        className="flex items-center bg-primary-200 p-4 rounded-lg mb-6 justify-between cursor-pointer"
        onClick={() => router.push("/mypage/profile/profileUpdate")}
      >
        <div className="relative w-[78px] h-[78px]">
          <div className="w-full h-full rounded-full overflow-hidden">
            {userProfileImg ? (
              <Image
                src={userProfileImg}
                alt="프로필 이미지"
                width={78}
                height={78}
                className="object-cover w-[78px] h-[78px]"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <input type="file" id="profileImg" className="hidden" />

          <span className="absolute w-[30px] h-[30px] mt-9 left-[48px] top-[12px] bg-white rounded-full border border-solid border-gray-50 flex items-center justify-center z-10">
            <FaCamera />
          </span>
        </div>
        <div className="ml-4 flex-1">
          <Text variant="subtitle-18" className="text-gray-800 text-left">
            {userName}
          </Text>
        </div>
        <span className="text-gray-500 w-[16px] h-[16px]">
          <SlArrowRight />
        </span>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => router.push("/mypage/profile/wishClubList")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">내가 찜한 모임</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => router.push("/mypage/profile/paymentDetails")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">내 결제 내역</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => router.push("/mypage/profile/inquiry")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">문의하기</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => signOut()}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">로그아웃</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
