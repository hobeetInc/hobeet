"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OneTimeClubForm } from "../../../_types/ClubForm";
import browserClient from "@/utils/supabase/client";
import Category from "../../../_components/Category";
import ImageUpload from "../../../_components/ImageUpload";
import { uploadImage } from "../../../_api/supabase";
import DateTime from "../../../_components/DateTime";

// 임시 유저 아이디
const userId: string = "56db247b-6294-498f-a3f7-0ce8d81c36fc";

const OneTimePage = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
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

  const handleSubmit = async () => {
    try {
      let finalFormData = { ...formData };

      // formData의 이미지가 File 객체인 경우 업로드
      if (formData.one_time_image instanceof File) {
        // 이미지 업로드 후 URL 받아오기
        const imageUrl = await uploadImage(formData.one_time_image);

        // URL을 formData에 설정
        finalFormData = {
          ...finalFormData,
          one_time_image: imageUrl
        };
      }

      // supabase에 데이터 저장
      const { data, error } = await browserClient.from("one_time_club").insert([finalFormData]);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("모임생성시 오류", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Category formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <div>
            <h1 className="mb-4">모임의 제목을 작성해 주세요</h1>
            <input
              type="text"
              value={formData.one_time_club_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  one_time_club_name: e.target.value
                })
              }
              className="border-2 border-black mt-4 w-[358px] h-[48px] p-2"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h1 className="mb-4">모임을 소개해주세요</h1>
            <ImageUpload formData={formData} setFormData={setFormData} />
            <textarea
              value={formData.one_time_club_introduction}
              onChange={(e) => setFormData({ ...formData, one_time_club_introduction: e.target.value })}
              className="mt-4 p-2 border-2 border-black w-[358px] h-[218px]"
            />
          </div>
        );
      case 4:
        return <DateTime formData={formData} setFormData={setFormData} />;
      case 5:
        return <></>;
      case 6:
        return <></>;
      case 7:
        return <></>;
    }
  };

  // 다음단계 버튼
  const handleNext = () => {
    if (step === 1 && formData.s_c_id === 0) {
      alert("카테고리를 선택해주세요");
      return;
    }

    if (step === 2 && !formData.one_time_club_name.trim()) {
      alert("모임 제목을 입력해주세요");
      return;
    }

    if (step === 3) {
      if (!formData.one_time_image) {
        alert("이미지를 선택해주세요");
        return;
      }
      if (!formData.one_time_club_introduction.trim()) {
        alert("모임 소개글을 입력해주세요");
        return;
      }
    }

    if (step === 7) {
      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7);
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
