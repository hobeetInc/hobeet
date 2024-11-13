"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/store/AuthContext";
import { RegularClubChatRoom } from "@/app/(pages)/(chat)/_components/regularClub/RegularClubChatRoom";
import { REGULAR_CLUB_CREATE } from "../_utils/localStorage";
import Category from "../_components/regularClub/Category";
import MemberType from "../_components/regularClub/MemberType";
import { putRegularMember, putRepresentative, submitRegularClubData, uploadImage } from "../_api/supabase";
import { EggClubForm } from "@/types/eggclub.types";
import ProgressBar from "../_components/ProgressBar";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import Introduction from "../_components/regularClub/Introduction";
import { useThrottle } from "@/utils/throttle.tsx/torottleCreateClub";

const RegularContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId } = useAuth();

  // 초기값 설정 시 localStorage 데이터를 먼저 확인
  const getInitialData = () => {
    try {
      const savedData = localStorage.getItem(REGULAR_CLUB_CREATE);
      if (savedData && userId) {
        const data = JSON.parse(savedData);
        return {
          formData: { ...data.formData, user_id: userId },
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
        main_category_id: 0,
        sub_category_id: 0,
        user_id: userId,
        egg_club_approval: true,
        egg_club_name: "",
        egg_club_image: "",
        egg_club_introduction: "",

        // null이 허용되는 선택적 필드들
        egg_club_gender: null,
        egg_club_age: null,
        egg_club_people_limited: null
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
  const [formData, setFormData] = useState<EggClubForm>(initialData.formData);

  // 폼데이터 확인용
  useEffect(() => {}, [formData]);

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
      window.location.replace("/club");
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  // 쓰로틀링된 제출 핸들러
  const throttledHandleSubmit = useThrottle(() => {
    handleSubmit();
  }, 20000);

  // 쓰로틀링된 다음 단계 핸들러
  const throttledHandleNext = useThrottle(() => {
    if (step === 3) {
      throttledHandleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  }, 300);

  // 슈퍼베이스 제출 버튼
  const handleSubmit = async () => {
    try {
      let finalFormData = { ...formData };
      // File 객체인 경우에만 업로드 처리
      if (formData.egg_club_image instanceof File) {
        const imageUrl = await uploadImage(formData.egg_club_image);
        finalFormData = {
          ...finalFormData,
          egg_club_image: imageUrl
        };
      }
      // 슈퍼베이스에 데이터 저장
      const data = await submitRegularClubData(finalFormData);
      // console.log(data);

      const representive = {
        egg_club_id: data.egg_club_id,
        user_id: data.user_id,
        egg_club_participation_request_status: "active",
        egg_club_participation_request_approved_date: new Date().toISOString()
      };

      // 승인 테이블에 넣기
      const res = await putRepresentative(representive);

      const member = {
        user_id: data.user_id,
        egg_club_id: data.egg_club_id,
        egg_club_participation_request_id: res.egg_club_participation_request_id,
        egg_club_request_status: "active"
      };

      // 승인된 맴버 테이블에 넣기
      await putRegularMember(member);
      // 모임장 채팅방 생성 및 입장
      await RegularClubChatRoom(data.egg_club_name, data.egg_club_id, userId);

      alert("정기적 모임 생성에 성공했습니다");
      // 성공 시 처리
      localStorage.removeItem(REGULAR_CLUB_CREATE);

      // 다른 페이지로 이동
      router.replace(`/club/regular-club-sub/${data.egg_club_id}`);
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("정기적 모임 생성 중 오류가 발생했습니다.");
    }
  };

  // 렌더링 함수
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Category formData={formData} setFormData={setFormData} />;
      case 2:
        return <Introduction formData={formData} setFormData={setFormData} />;
      case 3:
        return (
          <div className="flex flex-col gap-20">
            {/* <ApplicationMethod formData={formData} setFormData={setFormData} /> */}
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

  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return formData.sub_category_id === 0;
      case 2:
        return !formData.egg_club_image || !formData.egg_club_name.trim() || !formData.egg_club_introduction.trim();
      case 3:
        return (
          !selectedGender ||
          !selectedAge ||
          (formData.egg_club_people_limited !== null &&
            (formData.egg_club_people_limited >= 101 || formData.egg_club_people_limited <= 1))
        );

      default:
        return false;
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="w-[390px] h-12 flex justify-start">
        <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex">
          <IoIosArrowBack className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <div className="mx-4 flex flex-col">
        <ProgressBar currentStep={step} totalSteps={3} />
        <div>{renderStep()}</div>
      </div>
      <div className="fixed bottom-[50px] pt-10 left-0 right-0 px-4 flex justify-center items-center">
        <Button
          onClick={throttledHandleNext}
          disabled={isNextButtonDisabled()}
          colorType={isNextButtonDisabled() ? undefined : "black"}
          borderType="circle"
        >
          {step === 3 ? "모임 생성" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default RegularContent;
