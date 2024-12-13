"use client";

import { useAuth } from "@/store/AuthContext";
import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";
const InsertUserInfo = () => {
  const supabase = browserClient;
  const router = useRouter();
  // AuthContext에서 사용자 정보 설정 함수들을 가져옴
  const { setUserId, setUserEmail, setUserGender, setUserAge, setUserProfileImg, setUserName, setUserBirth } =
    useAuth();

  // 현재 인증된 사용자 정보 가져오기
  useEffect(() => {
    const insertUserInfo = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      // 사용자 DB 정보 조회
      const { data: loginUser, error: loginUserError } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (loginUserError) {
        console.log("회원정보를 가져오지 못했습니다", loginUserError);
      }

      // 전역 상태에 사용자 정보 저장
      setUserId(loginUser.user_id);
      setUserEmail(loginUser.user_email);
      setUserGender(loginUser.user_gender);
      setUserAge(loginUser.user_age);
      setUserProfileImg(loginUser.user_profile_img);
      setUserName(loginUser.user_name);
      setUserBirth(loginUser.user_birth);

      router.push("/");
    };

    insertUserInfo();
  }, []);

  return <LoadingSpinner />;
};

export default InsertUserInfo;
