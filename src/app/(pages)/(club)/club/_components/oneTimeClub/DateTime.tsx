"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ko } from "date-fns/locale";
import { OneTimeProps } from "../../_types/ClubForm";

const DateTime = ({ formData, setFormData }: OneTimeProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    updateDateTime(date, startTime);
  };

  const handleTimeChange = (time: Date | null) => {
    setStartTime(time);
    updateDateTime(startDate, time);
  };

  // 날짜와 시간을 합쳐서 FormData에 저장
  const updateDateTime = (date: Date | null, time: Date | null) => {
    if (date && time) {
      const combinedDate = new Date(date.setHours(time.getHours(), time.getMinutes()));

      setFormData({ ...formData, one_time_club_date_time: combinedDate.toISOString() });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold mb-4">언제 만날까요?</h1>

        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat={`yyyy년 MM월 dd일`}
            minDate={new Date()}
            locale={ko}
            placeholderText="날짜를 선택해주세요"
            className="w-full p-4 bg-gray-50 rounded-lg pr-12"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">몇 시에 만날까요?</h2>

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
          />
          {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Image 
            src="/asset/Icon/time-icon.png" 
            alt="time"
            width={20}
            height={20}
          />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default DateTime;
