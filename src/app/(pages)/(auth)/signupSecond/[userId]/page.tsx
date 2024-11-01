"use client";

import browserClient from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { sanitizeFileName } from "@/utils/sanitizeFileName";
import { useAuth } from "@/app/store/AuthContext";

const NAME_REGEX = /^[가-힣]{2,5}$/;

const SignupSecondPage = () => {
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const router = useRouter();
  const params = useParams();
  const userIdParam = params.userId;
  const supabase = browserClient;

  const {
    setUserId,
    setUserEmail,
    setUserName,
    setUserGender,
    setUserAge,
    setUserProfileImg,
    setUserBirth,
    userId,
    userName,
    userGender,
    userProfileImg
  } = useAuth();

  useEffect(() => {
    const logOut = async () => {
      await supabase.auth.signOut();
      localStorage.removeItem("loginInfoStore");
    };

    logOut();
  }, []);

  const validateName = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return "이름을 입력해주세요.";
    if (!NAME_REGEX.test(trimmedName)) return "이름은 한글 2~5자로 입력해야 합니다.";
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUserName(newName);
    setNameError(validateName(newName));
  };

  const validateGender = () => {
    if (!userGender) return "성별을 선택해주세요.";
    return "";
  };

  const validateBirthDate = () => {
    if (!birthYear || !birthMonth || !birthDay) return "생년월일을 모두 선택해주세요.";
    const today = new Date();
    const selectedDate = new Date(Number(birthYear), Number(birthMonth) - 1, Number(birthDay));
    if (selectedDate > today) return "오늘 이후의 날짜는 선택할 수 없습니다.";
    return "";
  };

  const calcAge = (birthYear: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear + 1;
  };

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

  useEffect(() => {
    const daysInSelectedMonth = birthYear && birthMonth ? getDaysInMonth(Number(birthYear), Number(birthMonth)) : 31;
    if (Number(birthDay) > daysInSelectedMonth) {
      setBirthDay(String(daysInSelectedMonth));
    }
  }, [birthYear, birthMonth, birthDay]);

  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      setBirthDateError("");

      const formattedMonth = birthMonth.padStart(2, "0");
      const formattedDay = birthDay.padStart(2, "0");

      setUserBirth(`${birthYear}-${formattedMonth}-${formattedDay}`);
    }
  }, [birthYear, birthMonth, birthDay]);

  const getDaysInMonth = (year: number, month: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month - 1];
  };

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.from("user").select("*").eq("user_id", userIdParam).single();

      if (userData) {
        setUserId(userData.user_id);
        setUserEmail(userData.user_email || "");
        setUserName(userData.user_name || "");
        setUserGender(userData.user_gender || "");
        setUserProfileImg(userData.user_profile_img || "");
      }
      console.log(userData);
    };

    fetchUser();
  }, [supabase, userIdParam, setUserId, setUserEmail, setUserName, setUserGender, setUserProfileImg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameValidation = validateName(userName || "");
    const genderValidation = validateGender();
    const birthDateValidation = validateBirthDate();

    setNameError(nameValidation);
    setGenderError(genderValidation);
    setBirthDateError(birthDateValidation);

    if (nameValidation || genderValidation || birthDateValidation) return;

    if (!userId) {
      console.log("사용자의 아이디를 찾을 수 없습니다.");
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

        setUserProfileImg(uploadedImageUrl);
      }
    }

    const userAge = calcAge(Number(birthYear));
    setUserAge(userAge);

    const { error } = await supabase
      .from("user")
      .update({
        user_name: userName,
        user_gender: userGender,
        user_age: userAge,
        user_profile_img: uploadedImageUrl
      })
      .eq("user_id", userId);

    const { error: userAttendError } = await supabase.from("user_attend").insert({
      user_id: userId
    });

    if (error || userAttendError) {
      console.log("정보 업데이트 실패", error);
    } else {
      console.log("정보 업데이트 성공");
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      router.push("/signin");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-5">회원가입</h1>

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
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요."
            className="w-full p-2 border border-gray-300 rounded"
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">성별</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setUserGender("남성");
                setGenderError("");
              }}
              className={`flex-1 py-2 rounded ${
                userGender === "남성" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => {
                setUserGender("여성");
                setGenderError("");
              }}
              className={`flex-1 py-2 rounded ${
                userGender === "여성" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              여성
            </button>
          </div>
          {genderError && <p className="text-red-500 text-sm mt-1">{genderError}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">생년월일</label>
          <div className="flex gap-3">
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">연도</option>
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
              <option value="">월</option>
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
              <option value="">일</option>
              {[...Array(getDaysInMonth(Number(birthYear), Number(birthMonth)))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}일
                </option>
              ))}
            </select>
          </div>
          {birthDateError && <p className="text-red-500 text-sm mt-1">{birthDateError}</p>}
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
