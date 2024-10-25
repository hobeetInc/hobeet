"use client";

import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";

const sanitizeFileName = (fileName: string) => {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.]/g, "_");
};

const SignupSecondPage = () => {
  const [birthYear, setBirthYear] = useState("2000");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const router = useRouter();

  const supabase = browserClient;

  const {
    setUser_id,
    setUser_email,
    setUser_name,
    setUser_gender,
    setUser_age,
    setUser_profile_img,
    user_name,
    user_gender,
    user_profile_img
  } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        setUser_id(user.id);
        setUser_email(user.email || "");
        setUser_name(user.user_metadata?.full_name || "");
        setUser_profile_img(user.user_metadata?.avatar_url || "");
      }
    };

    fetchUser();
  }, [supabase, setUser_id, setUser_email, setUser_name, setUser_profile_img]);

  const calcAge = (birthYear: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser_profile_img(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfileFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = useAuthStore.getState().user_id;

    if (!userId) {
      console.log("사용자의 아이디를 찾을 수 없습니다.");
      return;
    }

    let uploadedImageUrl = user_profile_img;

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

        setUser_profile_img(uploadedImageUrl);
      }
    }

    const userAge = calcAge(Number(birthYear));
    setUser_age(userAge);

    const { data, error } = await supabase
      .from("user")
      .update({
        user_name,
        user_gender,
        user_age: userAge,
        user_profile_img: uploadedImageUrl
      })
      .eq("user_id", userId);
    console.log(data);

    if (error) {
      console.log("정보 업데이트 실패", error);
    } else {
      console.log("정보 업데이트 성공");
      router.push("/");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-5">회원가입</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-5">
          <label htmlFor="profileImg">
            <Image
              src={user_profile_img || "/default-avatar.png"}
              alt="프로필 이미지"
              width={96}
              height={96}
              className="rounded-full object-cover cursor-pointer"
            />
          </label>
          <input type="file" id="profileImg" className="hidden" onChange={handleImagePreview} />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">이름</label>
          <input
            type="text"
            onChange={(e) => setUser_name(e.target.value)}
            placeholder="이름을 입력해주세요."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">성별</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUser_gender("남")}
              className={`flex-1 py-2 rounded ${
                user_gender === "남" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => setUser_gender("여")}
              className={`flex-1 py-2 rounded ${
                user_gender === "여" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              여성
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">생년월일</label>
          <div className="flex gap-3">
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              {[...Array(90)].map((_, i) => (
                <option key={i} value={2024 - i}>
                  {2024 - i}
                </option>
              ))}
            </select>
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>
            <select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}일
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gray-400 text-white rounded hover:bg-black transition duration-200"
        >
          시작하기
        </button>
      </form>
    </div>
  );
};

export default SignupSecondPage;
