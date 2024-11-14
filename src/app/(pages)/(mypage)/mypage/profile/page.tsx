// pages/mypage.js
"use client";

// import { useAuth } from "@/app/store/AuthContext";
import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { logOut } from "../../_components/logout";
import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import Text from "@/components/uiComponents/TextComponents/Text";
import { FaCamera } from "react-icons/fa6";
import useScreenSizeStore from "@/app/store/useScreenSizeStore";

const ProfilePage = () => {
  const router = useRouter();
  // const { userName, userProfileImg, setUserProfileImg } = useAuth();
  const [userName, setUserName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  const supabase = browserClient;

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const userId = data?.user.id;

      const { data: userData } = await supabase.from("user").select("*").eq("user_id", userId).single();
      const userName = userData?.user_name;
      setUserName(userName);
      const userProfileImg = userData?.user_profile_img;
      setUserProfileImg(userProfileImg);

      if (error) {
        console.log("회원 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    getUser();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 lg:max-w-[1024px] lg:mx-0 lg:mt-[135px]">
      <div
        className="flex items-center bg-primary-200 p-4 rounded-lg mb-6 justify-between cursor-pointer lg:w-full lg:justify-start"
        onClick={() => router.push("/mypage/profileUpdate")}
      >
        <div className="relative w-[78px] h-[78px] rounded-full overflow-hidden ">
          <Image
            src={userProfileImg}
            alt="프로필 이미지"
            width={78}
            height={78}
            className="object-cover w-[78px] h-[78px]"
          />

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

          <span className="absolute w-[30px] h-[30px] mt-9 left-[43px] top-[13px] bg-white rounded-full border border-solid border-gray-50 flex items-center justify-center z-10">
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
          onClick={() => router.push("/mypage/wishClubList")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">내가 찜한 모임</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => router.push("/mypage/paymentDetails")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">내 결제 내역</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>
        <div
          onClick={() => router.push("/mypage/inquiry")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
        >
          <Text variant="body_medium-16">문의하기</Text>
          <span className="text-gray-500 w-[16px] h-[16px]">
            <SlArrowRight />
          </span>
        </div>

        {isLargeScreen ? (
          ""
        ) : (
          <div
            onClick={() => logOut()}
            className="flex items-center justify-between px-4 py-4 cursor-pointer border-solid border-b-[1px] border-gray-50"
          >
            <Text variant="body_medium-16">로그아웃</Text>
            <span className="text-gray-500 w-[16px] h-[16px]">
              <SlArrowRight />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
