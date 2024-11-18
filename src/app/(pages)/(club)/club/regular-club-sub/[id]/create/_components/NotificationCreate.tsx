"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useAuth } from "@/store/AuthContext";
import { submitRegularClubNotification, submitRegularMember, uploadImage } from "../../../../_api/supabase";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { EggDay, EggDayRequired } from "@/types/eggday.types";
import { AddressData, DaumPostcodeData } from "@/types/address.types";
import Text from "@/components/uiComponents/TextComponents/Text";
import ImageUpload from "@/components/uiComponents/Image/ImageUpload";
import { IoIosArrowBack } from "react-icons/io";
import ClubCreateInput from "@/components/uiComponents/Input/ClubCreateInput";
import ClubCreateTextArea from "@/components/uiComponents/Input/Textarea";
import SearchInput from "@/components/uiComponents/Input/SearchInput";
import { useThrottle } from "@/utils/throttle.tsx/torottleCreateClub";

// 커스텀 스타일
const customStyles = `
  .react-datepicker {
    font-size: 0.9rem;
  }
  .react-datepicker__header {
    padding-top: 0.8em;
  }
  .react-datepicker__month {
    margin: 0.4em 1em;
  }
  
`;

// 동적 임포트(필요한 시점에 불러오기)
const loadDaumPostcodeScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

