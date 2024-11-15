"use client";

import browserClient from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { sanitizeFileName } from "@/utils/sanitizeFileName";
import { useAuth } from "@/store/AuthContext";
import { FaCamera } from "react-icons/fa6";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import Text from "@/components/uiComponents/TextComponents/Text";
import DateScrollPicker from "../_components/DateScrollPicker";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";

const NAME_REGEX = /^[가-힣]{2,5}$/;

const SignupSecondPage = () => {
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [birthDateError, setBirthDateError] = useState("");

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

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
        user_profile_img: uploadedImageUrl,
        user_birth: userBirth
      })
      .eq("user_id", userId);

    if (error) {
      console.log("정보 업데이트 실패", error);
    } else {
      console.log("정보 업데이트 성공");
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      router.push("/signin");
    }
  };

  const checkFormCompletion = () => {
    if (birthYear && birthMonth && birthDay && userName && userGender) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  useEffect(() => {
    checkFormCompletion();
  }, [birthYear, birthMonth, birthDay, userName, userGender]);

  const years = [...Array(100)].map((_, i) => 2024 - i);
  const months = [...Array(12)].map((_, i) => i + 1);
  const days = [...Array(getDaysInMonth(Number(birthYear), Number(birthMonth)))].map((_, i) => i + 1);
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full h-12 bg-white items-center">
        <div className="left-0 m-3">
          <Link href="/signin">
            <HiOutlineChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex flex-grow justify-center">
          <Text variant="header-16" className="text-gray-900">
            회원가입
          </Text>
        </div>
        <div className="w-6 m-3"></div>
      </div>

      <div className=" mt-4 left-[16px] flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <Text variant="subtitle-18">프로필</Text>
          <div className="relative w-[78px] h-[78px] mt-2">
            <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden">
              {userProfileImg && (
                <Image
                  src={userProfileImg}
                  alt="프로필 이미지"
                  width={78}
                  height={78}
                  className="object-cover w-[78px] h-[78px]"
                />
              )}
            </div>
            <label
              htmlFor="profile-upload"
              className="absolute w-[30px] h-[30px] left-[48px] top-[48px] bg-white rounded-full border border-solid border-gray-50 flex items-center justify-center cursor-pointer"
            >
              <FaCamera />
            </label>
            <input id="profile-upload" type="file" className="hidden" onChange={handleImagePreview} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <Text variant="subtitle-18">이름</Text>
            <Text variant="subtitle-18" className="text-red">
              *
            </Text>
          </label>
          <input
            type="text"
            value={userName || ""}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요."
            className="w-full h-12 px-5 bg-gray-50 rounded-lg text-body-14 font-normal"
          />
          {nameError && (
            <Text variant="body-14" className="text-red">
              {nameError}
            </Text>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <Text variant="subtitle-18">성별</Text>
            <Text variant="subtitle-18" className="text-red">
              *
            </Text>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUserGender("남성")}
              className={`w-[173px] h-12 px-4 rounded-lg border-2 ${
                userGender === "남성"
                  ? "border-primary-500 text-primary-500 text-header-16"
                  : "border-gray-100 text-black text-subtitle-14"
              }`}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => setUserGender("여성")}
              className={`w-[173px] h-12 px-4 rounded-lg border-2 text-header-16 ${
                userGender === "여성"
                  ? "border-primary-500 text-primary-500 text-header-16"
                  : "border-gray-100 text-black text-subtitle-14"
              }`}
            >
              여성
            </button>
          </div>
          {genderError && (
            <Text variant="body-14" className="text-red">
              {genderError}
            </Text>
          )}
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="flex items-center">
            <Text variant="subtitle-18">생년월일</Text>
            <Text variant="subtitle-18" className="text-red">
              *
            </Text>
          </label>
          <div className="flex gap-3 ">
            <button
              type="button"
              onClick={() => setShowYearPicker(true)}
              className="w-[111px] h-12 px-5 rounded-lg border border-gray-100 text-end text-subtitle-14"
            >
              {birthYear ? `${birthYear}년` : "년"}
            </button>
            <button
              type="button"
              onClick={() => setShowMonthPicker(true)}
              className="w-[111px] h-12 px-5 rounded-lg border border-gray-100 text-end text-subtitle-14"
            >
              {birthMonth ? `${birthMonth}월` : "월"}
            </button>
            <button
              type="button"
              onClick={() => setShowDayPicker(true)}
              className="w-[111px] h-12 px-5 rounded-lg border border-gray-100 text-end text-subtitle-14"
            >
              {birthDay ? `${birthDay}일` : "일"}
            </button>
          </div>
          {birthDateError && (
            <Text variant="body-14" className="text-red">
              {birthDateError}
            </Text>
          )}

          {showYearPicker && (
            <DateScrollPicker
              values={years}
              selectedValue={Number(birthYear)}
              onSelect={(value) => setBirthYear(String(value))}
              suffix="년"
              onClose={() => setShowYearPicker(false)}
            />
          )}

          {showMonthPicker && (
            <DateScrollPicker
              values={months}
              selectedValue={Number(birthMonth)}
              onSelect={(value) => setBirthMonth(String(value))}
              suffix="월"
              onClose={() => setShowMonthPicker(false)}
            />
          )}

          {showDayPicker && (
            <DateScrollPicker
              values={days}
              selectedValue={Number(birthDay)}
              onSelect={(value) => setBirthDay(String(value))}
              suffix="일"
              onClose={() => setShowDayPicker(false)}
            />
          )}
        </div>
      </div>

      <div className="fixed ml-[16px] mr-[16px] w-full bottom-0 mb-[54px] justify-items-center">
        {isFormComplete ? (
          <Button
            colorType="orange"
            borderType="rectangle"
            className="ml-[16px] mr-[16px] text-white text-subtitle-16"
            onClick={handleSubmit}
          >
            다음
          </Button>
        ) : (
          <Button disabled className="ml-[16px] mr-[16px] text-subtitle-16">
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupSecondPage;
