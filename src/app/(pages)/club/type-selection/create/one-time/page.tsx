"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OneTimeClubForm } from "../../../_types/ClubForm";
import { submitOneTimeClubData, uploadImage } from "../../../_api/supabase";
// 컴포넌트 임포트
import Category from "../../../_components/Category";
import ImageUpload from "../../../_components/ImageUpload";
import DateTime from "../../../_components/DateTime";
import AddressSearch from "../../../_components/AddressSearch";
import MemberType from "../../../_components/MemberType";
import Tax from "../../../_components/Tax";
import { ClubTitle } from "../../../_components/ClubTitle";

// 임시 유저 아이디
const userId: string = "56db247b-6294-498f-a3f7-0ce8d81c36fc";

const OneTimePage = () => {
  const router = useRouter();

  // 상태 관리
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [formData, setFormData] = useState<OneTimeClubForm>({
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
  });

  // 다음단계 버튼 (유효성 검사 함수)
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

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      router.back();
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
