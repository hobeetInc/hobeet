"use client";

import { useState } from "react";
import { OneTimeProps } from "../../_types/ClubForm";

type MemeberTypeProps = OneTimeProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};

const MemberType = ({
  formData,
  setFormData,
  selectedGender,
  setSelectedGender,
  selectedAge,
  setSelectedAge
}: MemeberTypeProps) => {
  const [genderToggle, setGenderToggle] = useState<boolean>(false);
  const [ageToggle, setAgeToggle] = useState<boolean>(false);

  const gender = ["누구나", "여자만", "남자만"];
  const age = ["누구나", "10대", "20대", "30대", "40대", "50대 이상"];

  // 성별 선택 핸들러
  const handleGender = (e: React.MouseEvent, gender: string) => {
    e.stopPropagation();

    setSelectedGender(gender);

    if (gender === "누구나") {
      setFormData({ ...formData, one_time_gender: null });
    } else if (gender === "여자만") {
      setFormData({ ...formData, one_time_gender: "여성" });
    } else if (gender === "남자만") {
      setFormData({ ...formData, one_time_gender: "남성" });
    }
  };

  // 나이 선택 핸들러
  const handleAge = (e: React.MouseEvent, age: string) => {
    e.stopPropagation();
    setSelectedAge(age);

    if (age === "누구나") {
      setFormData({ ...formData, one_time_age: null });
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

  const handlePeopleLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFormData({ ...formData, one_time_people_limited: null });
    } else {
      setFormData({ ...formData, one_time_people_limited: parseInt(e.target.value) });
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
        <div className="next-box bg-gray-100 flex flex-col gap-4">
          <h1>최대인원수</h1>
          <input
            type="number"
            placeholder="인원수를 적지 않으면 인원제한 없이 생성됩니다"
            className="w-[328px] h-8 rounded-lg p-2"
            value={formData.one_time_people_limited || ""}
            onChange={handlePeopleLimit}
            min={2}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberType;
