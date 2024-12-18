"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/AuthContext";
import { FaCamera } from "react-icons/fa6";
import { Button } from "@/components/ui/atoms/buttons/ButtonCom";
import Text from "@/components/ui/atoms/text/Text";
import DateScrollPicker from "../_components/DateScrollPicker";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";
import { fetchUser } from "../../_api/fetchUser";
import { uploadProfileImage } from "../../_api/uploadProfile";
import { updateUser } from "../../_api/updateUser";
import { signOut } from "../../_api/logOut";
import { validateBirthDate, validateGender, validateName } from "@/utils/signup/validation";
import {
  calcAge,
  formatBirthDate,
  getDaysInMonth,
  getDaysList,
  getMonthsList,
  getYearsList
} from "@/utils/signup/birthDate";
import useScreenSizeStore from "@/store/useScreenSizeStore";

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
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const router = useRouter();
  const params = useParams();
  const userIdParam = params.userId;

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
    const initializeSignup = async () => {
      try {
        await signOut(); // 기존 정보 클리어
        const userData = await fetchUser(userIdParam as string);

        // 사용자 정보를 토대로 전역상태 초기화
        if (userData) {
          setUserId(userData.user_id);
          setUserEmail(userData.user_email || "");
          setUserName(userData.user_name || "");
          setUserGender(userData.user_gender || "");
          setUserProfileImg(userData.user_profile_img || "");
        }
      } catch (error) {
        console.error("유저 정보 초기화 중 오류 발생:", error);
        alert("초기화 중 오류가 발생했습니다. 다시 시도해주세요.");
        router.push("/signin");
      }
    };

    initializeSignup();
  }, [userIdParam, setUserId, setUserEmail, setUserName, setUserGender, setUserProfileImg, router]);

  // 선택된 년도와 월에 따라 해당 월의 총 일수 계산
  useEffect(() => {
    const daysInSelectedMonth = birthYear && birthMonth ? getDaysInMonth(Number(birthYear), Number(birthMonth)) : 31;
    if (Number(birthDay) > daysInSelectedMonth) {
      setBirthDay(String(daysInSelectedMonth));
    }
  }, [birthYear, birthMonth, birthDay]);

  useEffect(() => {
    // 년, 월, 일이 모두 선택되었을 때
    if (birthYear && birthMonth && birthDay) {
      setBirthDateError("");
      // YYYY-MM-DD 형식으로 날짜 포맷팅
      setUserBirth(formatBirthDate(birthYear, birthMonth, birthDay));
    }
  }, [birthYear, birthMonth, birthDay]);

  // 필수 입력값들이 모두 있는지 확인
  useEffect(() => {
    setIsFormComplete(Boolean(birthYear && birthMonth && birthDay && userName && userGender));
  }, [birthYear, birthMonth, birthDay, userName, userGender]);

  // 이름 입력 처리
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUserName(newName);
    setNameError(validateName(newName));
  };

  // 이미지 업로드 처리
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const nameValidation = validateName(userName || "");
    const genderValidation = validateGender(userGender || "");
    const birthDateValidation = validateBirthDate(birthYear, birthMonth, birthDay);

    setNameError(nameValidation);
    setGenderError(genderValidation);
    setBirthDateError(birthDateValidation);

    if (nameValidation || genderValidation || birthDateValidation) return;

    if (!userId) {
      console.log("사용자의 아이디를 찾을 수 없습니다.");
      return;
    }

    try {
      let uploadedImageUrl = userProfileImg;

      if (profileFile) {
        uploadedImageUrl = await uploadProfileImage(userId, profileFile);
        setUserProfileImg(uploadedImageUrl);
      }

      // 생년월일 토대로 나이 계산
      const userAge = calcAge(Number(birthYear));
      setUserAge(userAge);

      // 사용자 정보 업데이트
      await updateUser(userId, {
        user_name: userName || "",
        user_gender: userGender || "",
        user_age: userAge,
        user_profile_img: uploadedImageUrl,
        user_birth: userBirth
      });

      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      router.push("/signin");
    } catch (error) {
      console.error("회원가입 처리 중 오류 발생:", error);
      alert("회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const years = getYearsList();
  const months = getMonthsList();
  const days = getDaysList(Number(birthYear), Number(birthMonth));

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full h-12 bg-white items-center">
        {isLargeScreen ? (
          ""
        ) : (
          <div className="left-0 m-3">
            <Link href="/signin">
              <HiOutlineChevronLeft className="w-6 h-6" />
            </Link>
          </div>
        )}

        <div className="flex flex-grow justify-center lg:ml-5 lg:py-5 lg:mt-10">
          <Text variant={isLargeScreen ? "header-20" : "header-16"} className="text-gray-900">
            회원가입
          </Text>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-12 lg:relative lg:w-[480px] lg:mt-20 lg:gap-10">
        <div className="flex flex-col gap-2">
          {!isLargeScreen ? <Text variant="subtitle-18">프로필</Text> : ""}
          <div className="relative w-[78px] h-[78px] mt-2 lg:mt-0">
            <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden lg:w-[78px] lg:h-[78px]">
              {userProfileImg && (
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
              className={`w-[173px] h-12 px-4 rounded-lg border-2 lg:w-[234px] ${
                userGender === "남성"
                  ? "border-primary-500 text-primary-500 text-subtitle-14"
                  : "border-gray-100 text-black text-subtitle-14"
              }`}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => setUserGender("여성")}
              className={`w-[173px] h-12 px-4 rounded-lg border-2 lg:w-[234px] ${
                userGender === "여성"
                  ? "border-primary-500 text-primary-500 text-subtitle-14"
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

        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <Text variant="subtitle-18">생년월일</Text>
            <Text variant="subtitle-18" className="text-red">
              *
            </Text>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowYearPicker(true)}
              className="w-[111px] h-12 px-5 rounded-lg border border-gray-100 text-end text-subtitle-14 lg:w-[152px]"
            >
              {birthYear ? `${birthYear}년` : "년"}
            </button>
            <button
              type="button"
              onClick={() => setShowMonthPicker(true)}
              className="w-[111px] h-12 px-5 rounded-lg border border-gray-100 text-end text-subtitle-14 lg:w-[152px]"
            >
              {birthMonth ? `${birthMonth}월` : "월"}
            </button>
            <button
              type="button"
              onClick={() => setShowDayPicker(true)}
              className="w-[111px] h-12 px-5 rounded-lg border border-gray-100 text-end text-subtitle-14 lg:w-[152px]"
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

      <div className="fixed ml-[16px] mr-[16px] w-full bottom-0 mb-[54px] justify-items-center lg:static lg:w-[480px] lg:mb-0 lg:mt-16 lg:mx-auto">
        {isFormComplete ? (
          <Button
            colorType="orange"
            borderType="rectangle"
            className="ml-[16px] mr-[16px] text-white text-subtitle-16 lg:mx-0 lg:w-full"
            sizeType={isLargeScreen ? "web" : "large"}
            onClick={handleSubmit}
          >
            다음
          </Button>
        ) : (
          <Button
            borderType="rectangle"
            sizeType={isLargeScreen ? "web" : "large"}
            disabled
            className="ml-[16px] mr-[16px] text-subtitle-16 lg:mx-0 lg:w-full"
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupSecondPage;
