"use client";

import { useAuth } from "@/app/store/AuthContext";
import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const InsertUserInfo = () => {
  const supabase = browserClient;
  const router = useRouter();
  const { setUserId, setUserEmail, setUserGender, setUserAge, setUserProfileImg, setUserName, setUserBirth } =
    useAuth();
  useEffect(() => {
    const insertUserInfo = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const { data: loginUser, error: loginUserError } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (loginUserError) {
        console.log("회원정보를 가져오지 못했습니다", loginUserError);
      }

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

  return <div>...로딩중</div>;
};

export default InsertUserInfo;
