"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useAuth } from "@/app/store/AuthContext";
import { RegularClubNotification } from "../_types/subCreate";
import { submitRegularClubNotification, submitRegularMember, uploadImage } from "../../../../_api/supabase";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";

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

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: {
          userSelectedType: string;
          roadAddress: string;
          jibunAddress: string;
          bname: string;
          buildingName: string;
          apartment: string;
          zonecode: string;
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

interface AddressData {
  zonecode: string; // 우편주소
  address: string; // 기본주소
  detailAddress: string; // 상세주소
}

interface DaumPostcodeData {
  userSelectedType: string; // 사용자가 선택한 주소 타입
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  bname: string; // 법정동/법정리 이름
  buildingName: string; // 건물명
  apartment: string; // 아파트 여부
  zonecode: string; // 우편번호
}

const NotificationCreate = ({ params }: { params: { id: string } }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [formData, setFormData] = useState<RegularClubNotification>({
    user_id: userId,
    r_c_notification_name: "",
    r_c_notification_content: "",
    r_c_notification_date_time: "",
    r_c_notification_location: "",
    r_c_notification_tax: 0,
    r_c_notification_image: "",
    r_c_id: parseInt(params.id)
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

  useEffect(() => {
    console.log("폼데이터 =>", formData);
  }, [formData]);

  // 컴포넌트 마운트 시 또는 formData의 이미지가 변경될 때 미리보기 생성
  useEffect(() => {
    if (formData.r_c_notification_image instanceof File) {
      const url = URL.createObjectURL(formData.r_c_notification_image);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [formData.r_c_notification_image]);

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
    setFormData({ ...formData, r_c_notification_image: file });
  };

  const handleDeleteImage = () => {
    setPreviewUrl(null);
    setFormData({ ...formData, r_c_notification_image: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; //input 값 초기화
    }
  };

  // const handleColor = (time: Date) => {
  //   return time.getHours() > 12 ? "text-success" : "text-error";
  // };

  // // FormData에 선택된 날짜와 시간을 저장
  // const handleDateChange = (date: Date | null) => {
  //   setStartDate(date);

  //   if (date) {
  //     const utcDate = new Date(date.getTime());
  //     setFormData({
  //       ...formData,
  //       r_c_notification_date_time: utcDate.toISOString() // toISOString()하면 아홉시간 빠지게 됨
  //     });
  //   }
  // };
  // 날짜 변경 처리
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    updateDateTime(date, startTime);
  };

  // 시간 변경 처리
  const handleTimeChange = (time: Date | null) => {
    setStartTime(time);
    updateDateTime(startDate, time);
  };

  // 날짜와 시간을 합쳐서 FormData에 저장
  const updateDateTime = (date: Date | null, time: Date | null) => {
    if (date && time) {
      const combinedDate = new Date(date.setHours(time.getHours(), time.getMinutes()));
      setFormData({
        ...formData,
        r_c_notification_date_time: combinedDate.toISOString()
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
          r_c_notification_location: fullAddress
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
        r_c_notification_location: fullAddress
      });
    }
  };

  const handleTaxToggle = (hasTax: boolean) => {
    setShowTaxInput(hasTax);
    setInputError("");

    if (!hasTax) {
      setFormData({ ...formData, r_c_notification_tax: 0 });
    } else {
      setFormData({ ...formData, r_c_notification_tax: null });
    }
  };

  const handleTaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 문자열이면 null로 설정
    if (value === "") {
      setFormData({ ...formData, r_c_notification_tax: null });
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
    setFormData({ ...formData, r_c_notification_tax: numValue });
  };

  const handleSubmit = async () => {
    try {
      // 필수값 유효성 검사
      if (!formData.r_c_notification_name.trim()) {
        alert("모임 제목을 입력해주세요");
        return;
      }

      if (!formData.r_c_notification_content.trim()) {
        alert("모임 소개를 입력해주세요");
        return;
      }

      if (!formData.r_c_notification_date_time) {
        alert("날짜와 시간을 선택해주세요");
        return;
      }

      if (!formData.r_c_notification_location) {
        alert("모임 장소를 입력해주세요");
        return;
      }

      if (showTaxInput && formData.r_c_notification_tax === null) {
        alert("참가비를 입력해주세요");
        return;
      }

      if (!formData.r_c_notification_image) {
        alert("모임 대표 이미지를 업로드해주세요");
        return;
      }

      let finalFormData = { ...formData };

      // 이미지 업로드 처리
      if (formData.r_c_notification_image instanceof File) {
        try {
          const imageUrl = await uploadImage(formData.r_c_notification_image);
          finalFormData = {
            ...finalFormData,
            r_c_notification_image: imageUrl
          };
        } catch (error) {
          console.error("이미지 업로드 오류:", error);
          alert("이미지 업로드 중 오류가 발생했습니다");
          return;
        }
      }

      //  데이터 저장
      const data = await submitRegularClubNotification(finalFormData);
      // console.log("이거 지금 생성함!!!!!!!!!", data);

      const hostInfo = {
        r_c_notification_id: data.r_c_notification_id,
        user_id: data.user_id
      };

      await submitRegularMember(hostInfo);

      alert("정기모임 안의 공지글을 생성하였습니다");
      router.push(`/club/regular-club-sub/${params.id}/create/${data.r_c_notification_id}`); // 성공 시 이동할 페이지
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
      alert(`모임 생성 중 오류가 발생했습니다: ${errorMessage}`);
    }
  };

  return (
    <div>
      <style>{customStyles}</style>
      <div className="flex justify-between items-center h-[48px] p-4 relative">
        <button onClick={() => router.back()} className="absolute left-4 text-lg">
          ←
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">에그데이</h1>
      </div>
      <div className="flex flex-col gap-20 p-2">
        <div>
          <h1 className="mb-4 text-[20px] font-semibold">모임 사진</h1>
          <div className="flex flex-col gap-4">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg" />
            {previewUrl && (
              <div>
                <Image src={previewUrl} alt="모임대표이미지" width={300} height={200} />
                <button onClick={handleDeleteImage} className="border-2 border-black p-1 my-2">
                  이미지 삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="mb-4 text-[20px] font-semibold">모임 제목</h1>

          <input
            type="text"
            placeholder="모임 제목을 작성해주세요"
            value={formData.r_c_notification_name}
            maxLength={36}
            onChange={(e) =>
              setFormData({
                ...formData,
                r_c_notification_name: e.target.value
              })
            }
            className="border-2 border-black mt-4 w-[358px] h-[48px] p-2"
          />
          <div className="text-gray-500 text-sm">{formData.r_c_notification_name.length} / 36</div>
        </div>

        <div>
          <h1 className="text-[20px] font-semibold mb-4">모임 장소</h1>

          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat={`yyyy년 MM월 dd일`}
              minDate={new Date()}
              locale={ko}
              placeholderText="날짜를 선택해주세요"
              className="w-full p-4 bg-gray-50 rounded-lg pr-12"
              wrapperClassName="w-full"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-[20px] font-semibold mb-4">모임 시간</h2>

            <div className="relative">
              <DatePicker
                selected={startTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="시간"
                dateFormat="aa h:mm"
                locale={ko}
                placeholderText="시간을 선택해주세요"
                className="w-full p-4 bg-gray-50 rounded-lg pr-12"
                wrapperClassName="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[20px] font-semibold mb-4">설명</h1>

          <textarea
            value={formData.r_c_notification_content}
            maxLength={290}
            onChange={(e) => setFormData({ ...formData, r_c_notification_content: e.target.value })}
            className="mt-4 p-2 border-2 border-black w-[358px] h-[218px]"
          />
          <div className="text-gray-500 text-sm">{formData.r_c_notification_content.length} / 290</div>
        </div>

        <div>
          <h1 className="mb-4 text-[20px] font-semibold">참가비</h1>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleTaxToggle(true)}
              className={`w-[175px] h-[57px]  ${showTaxInput ? "bg-blue-100" : "bg-gray-100 "}`}
            >
              있음
            </button>
            <button
              onClick={() => handleTaxToggle(false)}
              className={`w-[175px] h-[57px] ${!showTaxInput ? "bg-blue-100" : "bg-gray-100 "}`}
            >
              없음
            </button>
          </div>
          {showTaxInput && (
            <div className="next-box bg-blue-100">
              <input
                type="text"
                value={formData.r_c_notification_tax || ""}
                onChange={handleTaxAmount}
                placeholder="참가비를 입력해주세요"
                className="w-[328px] h-8 rounded-lg p-2"
              />
              {inputError && <div className="text-red-500 text-sm mt-1">{inputError}</div>}

              {formData.r_c_notification_tax !== null && formData.r_c_notification_tax > 0 && !inputError && (
                <div className="py-4 px-1 text-gray-600">{formData.r_c_notification_tax.toLocaleString()}원</div>
              )}
            </div>
          )}
        </div>

        <div>
          <h1 className="mb-4 text-[20px] font-semibold">장소</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="hidden"
                value={addressData.zonecode}
                placeholder="우편번호"
                className="border p-2 w-24"
                readOnly
              />
              <button onClick={execDaumPostcode} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                주소 검색
              </button>
            </div>

            <input type="text" value={addressData.address} placeholder="주소" className="border p-2 w-full" readOnly />
            <input
              type="text"
              value={addressData.detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="상세주소를 입력해주세요(선택)"
              className="border p-2 w-full"
            />
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full h-[59px] bg-yellow-200 rounded-full">
          공지글 올리기
        </button>
      </div>
    </div>
  );
};

export default NotificationCreate;
