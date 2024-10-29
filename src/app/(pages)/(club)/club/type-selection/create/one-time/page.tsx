"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OneTimeClubForm } from "../../../_types/ClubForm";
import { submitOneTimeClubData, uploadImage } from "../../../_api/supabase";
import Category from "../../../_components/oneTimeClub/Category";
// 컴포넌트 임포트
import ImageUpload from "../../../_components/oneTimeClub/ImageUpload";
import DateTime from "../../../_components/oneTimeClub/DateTime";
import AddressSearch from "../../../_components/oneTimeClub/AddressSearch";
import MemberType from "../../../_components/oneTimeClub/MemberType";
import Tax from "../../../_components/oneTimeClub/Tax";
import ClubTitle from "../../../_components/oneTimeClub/ClubTitle";
import { ONETIME_CLUB_CREATE } from "../../../_utils/localStorage";

// 임시 유저 아이디
const userId: string = "56db247b-6294-498f-a3f7-0ce8d81c36fc";

const OneTimePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 초기값 설정 시 localStorage 데이터를 먼저 확인
  const getInitialData = () => {
    try {
      const savedData = localStorage.getItem(ONETIME_CLUB_CREATE);
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
        one_time_club_name: "",
        one_time_club_location: "",
        one_time_club_introduction: "",
        one_time_image: "",
        one_time_club_date_time: "",
        one_time_tax: null,

        // null이 허용되는 선택적 필드들
        one_time_gender: null,
        one_time_age: null,
        one_time_people_limited: null
      },
      selectedGender: "",
      selectedAge: ""
    };
  };

  // localStorage의 데이터로 초기값 설정
  const initialData = getInitialData();

  // URL에서 step 파라미터 읽기
  const currentStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;

  // 상태 관리
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(currentStep);
  const [selectedGender, setSelectedGender] = useState<string>(initialData.selectedGender);
  const [selectedAge, setSelectedAge] = useState<string>(initialData.selectedGender);
  const [formData, setFormData] = useState<OneTimeClubForm>(initialData.formData);

  useEffect(() => {
    console.log("폼:", formData);
  }, [formData]);

  // URL의 step 파라미터 변경 감지 및 적용
  useEffect(() => {
    const newStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    setStep(newStep);
  }, [searchParams]);

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(ONETIME_CLUB_CREATE);
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
      ONETIME_CLUB_CREATE,
      JSON.stringify({
        formData,
        selectedGender,
        selectedAge
      })
    );
  }, [formData, selectedGender, selectedAge]);

  // 다음단계 버튼 (유효성 검사 함수)
  const handleNext = () => {
    if (step === 1 && formData.s_c_id === 0) {
      alert("카테고리를 선택해주세요");
      return;
    }

    if (step === 2) {
      if (!formData.one_time_club_name.trim()) {
        alert("모임 제목을 입력해주세요");
        return;
      }
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
    if (step === 4) {
      if (!formData.one_time_club_date_time) {
        alert("날짜와 시간을 선택해주세요");
        return;
      }
    }

    if (step === 5) {
      if (!formData.one_time_club_location) {
        alert("모임 장소를 정해주세요");
        return;
      }
    }

    if (step === 6) {
      if (!selectedGender) {
        alert("성별제한을 설정해주세요");
        return;
      }

      if (!selectedAge) {
        alert("나이제한을 설정해주세요");
        return;
      }

      if (formData.one_time_people_limited !== null && formData.one_time_people_limited >= 100) {
        alert("인원제한은 100명 이하로 해주세요");
        return;
      }
    }

    if (step === 7) {
      if (formData.one_time_tax === null) {
        alert("금액을 입력해주세요");
        return;
      }

      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7);
    }
  };
  // step이 변경될 때마다 URL 업데이트
  useEffect(() => {
    router.push(`?step=${step}`);
  }, [step, router]);

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      window.location.replace("/club/type-selection");
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7);
    }
  };

  // 슈퍼베이스 제출 버튼
  const handleSubmit = async () => {
    try {
      let finalFormData = { ...formData };

      // File 객체인 경우에만 업로드 처리
      if (formData.one_time_image instanceof File) {
        const imageUrl = await uploadImage(formData.one_time_image);
        finalFormData = {
          ...finalFormData,
          one_time_image: imageUrl
        };
      }

      // 슈퍼베이스에 데이터 저장
      await submitOneTimeClubData(finalFormData);
      alert("일회성 모임 생성에 성공했습니다");
      // 성공 시 처리
      localStorage.removeItem(ONETIME_CLUB_CREATE);
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
        return <ClubTitle formData={formData} setFormData={setFormData} />;
      case 3:
        return <ImageUpload formData={formData} setFormData={setFormData} />;
      case 4:
        return <DateTime formData={formData} setFormData={setFormData} />;
      case 5:
        return <AddressSearch formData={formData} setFormData={setFormData} />;
      case 6:
        return (
          <MemberType
            formData={formData}
            setFormData={setFormData}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
          />
        );
      case 7:
        return <Tax formData={formData} setFormData={setFormData} />;
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

        {step === 7 ? (
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

export default OneTimePage;
