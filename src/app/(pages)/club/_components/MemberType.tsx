"use client";

import { useState } from "react";
import { CategoryProps } from "../_types/ClubForm";

const MemberType = ({ formData, setFormData }: CategoryProps) => {
  const [genderToggle, setGenderToggle] = useState<boolean>(false);
  const [ageToggle, setAgeToggle] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");

  const gender = ["누구나", "여자만", "남자만"];
  const age = ["누구나", "10대", "20대", "30대", "40대", "50대 이상"];

  // 성별 선택 핸들러
  const handleGender = (e: React.MouseEvent, gender: string) => {
    e.stopPropagation();
    setSelectedGender(gender);

    setFormData({ ...formData, one_time_gender: gender });
  };

  // 나이 선택 핸들러
  const handleAge = (e: React.MouseEvent, age: string) => {
    e.stopPropagation();
    setSelectedAge(age);

    if (age === "누구나") {
      setFormData({ ...formData, one_time_age: 100 });
    } else if (age === "10대") {
      setFormData({ ...formData, one_time_age: 19 });
    } else if (age === "20대") {
      setFormData({ ...formData, one_time_age: 29 });
    } else if (age === "30대") {
      setFormData({ ...formData, one_time_age: 39 });
    } else if (age === "40대") {
      setFormData({ ...formData, one_time_age: 49 });
    } else if (age === "50대 이상") {
      setFormData({ ...formData, one_time_age: 50 });
    }
  };

  return (
    <div>
      <h1 className="mb-4">어떤 맴버와 함께하고 싶나요?</h1>

      <div className="flex flex-col gap-4">
        <div onClick={() => setGenderToggle((prev) => !prev)} className="next-box bg-gray-100 cursor-pointer">
          성별
          <div className="flex flex-row justify-center flex-wrap gap-1 m-2" onClick={(e) => e.stopPropagation()}>
            {genderToggle &&
              gender.map((element) => (
                <button
                  key={element}
                  onClick={(e) => handleGender(e, element)}
                  className={`border-2 border-black p-1 rounded-lg ${
                    selectedGender === element ? "bg-blue-200" : "bg-white"
                  }`}
                >
                  {element}
                </button>
              ))}
          </div>
        </div>

        <div onClick={() => setAgeToggle((prev) => !prev)} className="next-box bg-gray-100 cursor-pointer">
          나이
          <div className="flex flex-row justify-center flex-wrap gap-1 m-2" onClick={(e) => e.stopPropagation()}>
            {ageToggle &&
              age.map((element) => (
                <button
                  key={element}
                  onClick={(e) => handleAge(e, element)}
                  className={`border-2 border-black p-1 rounded-lg ${
                    selectedAge === element ? "bg-blue-200" : "bg-white"
                  }`}
                >
                  {element}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberType;
