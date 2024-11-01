"use client";
import { useState } from "react";
import { OneTimeProps } from "../../_types/ClubForm";

const Tax = ({ formData, setFormData }: OneTimeProps) => {
  const [showTaxInput, setShowTaxInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");

  const handleTaxToggle = (hasTax: boolean) => {
    setShowTaxInput(hasTax);
    setInputError("");

    if (!hasTax) {
      setFormData({ ...formData, one_time_tax: 0 });
    } else {
      setFormData({ ...formData, one_time_tax: null });
    }
  };

  const handleTaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 문자열이면 null로 설정
    if (value === "") {
      setFormData({ ...formData, one_time_tax: null });
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
    setFormData({ ...formData, one_time_tax: numValue });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>참가비가 있나요?</h1>
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
        <div className="next-box bg-gray-100">
          <input
            type="text"
            value={formData.one_time_tax || ""}
            onChange={handleTaxAmount}
            placeholder="참가비를 입력해주세요"
            className="w-[328px] h-8 rounded-lg p-2"
          />
          {inputError && <div className="text-red-500 text-sm mt-1">{inputError}</div>}

          {formData.one_time_tax !== null && formData.one_time_tax > 0 && !inputError && (
            <div className="py-4 px-1 text-gray-600">{formData.one_time_tax.toLocaleString()}원</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tax;
