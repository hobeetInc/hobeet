"use client";

import { useState, useEffect } from "react";
import { CategoryProps } from "../../_types/ClubForm";

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

const AddressSearch = ({ formData, setFormData }: CategoryProps) => {
  const [addressData, setAddressData] = useState<AddressData>({
    zonecode: "",
    address: "",
    detailAddress: ""
  });

  // 컴포넌트가 마운트될 때 다음 주소 검색 스크립트를 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트가 언마운트될 때 script 태그 제거(클린 업)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 우편 번호 찾을 때 실행되는 함수
  const execDaumPostcode = () => {
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
          one_time_club_location: fullAddress
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
        one_time_club_location: fullAddress
      });
    }
  };

  return (
    <div>
      <h1 className="mb-4">어디서 만날까요?</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input type="text" value={addressData.zonecode} placeholder="우편번호" className="border p-2 w-24" readOnly />
          <button onClick={execDaumPostcode} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            우편번호 찾기
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
  );
};

export default AddressSearch;
