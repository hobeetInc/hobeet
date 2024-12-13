"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { submitRegularMember } from "../../../../_api/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { EggDayFormWithImageFile } from "@/types/features/club/eggday.types";
import { useThrottle } from "@/utils/throttle/throttleCreateClub";
import { ChevronLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/atoms/buttons/ButtonCom";
import { useUploadImage } from "@/hooks/utils/api/useUploadImage";
import { NOTIFICATION_CREATE } from "../../../../_utils/localStorage";
import { useCreateDay } from "@/hooks/utils/api/useCreate";
import Introduction from "./Introduction";
import DateTime from "./DateTime";
import AddressSearch from "./AddressSearch";
import Tax from "./Tax";
import ProgressBar from "../../../../../../../_components/ProgressBar";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import Modal from "@/components/ui/responsiveDesign/Modal";
import { IoCloseOutline } from "react-icons/io5";

const NotificationCreate = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { createDay, isPending } = useCreateDay();
  const uploadClubImage = useUploadImage();

  const defaultData = {
    formData: {
      user_id: userId,
      egg_day_name: "",
      egg_day_content: "",
      egg_day_date_time: "",
      egg_day_location: "",
      egg_day_tax: 0,
      egg_day_image: "",
      egg_club_id: parseInt(params.id)
    }
  };

  // 초기값 설정 시 localStorage 데이터를 먼저 확인
  const getInitialData = () => {
    try {
      const savedData = localStorage.getItem(NOTIFICATION_CREATE);
      if (savedData && userId) {
        const data = JSON.parse(savedData);
        return {
          formData: { ...data.formData, user_id: userId }
        };
      }
      return defaultData;
    } catch (error) {
      console.error("초기 데이터 로드 실패:", error);
      return defaultData;
    }
  };

  // localStorage의 데이터로 초기값 설정
  const initialData = getInitialData();

  // URL에서 step 파라미터 읽기
  const currentStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3 | 4;

  // 상태 관리
  const [step, setStep] = useState<1 | 2 | 3 | 4>(currentStep);
  const [formData, setFormData] = useState<EggDayFormWithImageFile>(initialData.formData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLargeScreen) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isLargeScreen]);

  // URL의 step 파라미터 변경 감지 및 적용
  useEffect(() => {
    const newStep = Number(searchParams.get("step") || 1) as 1 | 2 | 3 | 4;
    setStep(newStep);
  }, [searchParams]);

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(NOTIFICATION_CREATE);
      if (savedData) {
        const data = JSON.parse(savedData);
        setFormData(data.formData);
      }
    } catch (error) {
      console.error("로컬스토리지에서 가져오기 실패:", error);
    }
  }, []);

  // 쓰로틀링된 다음 단계 핸들러
  const throttledHandleNext = useThrottle(() => {
    localStorage.setItem(
      NOTIFICATION_CREATE,
      JSON.stringify({
        formData
      })
    );

    if (step === 4) {
      throttledHandleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  }, 300);

  // step이 변경될 때마다 URL 업데이트
  useEffect(() => {
    router.push(`?step=${step}`);
  }, [step, router]);

  // 뒤로가기 버튼
  const handleBack = () => {
    if (step === 1) {
      window.location.replace(`/club/regular-club-sub/${params.id}`);
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  // 쓰로틀링된 제출 핸들러
  const throttledHandleSubmit = useThrottle(() => {
    handleSubmit();
  }, 20000);

  // 슈퍼베이스 제출 버튼
  const handleSubmit = async () => {
    try {
      // 슈퍼베이스에 데이터 저장
      const imageUrl = await uploadClubImage(formData.egg_day_image);

      // 데이터 저장
      const data = await createDay({ ...formData, egg_day_image: imageUrl });

      const hostInfo = {
        egg_day_id: data.egg_day_id,
        user_id: data.user_id
      };

      await submitRegularMember(hostInfo);

      alert("에그데이를 생성하였습니다");
      // 성공 시 처리
      localStorage.removeItem(NOTIFICATION_CREATE);

      // 생성 직후임을 로컬 스토리지에 표시
      localStorage.setItem("justCreated", "true");

      router.replace(`/club/regular-club-sub/${params.id}/create/${data.egg_day_id}`);
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
      alert(`모임 생성 중 오류가 발생했습니다: ${errorMessage}`);
    }
  };

  // 렌더링 함수
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Introduction formData={formData} setFormData={setFormData} />;
      case 2:
        return <DateTime formData={formData} setFormData={setFormData} />;
      case 3:
        return <AddressSearch formData={formData} setFormData={setFormData} />;
      case 4:
        return <Tax formData={formData} setFormData={setFormData} />;
    }
  };

  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return !formData.egg_day_image || !formData.egg_day_name.trim() || !formData.egg_day_content.trim();
      case 2:
        return !formData.egg_day_date_time;
      case 3:
        return !formData.egg_day_location;
      case 4:
        return formData.egg_day_tax === null;
      default:
        return false;
    }
  };

  return (
    <>
      {isLargeScreen ? (
        <Modal isOpen={isModalOpen}>
          <div className="relative flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center p-3">
              <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex">
                <ChevronLeft className="w-6 h-6 cursor-pointer" />
              </div>
              <button onClick={() => router.push(`/club/regular-club-sub/${params.id}`)} className="p-2">
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full px-5 mx-4 flex flex-col">
              <ProgressBar currentStep={step} totalSteps={4} />
              <div>{renderStep()}</div>
            </div>
            <div className="w-full -mt-4 flex justify-center items-center">
              <Button
                onClick={throttledHandleNext}
                disabled={isNextButtonDisabled()}
                colorType={isNextButtonDisabled() ? undefined : "yellow"}
                borderType="circle"
                sizeType="largeWeb"
              >
                {step === 4 ? (isPending ? "생성 중..." : "모임 생성") : "다음"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <div className="relative flex flex-col justify-center items-center">
          <div className="w-[390px] h-12 flex justify-start">
            <div onClick={handleBack} className="h-12 w-12 p-3 inline-flex">
              <ChevronLeft className="w-6 h-6 cursor-pointer" />
            </div>
          </div>

          <div className="mx-4 flex flex-col">
            <ProgressBar currentStep={step} totalSteps={4} />
            <div>{renderStep()}</div>
          </div>
          <div className="fixed bottom-[50px] pt-10 left-0 right-0 px-4 flex justify-center items-center">
            <Button
              onClick={throttledHandleNext}
              disabled={isNextButtonDisabled()}
              colorType={isNextButtonDisabled() ? undefined : "yellow"}
              borderType="circle"
            >
              {step === 4 ? (isPending ? "생성 중..." : "모임 생성") : "다음"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCreate;
