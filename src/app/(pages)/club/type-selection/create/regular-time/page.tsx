"use client";

import { useState } from "react";
import { RegularClubForm } from "../../../_types/ClubForm";
import { useRouter } from "next/navigation";
import { submitRegularClubData, uploadImage } from "../../../_api/supabase";

// 임시 유저 아이디
const userId: string = "56db247b-6294-498f-a3f7-0ce8d81c36fc";

const RegularTimePage = () => {
  const router = useRouter();

  // 상태 관리
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [formData, setFormData] = useState<RegularClubForm>({
    m_c_id: 0,
    s_c_id: 0,
    user_id: userId,
    regular_club_approval: false,
    regular_club_name: "",
    regular_club_image: "",
    regular_club_introduction: "",

    // null이 허용되는 선택적 필드들
    regular_club_gender: null,
    regular_club_age: null,
    regular_club_people_limited: null
  });

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  // 다음단계 버튼 (유효성 검사 함수)
  const handleNext = () => {
    if (step === 1 && formData.s_c_id === 0) {
      alert("카테고리를 선택해주세요");
      return;
    }

    if (step === 2) {
      return;
    }

    if (step === 3) {
      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  // 슈퍼베이스 제출 버튼
  const handleSubmit = async () => {
    try {
      let finalFormData = { ...formData };
      // File 객체인 경우에만 업로드 처리
      if (formData.regular_club_image instanceof File) {
        const imageUrl = await uploadImage(formData.regular_club_image);
        finalFormData = {
          ...finalFormData,
          regular_club_image: imageUrl
        };
      }
      // 슈퍼베이스에 데이터 저장
      await submitRegularClubData(finalFormData);
      alert("일회성 모임 생성에 성공했습니다");
      // 성공 시 처리
      // router.push("/success-page"); 원하는 페이지로 이동
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("일회성 모임 생성 중 오류가 발생했습니다.");
    }
  };

  // 렌더링 함수
  const renderStep = () => {
    switch (step) {
      case 1:
      // return <Category formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <div>
            {/* <ImageUpload formData={formData} setFormData={setFormData} /> */}
            {/* <ClubTitle formData={formData} setFormData={setFormData} /> */}
          </div>
        );
      case 3:
        return <div>{/* <MemberType /> */}</div>;
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

        {step === 3 ? (
          <button
            onClick={handleNext}
            className="w-[358px] h-[53px] rounded-lg hover:border-2 hover:border-black bg-red-400"
          >
            모임 생성
          </button>
        ) : (
          <button onClick={handleNext} className="next-button">
            다음
          </button>
        )}
      </div>
    </div>
  );
};

export default RegularTimePage;
