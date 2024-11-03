// pages/mypage.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/store/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";
import { logOut } from "../../_components/logout";

const ProfilePage = () => {
  const router = useRouter();
  const { userId, userName, userProfileImg, setUserProfileImg } = useAuth();
  const [attend, setAttend] = useState<number>();
  const supabase = browserClient;
  console.log(userId);

  useEffect(() => {
    const getUserAttend = async () => {
      const { data, error } = await supabase.from("user_attend").select("user_attend").eq("user_id", userId).single();

      if (error) {
        console.log("참여도를 불러오는 중 오류가 발생했습니다.");
      }

      setAttend(data?.user_attend);
    };

    getUserAttend();
  }, []);

  const handleReadyAlert = () => {
    alert("서비스 준비중입니다.");
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <div className="flex items-center mb-6">
        <div className="relative w-24 h-24 mr-4">
          <Image
            src={userProfileImg || "/default-avatar.png"}
            alt="프로필 이미지"
            width={96}
            height={96}
            className="rounded-full object-cover"
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
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{userName || "이름입니다"}</h2>
          <p className="text-gray-500">{`참여도 ${attend}`}</p>
          <button className="bg-slate-400" onClick={() => router.push("/mypage/profileUpdate")}>
            프로필수정
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        <div onClick={() => router.push("/")} className="py-4 text-lg cursor-pointer hover:bg-gray-100">
          내가 찜한 모임
        </div>
        <div
          onClick={() => router.push("/mypage/paymentDetails")}
          className="py-4 text-lg cursor-pointer hover:bg-gray-100"
        >
          내 결제 모임
        </div>
        <div onClick={handleReadyAlert} className="py-4 text-lg cursor-pointer hover:bg-gray-100">
          문의하기(챗봇)
        </div>
        <div onClick={() => logOut()} className="py-4 text-lg cursor-pointer hover:bg-gray-100">
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
