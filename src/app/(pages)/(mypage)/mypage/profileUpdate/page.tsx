"use client";

import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { sanitizeFileName } from "@/utils/sanitizeFileName";
import { useAuth } from "@/app/store/AuthContext";

const ProfileEditPage = () => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");

  const router = useRouter();
  const supabase = browserClient;

  const { userId, userEmail, userName, userGender, userProfileImg, userBirth, setUserEmail, setUserProfileImg } =
    useAuth();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("회원 정보를 불러오는 중 오류가 발생했습니다.");
      }

      const provider = data.user?.app_metadata.provider;
      setProvider(provider || "");
    };

    getUser();
  }, []);

  useEffect(() => {
    if (userEmail) setEmail(userEmail);
  }, [userEmail]);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfileFile(file);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(newEmail.includes("@") ? "" : "유효한 이메일 주소를 입력해주세요.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("사용자 ID를 찾을 수 없습니다.");
      return;
    }

    let uploadedImageUrl = userProfileImg;

    if (profileFile) {
      const sanitizedFileName = sanitizeFileName(profileFile.name);
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`public/${userId}/${sanitizedFileName}`, profileFile);

      if (error) {
        console.error("이미지 업로드 실패:", error.message);
        return;
      } else {
        uploadedImageUrl = supabase.storage.from("avatars").getPublicUrl(`public/${userId}/${sanitizedFileName}`)
          .data.publicUrl;
        setUserProfileImg(uploadedImageUrl || "");
      }
    }

    const { error } = await supabase
      .from("user")
      .update({
        user_email: email,
        user_profile_img: uploadedImageUrl
      })
      .eq("user_id", userId);

    if (error) {
      console.error("정보 업데이트 실패:", error.message);
    } else {
      setUserEmail(email);
      alert("프로필 정보가 성공적으로 업데이트되었습니다.");
      router.push("/profile");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-5">내 프로필 수정</h1>

      <form onSubmit={handleSubmit}>
        <div className="relative flex justify-center mb-5">
          <div className="relative w-32 h-32">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src={userProfileImg || "/default-avatar.png"}
                alt="프로필 이미지"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <label
              htmlFor="profileImg"
              className="absolute bottom-0 right-0 bg-gray-200 px-2 py-2 rounded-lg shadow cursor-pointer"
              style={{ transform: "translate(6%, 20%)" }}
            >
              수정
            </label>
            <input type="file" id="profileImg" className="hidden" onChange={handleImagePreview} />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">이름</label>
          <input
            type="text"
            value={userName || ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">이메일</label>
          <input
            type="email"
            value={email}
            readOnly
            onChange={handleEmailChange}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          <p className="text-sm text-gray-500 mt-1">{`${provider}로 가입한 계정이에요`}</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">생년월일</label>
          <input
            type="text"
            value={userBirth ? userBirth : ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">성별</label>
          <div className="flex gap-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="남성"
                checked={userGender === "남성"}
                readOnly
                disabled
                className="mr-2"
              />
              남성
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="여성"
                checked={userGender === "여성"}
                readOnly
                disabled
                className="mr-2"
              />
              여성
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gray-400 text-white rounded hover:bg-black transition duration-200"
        >
          완료하기
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
