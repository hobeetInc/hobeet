"use client";

import { useEffect, useState } from "react";
import { RegularClubForm } from "../../../_types/ClubForm";
import { useRouter, useSearchParams } from "next/navigation";
import { submitRegularClubData, uploadImage } from "../../../_api/supabase";
import Category from "../../../_components/regularClub/Category";
import ImageUpload from "../../../_components/regularClub/ImageUpload";
import ClubTitle from "../../../_components/regularClub/ClubTitle";
import MemberType from "../../../_components/regularClub/MemberType";
import ApplicationMethod from "../../../_components/regularClub/ApplicationMethod";

// 임시 유저 아이디
const userId: string = "56db247b-6294-498f-a3f7-0ce8d81c36fc";
const REGULAR_CLUB_CREATE = "REGULAR_CLUB_CREATE";

const RegularTimePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 초기값 설정 시 localStorage 데이터를 먼저 확인
  const getInitialData = () => {
    try {
      const savedData = localStorage.getItem(REGULAR_CLUB_CREATE);
      if (savedData) {
        const data = JSON.parse(savedData);
        return {
          formData: data.formData,
          selectedGender: data.selectedGender,
          selectedAge: data.selectedAge
        };
      }
    } catch (error) {
      console.error("초기 데이터 로드 실패:", error);
    }

    // localStorage에 데이터가 없으면 기본값 반환
    return {
      formData: {
        // 필수값이면서 null이 허용되지 않는 필드들
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
      },
      selectedGender: "",
      selectedAge: ""
    };
  };

  // localStorage의 데이터로 초기값 설정
  const initialData = getInitialData();

  // URL에서 step 파라미터 읽기
  const currentStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3;

  // 상태 관리
  const [step, setStep] = useState<1 | 2 | 3>(currentStep);
  const [selectedGender, setSelectedGender] = useState<string>(initialData.selectedGender);
  const [selectedAge, setSelectedAge] = useState<string>(initialData.selectedAge);
  const [formData, setFormData] = useState<RegularClubForm>(initialData.formData);

  // URL의 step 파라미터 변경 감지 및 적용
  useEffect(() => {
    const newStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3;
    setStep(newStep);
  }, [searchParams]);

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(REGULAR_CLUB_CREATE);
      if (savedData) {
        const data = JSON.parse(savedData);
        setFormData(data.formData);
        setSelectedGender(data.selectedGender);
        setSelectedAge(data.selectedAge);
      }
    } catch (error) {
      console.error("로컬스토리지에서 가져오기 실패:", error);
    }
  }, []);

  // 데이터가 변경될때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(
      REGULAR_CLUB_CREATE,
      JSON.stringify({
        formData,
        selectedGender,
        selectedAge
      })
    );
  }, [formData, selectedGender, selectedAge]);

  // step이 변경될 때마다 URL 업데이트
  useEffect(() => {
    router.push(`?step=${step}`);
  }, [step, router]);

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      window.location.replace("/club/type-selection");
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
      if (!formData.regular_club_image) {
        alert("이미지를 선택해주세요");
        return;
      }

      if (!formData.regular_club_name.trim()) {
        alert("모임 제목을 입력해주세요");
        return;
      }
      if (!formData.regular_club_introduction.trim()) {
        alert("모임 소개글을 입력해주세요");
        return;
      }
    }

    if (step === 3) {
      if (!selectedGender) {
        alert("성별제한을 설정해주세요");
        return;
      }

      if (!selectedAge) {
        alert("나이제한을 설정해주세요");
        return;
      }

      if (formData.regular_club_people_limited !== null && formData.regular_club_people_limited >= 100) {
        alert("인원제한은 100명 이하로 해주세요");
        return;
      }

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
      alert("정기적 모임 생성에 성공했습니다");
      // 성공 시 처리
      localStorage.removeItem(REGULAR_CLUB_CREATE);
      // 다른 페이지로 이동
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
        return <Category formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <ImageUpload formData={formData} setFormData={setFormData} />
            <ClubTitle formData={formData} setFormData={setFormData} />

            <div>
              <h1>정기모임 소개</h1>
              <textarea
                value={formData.regular_club_introduction}
                onChange={(e) => setFormData({ ...formData, regular_club_introduction: e.target.value })}
                className="mt-4 p-2 border-2 border-black w-[358px] h-[218px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-20">
            <ApplicationMethod formData={formData} setFormData={setFormData} />
            <MemberType
              formData={formData}
              setFormData={setFormData}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedAge={selectedAge}
              setSelectedAge={setSelectedAge}
            />
          </div>
        );
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
