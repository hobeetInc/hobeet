"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OneTimeClubForm } from "../../../_types/ClubForm";
import browserClient from "@/utils/supabase/client";
import Category from "../../../_components/Category";

// 임시 유저 아이디
const userId: string = "56db247b-6294-498f-a3f7-0ce8d81c36fc";

const OneTimePage = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [formData, setFormData] = useState<OneTimeClubForm>({
    m_c_id: 0,
    s_c_id: 0,
    user_id: userId,
    one_time_club_name: "",
    one_time_club_date_time: "",
    one_time_club_location: "",
    one_time_club_limited: null,
    one_time_tax: 0,
    one_time_gender: null,
    one_time_age: null,
    one_time_image: null,
    one_time_club_introduction: ""
  });

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7);
    }
  };

  // 다음단계 버튼
  const handleNext = () => {
    if (step === 7) {
      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7);
    }
  };

  // 카테고리 토글 함수
  const handleCategoryToggle = (categoryId: number) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  // 중분류 카테고리 선택
  const handleSubCategorySelect = (mainId: number, subId: number) => {
    setFormData({
      ...formData,
      m_c_id: mainId,
      s_c_id: subId
    });
  };

  const handleSubmit = async () => {
    try {
      // supabase에 데이터 저장
      const { data, error } = await browserClient.from("one_time_club").insert([formData]);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("모임생성시 오류", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Category
            isOpen={openCategoryId}
            onSubSelect={handleSubCategorySelect}
            onToggle={handleCategoryToggle}
            selectedSubId={formData.s_c_id}
          />
        );
      case 2:
        return (
          <div>
            <h1>모임의 제목을 작성해 주세요</h1>
            <input type="text" className="border-2 border-black mt-4 w-[358px] h-[48px]" />
          </div>
        );
      case 3:
        return <></>;
      case 4:
        return <></>;
      case 5:
        return <></>;
      case 6:
        return <></>;
      case 7:
        return <></>;
    }
  };

  return (
    <div className="container">
      <div className="h-[48px] bg-pink-100">헤더 공간</div>
      <div className="m-4 flex flex-col gap-7">
        <button onClick={handleBack} className="w-6 h-6 border-black border-2">
          뒤
        </button>
        <div>{renderStep()}</div>
        <button onClick={handleNext} className="next-button">
          다음
        </button>
      </div>
    </div>
  );
};

export default OneTimePage;
