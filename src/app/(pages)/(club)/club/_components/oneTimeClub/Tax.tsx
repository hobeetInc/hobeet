"use client";
import ClubCreateInput from "@/components/ui/atoms/Inputs/ClubCreateInput";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { EggPopProps } from "@/types/features/club/eggpop.types";
import { cn } from "@/utils/cn/util";
import { useState } from "react";

const Tax = ({ formData, setFormData }: EggPopProps) => {
  const [showTaxInput, setShowTaxInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  const handleTaxToggle = (hasTax: boolean) => {
    setShowTaxInput(hasTax);
    setInputError("");

    if (!hasTax) {
      setFormData({ ...formData, egg_pop_tax: 0 });
    } else {
      setFormData({ ...formData, egg_pop_tax: null });
    }
  };

  const handleTaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 문자열이면 null로 설정
    if (value === "") {
      setFormData({ ...formData, egg_pop_tax: null });
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
    setFormData({ ...formData, egg_pop_tax: numValue });
  };

  return (
    <div className="flex flex-col gap-2">
      <Text variant="header-18">참가비가 있나요?</Text>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleTaxToggle(true)}
          className={`${
            isLargeScreen ? "w-[322px]" : "w-[173px]"
          } h-12 px-4 rounded-lg border  justify-center items-center gap-2.5 inline-flex  ${
            showTaxInput ? "border-primary-500 border-2" : "border-gray-100"
          } `}
        >
          <Text variant="subtitle-14" className={`${showTaxInput ? "text-primary-500" : "text-gray-800"}`}>
            있음
          </Text>
        </button>
        <button
          onClick={() => handleTaxToggle(false)}
          className={`${
            isLargeScreen ? "w-[322px]" : "w-[173px]"
          } h-12 px-4 rounded-lg border justify-center items-center gap-2.5 inline-flex  ${
            !showTaxInput ? "border-primary-500 border-2" : "border-gray-100"
          } `}
        >
          <Text variant="subtitle-14" className={`${!showTaxInput ? "text-primary-500" : "text-gray-800"}`}>
            없음
          </Text>
        </button>
      </div>

      <div className={cn(isLargeScreen ? "mb-[550px]" : "fixed top-[181px]")}>
        {showTaxInput && (
          <div>
            <ClubCreateInput
              type="text"
              value={formData.egg_pop_tax || ""}
              onChange={handleTaxAmount}
              placeholder="금액을 입력해주세요"
            />

            <div className={cn(isLargeScreen ? "mx-2 -mb-[100px]" : "mx-2")}>
              {inputError && <div className="text-red-500 text-sm mt-1">{inputError}</div>}

              {formData.egg_pop_tax !== null && formData.egg_pop_tax > 0 && !inputError && (
                <div className="py-4 px-1 text-gray-600">{formData.egg_pop_tax.toLocaleString()}원</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tax;
