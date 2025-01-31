"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ko } from "date-fns/locale";

import Text from "@/components/ui/atoms/text/Text";
import SearchInput from "@/components/ui/atoms/Inputs/SearchInput";
import { EggDayProps } from "@/types/features/club/eggday.types";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { cn } from "@/utils/cn/util";

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

const DateTime = ({ formData, setFormData }: EggDayProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setStartTime(null);
    updateDateTime(date, null);
  };

  const handleTimeChange = (time: Date | null) => {
    setStartTime(time);
    updateDateTime(startDate, time);
  };

  // 날짜와 시간을 합쳐서 FormData에 저장
  const updateDateTime = (date: Date | null, time: Date | null) => {
    if (date && time) {
      const combinedDate = new Date(date.setHours(time.getHours(), time.getMinutes()));

      setFormData({ ...formData, egg_day_date_time: combinedDate.toISOString() });
    } else {
      setFormData({ ...formData, egg_day_date_time: "" });
    }
  };

  const handleClearDate = () => {
    setStartDate(null);
    setStartTime(null);
    setFormData({ ...formData, egg_day_date_time: "" });
  };

  const handleClearTime = () => {
    setStartTime(null);
    setFormData({ ...formData, egg_day_date_time: "" });
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

  return (
    <div className="flex flex-col gap-8">
      <style>{customStyles}</style>
      <div className="flex flex-col gap-2">
        <Text variant="header-18">언제 만날까요?</Text>
        <label htmlFor="datePickerDate" className="cursor-pointer ">
          <SearchInput hasValue={!!startDate} onClear={handleClearDate}>
            <DatePicker
              id="datePickerDate"
              selected={startDate}
              onChange={handleDateChange}
              dateFormat={`yyyy년 MM월 dd일`}
              minDate={new Date()}
              locale={ko}
              placeholderText="날짜를 선택해주세요"
              className={`w-full h-full bg-transparent cursor-pointer focus:outline-none text-body-14 ${
                startDate ? "text-gray-900" : "text-gray-300"
              }`}
              wrapperClassName="w-full"
              autoComplete="off"
            />
          </SearchInput>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <Text variant="header-18">몇 시에 만날까요?</Text>

        <label htmlFor="datePickerTime" className="cursor-pointer">
          <SearchInput
            hasValue={!!startDate}
            onClear={handleClearTime}
            className={cn(isLargeScreen ? "mb-[440px]" : "")}
          >
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
              className={`w-full h-full bg-transparent cursor-pointer focus:outline-none text-body-14 ${
                startTime ? "text-gray-900" : "text-gray-300"
              }`}
              wrapperClassName="w-full"
              filterTime={filterTime}
              disabled={!startDate}
              autoComplete="off"
            />
          </SearchInput>
        </label>
      </div>
    </div>
  );
};

export default DateTime;