const NotificationCreate = ({ params }: { params: { id: string } }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [formData, setFormData] = useState<Omit<EggDay, "egg_day_image"> & { egg_day_image: string | File }>({
    user_id: userId,
    egg_day_name: "",
    egg_day_content: "",
    egg_day_date_time: "",
    egg_day_location: "",
    egg_day_tax: 0,
    egg_day_image: "",
    egg_club_id: parseInt(params.id)
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [addressData, setAddressData] = useState<AddressData>({
    zonecode: "",
    address: "",
    detailAddress: ""
  });

  const [showTaxInput, setShowTaxInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   console.log("폼데이터 =>", formData);
  // }, [formData]);

  // 컴포넌트 마운트 시 또는 formData의 이미지가 변경될 때 미리보기 생성
  useEffect(() => {
    if (formData.egg_day_image instanceof File) {
      const url = URL.createObjectURL(formData.egg_day_image);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [formData.egg_day_image]);

  // 이미지 선택 시 처리하는 함수
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다");
        return;
      }
    }

    // el.type.startsWith("image/") <- 이미지 파일인지 체크
    if (!file?.type.startsWith("image/")) {
      alert("이미지 파일만 업로드가 가능합니다");
      return;
    }

    // 이미지 미리보기용 URL 생성
    const previewImageUrl = URL.createObjectURL(file);
    setPreviewUrl(previewImageUrl);

    // formData에 File 객체 저장
    setFormData({ ...formData, egg_day_image: file });
  };

  // 날짜 변경 처리
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setStartTime(null);
    updateDateTime(date, null);
  };

  // 시간 변경 처리
  const handleTimeChange = (time: Date | null) => {
    setStartTime(time);
    updateDateTime(startDate, time);
  };

  // 선택 가능한 시간 필터링
  const filterTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = startDate || new Date();

    // 선택된 날짜가 오늘인 경우에만 시간 필터링 적용
    if (
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return time >= currentDate;
    }

    return true;
  };

  // 날짜와 시간을 합쳐서 FormData에 저장
  const updateDateTime = (date: Date | null, time: Date | null) => {
    if (date && time) {
      const combinedDate = new Date(date.setHours(time.getHours() + 9, time.getMinutes()));
      setFormData({
        ...formData,
        egg_day_date_time: combinedDate.toISOString()
      });
    }
  };

  // 우편 번호 찾을 때 실행되는 함수
  const execDaumPostcode = async () => {
    await loadDaumPostcodeScript();

    if (!window.daum?.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시만 기다려주세요.");
      return;
    }

    // 카카오 주소 검색 팝업 뜨기
    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        let addr = "";
        let extraAddr = "";

        // 사용자가 선택한 값에 따라 해당 주소를 가져옴 (도로명, 지번)
        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        // 도로명 주소일 때, 참고 항목 처리
        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = ` (${extraAddr})`;
          }
        }

        // 선택된 주소로 데이터 만들기
        const newAddressData = {
          zonecode: data.zonecode,
          address: addr,
          detailAddress: ""
        };

        // 선택된 주소를 합치기
        const fullAddress = `[${data.zonecode}] ${addr}`;

        setAddressData(newAddressData);
        setFormData({
          ...formData,
          egg_day_location: fullAddress
        });
      }
    }).open();
  };

  // 상세 주소 입력 시 실행되는 함수
  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDetailAddress = e.target.value;
    setAddressData((prev) => ({
      ...prev,
      detailAddress: newDetailAddress
    }));

    // 기본주소가 있을 때만 formData 업데이트
    if (addressData.zonecode && addressData.address) {
      const fullAddress = `[${addressData.zonecode}] ${addressData.address}${
        newDetailAddress ? `, ${newDetailAddress}` : ""
      }`;

      setFormData({
        ...formData,
        egg_day_location: fullAddress
      });
    }
  };

  const handleTaxToggle = (hasTax: boolean) => {
    setShowTaxInput(hasTax);
    setInputError("");

    if (!hasTax) {
      setFormData({ ...formData, egg_day_tax: 0 });
    } else {
      setFormData({ ...formData, egg_day_tax: null });
    }
  };

  const handleTaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 문자열이면 null로 설정
    if (value === "") {
      setFormData({ ...formData, egg_day_tax: null });
      setInputError("");
      return;
    }

    // 숫자가 아닌 문자가 포함되어 있는지 검사
    if (!/^\d+$/.test(value)) {
      setInputError("금액에 숫자만 입력해주세요");
      return;
    }

    const numValue = parseInt(value);

    // 음수 검사
    if (numValue < 0) {
      setInputError("0원 이상 입력해주세요");
      return;
    }

    // 최대값 검사
    if (numValue > 1000000) {
      setInputError("100만원 이하로 입력해주세요");
      return;
    }

    setInputError("");
    setFormData({ ...formData, egg_day_tax: numValue });
  };

  const handleSubmit = async () => {
    try {
      // 필수값 유효성 검사
      if (!formData.egg_day_name.trim()) {
        alert("모임 제목을 입력해주세요");
        return;
      }

      if (!formData.egg_day_content.trim()) {
        alert("모임 소개를 입력해주세요");
        return;
      }

      if (!formData.egg_day_date_time) {
        alert("날짜와 시간을 선택해주세요");
        return;
      }

      if (!formData.egg_day_location) {
        alert("모임 장소를 입력해주세요");
        return;
      }

      if (showTaxInput && formData.egg_day_tax === null) {
        alert("참가비를 입력해주세요");
        return;
      }

      if (!formData.egg_day_image) {
        alert("모임 대표 이미지를 업로드해주세요");
        return;
      }

      let finalFormData = { ...formData };

      // 이미지 업로드 처리
      // @ts-ignore
      if (formData.egg_day_image instanceof File) {
        try {
          const imageUrl = await uploadImage(formData.egg_day_image);
          finalFormData = {
            ...finalFormData,
            egg_day_image: imageUrl
          };
        } catch (error) {
          console.error("이미지 업로드 오류:", error);
          alert("이미지 업로드 중 오류가 발생했습니다");
          return;
        }
      }

      //  데이터 저장
      const data = await submitRegularClubNotification(finalFormData as EggDayRequired);

      const hostInfo = {
        egg_day_id: data.egg_day_id,
        user_id: data.user_id
      };

      await submitRegularMember(hostInfo);

      alert("에그데이를 생성하였습니다");

      // 생성 직후임을 로컬 스토리지에 표시
      localStorage.setItem("justCreated", "true");

      router.replace(`/club/regular-club-sub/${params.id}/create/${data.egg_day_id}`); // 성공 시 이동할 페이지
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
      alert(`모임 생성 중 오류가 발생했습니다: ${errorMessage}`);
    }
  };

  // 쓰로틀링된 제출 핸들러
  const throttledHandleSubmit = useThrottle(() => {
    handleSubmit();
  }, 20000);

  return (
    <div>
      <style>{customStyles}</style>
      <div className="flex justify-between items-center h-[48px] p-4 relative">
        <button onClick={() => router.back()} className="absolute left-4 text-lg">
          <IoIosArrowBack className="w-6 h-6" />
        </button>
        <Text variant="header-16" className="flex-1 text-center">
          에그데이
        </Text>
      </div>
      <div className="flex flex-col p-2 justify-center items-center">
        <Text variant="header-18" className="flex items-center mb-6 h-11">
          에그데이를 만들어 볼까요?
        </Text>

        <div className="flex flex-col gap-8">
          <label htmlFor="image-upload" className="w-[88px] h-[88px] cursor-pointer">
            <input
              id="image-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              className="hidden"
            />
            {previewUrl ? (
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={previewUrl}
                  alt="모임대표이미지"
                  width={88}
                  height={88}
                  className="w-[88px] h-[88px] object-cover rounded-xl"
                />
              </div>
            ) : (
              <ImageUpload />
            )}
          </label>

          <div className="flex flex-col gap-2">
            <Text variant="body_medium-16">모임의 제목은 무엇인가요?</Text>
            <ClubCreateInput
              type="text"
              maxLength={36}
              value={formData.egg_day_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  egg_day_name: e.target.value
                })
              }
              placeholder="제목을 입력해주세요(최대 글자 36자)"
            />
          </div>

          <div className="flex flex-col gap-8">
            <style>{customStyles}</style>
            <div className="flex flex-col gap-2">
              <Text variant="header-18">언제 만날까요?</Text>
              <label htmlFor="datePickerDate" className="cursor-pointer ">
                <SearchInput>
                  <DatePicker
                    id="datePickerDate"
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat={`yyyy년 MM월 dd일`}
                    minDate={new Date()}
                    locale={ko}
                    placeholderText="날짜를 선택해주세요"
                    className="w-full h-full bg-transparent cursor-pointer focus:outline-none text-body-14 text-gray-300"
                    wrapperClassName="w-full"
                    autoComplete="off"
                  />
                </SearchInput>
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <Text variant="header-18">몇 시에 만날까요?</Text>

              <label htmlFor="datePickerTime" className="cursor-pointer">
                <SearchInput>
                  <DatePicker
                    id="datePickerTime"
                    selected={startTime}
                    onChange={handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="시간"
                    dateFormat="aa h:mm"
                    locale={ko}
                    placeholderText="시간을 선택해주세요"
                    className="w-full h-full bg-transparent cursor-pointer focus:outline-none text-body-14 text-gray-300"
                    wrapperClassName="w-full"
                    filterTime={filterTime}
                    disabled={!startDate}
                    autoComplete="off"
                  />
                </SearchInput>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="body_medium-16">어떤 모임인가요?</Text>

            <ClubCreateTextArea
              value={formData.egg_day_content}
              maxLength={290}
              onChange={(e) => setFormData({ ...formData, egg_day_content: e.target.value })}
              placeholder="모임 소개를 작성해주세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="header-18">참가비가 있나요?</Text>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleTaxToggle(true)}
                className={`w-[173px] h-12 px-4 rounded-lg border  justify-center items-center gap-2.5 inline-flex  ${
                  showTaxInput ? "border-primary-500 border-2" : "border-gray-100"
                } `}
              >
                <Text variant="subtitle-14" className={`${showTaxInput ? "text-primary-300" : "text-gray-800"}`}>
                  있음
                </Text>
              </button>
              <button
                onClick={() => handleTaxToggle(false)}
                className={`w-[173px] h-12 px-4 rounded-lg border justify-center items-center gap-2.5 inline-flex  ${
                  !showTaxInput ? "border-primary-300 border-2" : "border-gray-100"
                } `}
              >
                <Text variant="subtitle-14" className={`${!showTaxInput ? "text-primary-300" : "text-gray-800"}`}>
                  없음
                </Text>
              </button>
            </div>

            <div>
              {showTaxInput && (
                <div className="relative">
                  <ClubCreateInput
                    type="text"
                    value={formData.egg_day_tax || ""}
                    onChange={handleTaxAmount}
                    placeholder="금액을 입력해주세요"
                  />

                  <div className="mx-2">
                    {inputError && <div className="text-red-500 text-sm mt-1">{inputError}</div>}

                    {formData.egg_day_tax !== null && formData.egg_day_tax > 0 && !inputError && (
                      <div className="py-4 px-1 text-gray-600">{formData.egg_day_tax.toLocaleString()}원</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="header-18">어디서 만날까요?</Text>
            <label htmlFor="address" onClick={execDaumPostcode} className="cursor-pointer">
              <SearchInput>
                <input
                  id="address"
                  value={addressData.address}
                  placeholder="주소를 검색해주세요"
                  className="w-full h-full bg-transparent cursor-pointer focus:outline-none text-body-14 text-gray-300"
                  readOnly
                />
              </SearchInput>
            </label>

            <ClubCreateInput
              type="text"
              value={addressData.detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="상세주소를 입력해주세요(선택)"
            />
          </div>

          <button onClick={throttledHandleSubmit} className="w-full h-[59px] bg-primary-300 rounded-full">
            에그데이 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCreate;
