"use client";
import { useState } from "react";
import { CategoryProps } from "../../_types/ClubForm";

const Tax = ({ formData, setFormData }: CategoryProps) => {
  const [showTaxInput, setShowTaxInput] = useState<boolean>(false);

  const handleTaxToggle = (hasTax: boolean) => {
    setShowTaxInput(hasTax);

    if (!hasTax) {
      setFormData({ ...formData, one_time_tax: 0 });
    }
  };

  const handleTaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, one_time_tax: parseInt(e.target.value) });
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
            type="number"
            value={formData.one_time_tax || ""}
            onChange={handleTaxAmount}
            placeholder="참가비를 입력해주세요"
            className="w-[328px] h-8 rounded-lg p-2"
          />
          {formData.one_time_tax > 0 && (
            <div className="py-4 px-1 text-gray-600">{formData.one_time_tax.toLocaleString()}원</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tax;
