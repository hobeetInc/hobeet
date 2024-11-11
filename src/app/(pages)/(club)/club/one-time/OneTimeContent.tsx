"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// 컴포넌트 임포트
import { useAuth } from "@/app/store/AuthContext";
import { OneTimeClubChatRoom } from "@/app/(pages)/(chat)/_components/oneTimeClub/OneTimeClubChatRoom";
import { ONETIME_CLUB_CREATE } from "../_utils/localStorage";
import { putOneTimeMember, submitOneTimeClubData, uploadImage } from "../_api/supabase";
import Category from "../_components/oneTimeClub/Category";
import DateTime from "../_components/oneTimeClub/DateTime";
import AddressSearch from "../_components/oneTimeClub/AddressSearch";
import MemberType from "../_components/oneTimeClub/MemberType";
import Tax from "../_components/oneTimeClub/Tax";
import { EggPopForm } from "@/types/eggpop.types";
import ProgressBar from "../_components/ProgressBar";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import Introduction from "../_components/oneTimeClub/Introduction";

const OneTimeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId } = useAuth();

  // 초기값 설정 시 localStorage 데이터를 먼저 확인
  const getInitialData = () => {
    try {
      const savedData = localStorage.getItem(ONETIME_CLUB_CREATE);
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
        egg_pop_name: "",
        egg_pop_location: "",
        egg_pop_introduction: "",
        egg_pop_image: "",
        egg_pop_date_time: "",
        egg_pop_tax: 0,

        // null이 허용되는 선택적 필드들
        egg_pop_gender: null,
        egg_pop_age: null,
        egg_pop_people_limited: null
      },
      selectedGender: "",
      selectedAge: ""
    };
  };

  // localStorage의 데이터로 초기값 설정
  const initialData = getInitialData();

  // URL에서 step 파라미터 읽기
  const currentStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3 | 4 | 5 | 6;

  // 상태 관리
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(currentStep);
  const [selectedGender, setSelectedGender] = useState<string>(initialData.selectedGender);
  const [selectedAge, setSelectedAge] = useState<string>(initialData.selectedGender);
  const [formData, setFormData] = useState<EggPopForm>(initialData.formData);

  // 폼데이터 확인용
  // useEffect(() => {
  //   console.log("폼:", formData);
  // }, [formData]);

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
    // if (step === 1 && formData.sub_category_id === 0) {
    //   alert("카테고리를 선택해주세요");
    //   return;
    // }

    // if (step === 2) {
    //   if (!formData.egg_pop_name.trim()) {
    //     alert("모임 제목을 입력해주세요");
    //     return;
    //   }
    // }

    // if (step === 3) {
    //   if (!formData.egg_pop_image) {
    //     alert("이미지를 선택해주세요");
    //     return;
    //   }
    //   if (!formData.egg_pop_introduction.trim()) {
    //     alert("모임 소개글을 입력해주세요");
    //     return;
    //   }
    // }
    // if (step === 4) {
    //   if (!formData.egg_pop_date_time) {
    //     alert("날짜와 시간을 선택해주세요");
    //     return;
    //   }
    // }

    // if (step === 5) {
    //   if (!formData.egg_pop_location) {
    //     alert("모임 장소를 정해주세요");
    //     return;
    //   }
    // }

    // if (step === 6) {
    //   if (!selectedGender) {
    //     alert("성별제한을 설정해주세요");
    //     return;
    //   }

    //   if (!selectedAge) {
    //     alert("나이제한을 설정해주세요");
    //     return;
    //   }

    //   if (formData.egg_pop_people_limited !== null && formData.egg_pop_people_limited >= 101) {
    //     alert("인원제한은 100명 이하로 해주세요");
    //     return;
    //   }

    //   if (formData.egg_pop_people_limited !== null && formData.egg_pop_people_limited === 0) {
    //     alert("2명 이상 적어주세요");
    //     return;
    //   }

    //   if (formData.egg_pop_people_limited !== null && formData.egg_pop_people_limited === 1) {
    //     alert("2명 이상 적어주세요");
    //     return;
    //   }

    //   if (formData.egg_pop_people_limited === null) {
    //     setFormData({
    //       ...formData,
    //       egg_pop_people_limited: 100
    //     });
    //     return alert("정말로 인원제한을 주지 않겠습니까?");
    //   }
    // }

    // if (step === 7) {
    //   if (formData.egg_pop_tax === null) {
    //     alert("금액을 입력해주세요");
    //     return;
    //   }

    if (step === 7) {
      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6);
    }
  };
  // step이 변경될 때마다 URL 업데이트
  useEffect(() => {
    router.push(`?step=${step}`);
  }, [step, router]);

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      window.location.replace("/club");
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6);
    }
  };

  // 슈퍼베이스 제출 버튼
  const handleSubmit = async () => {
    try {
      let finalFormData = { ...formData };

      // File 객체인 경우에만 업로드 처리
      if (formData.egg_pop_image instanceof File) {
        const imageUrl = await uploadImage(formData.egg_pop_image);
        finalFormData = {
          ...finalFormData,
          egg_pop_image: imageUrl
        };
      }

      // 슈퍼베이스에 데이터 저장
      const data = await submitOneTimeClubData(finalFormData);

      const member = {
        egg_pop_id: data.egg_pop_id,
        user_id: data.user_id
      };

      await putOneTimeMember(member);
      // 모임장 채팅방 생성 및 입장
      await OneTimeClubChatRoom(data.egg_pop_name, data.egg_pop_id, userId);
      alert("일회성 모임 생성에 성공했습니다");
      // 성공 시 처리
      localStorage.removeItem(ONETIME_CLUB_CREATE);

      // 생성 직후임을 로컬 스토리지에 표시
      localStorage.setItem("justCreated", "true");

      // 먼저 페이지 이동
      router.replace(`/club/one-time-club-sub/${data.egg_pop_id}`);
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
        return <Introduction formData={formData} setFormData={setFormData} />;
      case 3:
        return <DateTime formData={formData} setFormData={setFormData} />;
      case 4:
        return <AddressSearch formData={formData} setFormData={setFormData} />;
      case 5:
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
      case 6:
        return <Tax formData={formData} setFormData={setFormData} />;
    }
  };

  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return formData.sub_category_id === 0;
      case 2:
        return !formData.egg_pop_image || !formData.egg_pop_name.trim() || !formData.egg_pop_introduction.trim();
      case 3:
        return !formData.egg_pop_date_time;
      case 4:
        return !formData.egg_pop_location;
      case 5:
        return (
          !selectedGender ||
          !selectedAge ||
          (formData.egg_pop_people_limited !== null &&
            (formData.egg_pop_people_limited >= 101 || formData.egg_pop_people_limited <= 1))
        );
      case 6:
        return formData.egg_pop_tax === null;

      default:
        return false;
    }
  };

  return (
    <div className="relative">
      <div className="h-12">
        <div onClick={handleBack} className="h-12 w-12 p-3 justify-start items-center inline-flex">
          <IoIosArrowBack className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <div className="mx-4 flex flex-col">
        <ProgressBar currentStep={step} totalSteps={7} />
        <div>{renderStep()}</div>
      </div>
      <div className="fixed bottom-[30px] pt-10 left-0 right-0 px-4">
        <Button
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
          colorType={isNextButtonDisabled() ? undefined : "orange"}
          borderType="circle"
        >
          {step === 6 ? "모임 생성" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default OneTimeContent;
