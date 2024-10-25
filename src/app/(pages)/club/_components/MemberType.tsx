"use client";

import { useState } from "react";
import { CategoryProps } from "../_types/ClubForm";

const MemberType = ({ formData, setFormData }: CategoryProps) => {
  const [genderToggle, setGenderToggle] = useState<boolean>(false);
  const [ageToggle, setAgeToggle] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const gender = ["누구나", "여자만", "남자만"];
  const age = ["누구나", "10대", "20대", "30대", "40대", "50대 이상"];

  // 성별 선택 핸들러
  const handleGender = (gender: string | null) => {
    setSelectedGender(gender);
  };

  // 나이 선택 핸들러
  const handleAge = (age: string | null) => {
    setSelectedAge(age);
  };

  return (
    <div>
      <h1 className="mb-4">어떤 맴버와 함께하고 싶나요?</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            setGenderToggle((e) => !e);
          }}
          className="next-box bg-gray-100"
        >
          성별
          <div className="flex flex-row justify-center flex-wrap gap-1 m-2">
            {genderToggle
              ? gender?.map((element) => (
                  <button
                    key={element}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGender(element);
                    }}
                    className={`border-2 border-black bg-white p-1 rounded-lg ${
                      element === selectedGender ? "bg-blue-200" : ""
                    }`}
                  >
                    {element}
                  </button>
                ))
              : ""}
          </div>
        </button>

        <button
          onClick={() => {
            setAgeToggle((e) => !e);
          }}
          className="next-box bg-gray-100"
        >
          나이
          <div className="flex flex-row justify-center flex-wrap gap-1 m-2">
            {ageToggle
              ? age?.map((element) => (
                  <button
                    key={element}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAge(element);
                    }}
                    className={`border-2 border-black bg-white p-1 rounded-lg ${
                      element === selectedAge ? "bg-blue-200" : ""
                    }`}
                  >
                    {element}
                  </button>
                ))
              : ""}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MemberType;
