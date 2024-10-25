import DatePicker from "react-datepicker";
import { CategoryProps } from "../_types/ClubForm";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ko } from "date-fns/locale";

const DateTime = ({ formData, setFormData }: CategoryProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  // FormData에 선택된 날짜와 시간을 저장
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);

    if (date) {
      // 9시간을 더해서 저장(시간 보정)
      const utcDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      setFormData({
        ...formData,
        one_time_club_date_time: utcDate.toISOString() // toISOString()하면 아홉시간 빠지게 됨
      });
    }
  };

  return (
    <div>
      <h1 className="mb-4">언제 만날까요?</h1>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="시간"
        dateFormat="yyyy/MM/dd h:mm aa"
        minDate={new Date()}
        locale={ko}
        className="border-2 border-black p-2 w-[358px]"
        placeholderText="날짜와 시간을 선택하세요"
        timeClassName={handleColor}
      />
      <br />
      <br />
      {startDate && (
        <div className="flex flex-col gap-4">
          <div className="next-box bg-gray-100">선택된 날짜: {startDate.toLocaleDateString()}</div>
          <div className="next-box bg-gray-100">선택된 시간: {startDate.toLocaleTimeString()}</div>
        </div>
      )}
    </div>
  );
};

export default DateTime;
