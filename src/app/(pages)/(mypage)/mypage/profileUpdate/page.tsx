"use client";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { sanitizeFileName } from "@/utils/sanitizeFileName";
// import { useAuth } from "@/app/store/AuthContext";
import { FaCamera } from "react-icons/fa6";

const ProfileEditPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [provider, setProvider] = useState("");
  const [userId, setUserId] = useState("");
  // const { userId, userEmail, userName, userGender, userProfileImg, userBirth, setUserProfileImg } = useAuth();
  // const [tempProfileImg, setTempProfileImg] = useState("");

  const supabase = browserClient;

  // useEffect(() => {
  //   setTempProfileImg(userProfileImg);
  // }, [userProfileImg]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const userId = data?.user.id;
      setUserId(userId);
      const {data: userData} = await supabase.from("user").select("*").eq("user_id", userId).single();
      const userEmail = userData?.user_email;
      setEmail(userEmail);
      const userName = userData?.user_name;
      setUserName(userName);
      const userGender = userData?.user_gender;
      setUserGender(userGender);
      const userProfileImg = userData?.user_profile_img;
      setUserProfileImg(userProfileImg);
      const userBirth = userData?.user_birth;
      setUserBirth(userBirth);
      if (error) {
        console.log("회원 정보를 불러오는 중 오류가 발생했습니다.");
      }
      const provider = data.user?.app_metadata.provider;
      setProvider(provider);
    };

    getUser();
  }, []);

  // useEffect(() => {
  //   if (userEmail) setEmail(userEmail);
  // }, [userEmail]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserProfileImg(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const sanitizedFileName = sanitizeFileName(file.name);
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`public/${userId}/${sanitizedFileName}`, file);

      if (uploadError) {
        console.error("이미지 업로드 실패:", uploadError.message);
        return;
      }

      const uploadedImageUrl = supabase.storage.from("avatars").getPublicUrl(`public/${userId}/${sanitizedFileName}`)
        .data.publicUrl;

      const { error: updateError } = await supabase
        .from("user")
        .update({
          user_profile_img: uploadedImageUrl
        })
        .eq("user_id", userId);

      if (updateError) {
        console.error("프로필 업데이트 실패:", updateError.message);
        return;
      }

      setUserProfileImg(uploadedImageUrl);
      alert("프로필 이미지가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("이미지 처리 중 오류 발생:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-5">내 프로필 수정</h1>

      <div className="relative flex justify-center mb-5">
        <div className="relative w-[78px] h-[78px]">
          <div className="rounded-full overflow-hidden w-[78px] h-[78px]">
            <Image
              src={userProfileImg}
              alt="프로필 이미지"
              width={78}
              height={78}
              className="object-cover w-[78px] h-[78px]"
            />
          </div>
          <label
            htmlFor="profileImg"
            className="absolute w-[30px] h-[30px] left-[48px] top-[48px] bg-white rounded-full border border-[#f2f2f2] flex items-center justify-center cursor-pointer"
            style={{ border: "solid 1px #f2f2f2" }}
          >
            <FaCamera />
          </label>
          <input type="file" id="profileImg" className="hidden" onChange={handleImageChange} />
        </div>
      </div>

      <div className=" h-20 flex flex-col justify-start items-start gap-2 mb-[36px]">
        <label htmlFor="userName" className="text-[#0c0c0c] text-lg font-semibold leading-normal font-['Pretendard']">
          이름
        </label>

        <input
          id="userName"
          type="text"
          value={userName || ""}
          readOnly
          className="w-full h-12 pl-5 rounded-lg border border-[#d9d9d9] text-[#a5a5a5] text-sm font-normal leading-tight font-['Pretendard'] bg-[#f9f9f9]"
        />
      </div>

      <div className=" h-[105px] flex flex-col justify-start items-start gap-2 mb-[36px]">
        <label htmlFor="email" className="text-[#0c0c0c] text-lg font-semibold leading-normal font-['Pretendard']">
          이메일
        </label>

        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="w-full h-12 pl-5 rounded-lg border border-[#d9d9d9] text-[#a5a5a5] text-sm font-normal leading-tight font-['Pretendard'] bg-[#f9f9f9]"
        />

        <p className="text-[#0c0c0c] text-xs font-normal leading-[17.4px] font-['Pretendard'] mt-1">
          {`${provider}로 가입한 계정이에요`}
        </p>
      </div>

      <div className=" h-20 flex flex-col justify-start items-start gap-2 mb-[36px]">
        <label className="text-[#0c0c0c] text-lg font-semibold leading-normal font-['Pretendard']">성별</label>

        <div className="self-stretch flex justify-between items-center">
          <div
            className={`w-[173px] h-12 px-4 rounded-lg flex justify-center items-center gap-2.5 ${
              userGender === "남성"
                ? "border-2 border-solid border-[#fdb800] text-[#fdb800] font-semibold"
                : "border border-solid border-[#d9d9d9] text-neutral-800 font-normal"
            }`}
          >
            <span className="text-center text-sm font-['Pretendard'] leading-[18.90px]">남성</span>
          </div>

          <div
            className={`w-[173px] h-12 px-4 rounded-lg flex justify-center items-center gap-2.5 ${
              userGender === "여성"
                ? "border-2 border-solid border-[#fdb800] text-[#fdb800] font-semibold"
                : "border border-solid border-[#d9d9d9] text-neutral-800 font-normal"
            }`}
          >
            <span className="text-center text-sm font-['Pretendard'] leading-[18.90px]">여성</span>
          </div>
        </div>
      </div>

      <div className=" h-20 flex flex-col justify-start items-end gap-2">
        <label className="self-stretch text-[#0c0c0c] text-lg font-semibold leading-normal font-['Pretendard']">
          생년월일
        </label>

        <div className="self-stretch flex justify-start items-center gap-3">
          <div className="w-[111px] h-12 px-5 py-2.5 rounded-lg border border-solid border-[#d9d9d9] flex justify-end items-center gap-3">
            <span className="text-center text-[#a5a5a5] text-sm font-semibold leading-[18.90px] font-['Pretendard']">
              {userBirth ? userBirth.split("-")[0] : "----"}
            </span>
            <span className="text-center text-[#0c0c0c] text-sm font-semibold leading-[18.90px] font-['Pretendard']">
              년
            </span>
          </div>

          <div className="w-[111px] h-12 px-5 py-2.5 rounded-lg border border-solid border-[#d9d9d9] flex justify-end items-center gap-3">
            <span className="text-center text-[#a5a5a5] text-sm font-semibold leading-[18.90px] font-['Pretendard']">
              {userBirth ? userBirth.split("-")[1] : "--"}
            </span>
            <span className="text-center text-[#0c0c0c] text-sm font-semibold leading-[18.90px] font-['Pretendard']">
              월
            </span>
          </div>

          <div className="w-[111px] h-12 px-5 py-2.5 rounded-lg border border-solid border-[#d9d9d9] flex justify-end items-center gap-3">
            <span className="text-center text-[#a5a5a5] text-sm font-semibold leading-[18.90px] font-['Pretendard']">
              {userBirth ? userBirth.split("-")[2] : "--"}
            </span>
            <span className="text-center text-[#0c0c0c] text-sm font-semibold leading-[18.90px] font-['Pretendard']">
              일
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
