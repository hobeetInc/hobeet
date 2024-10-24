import DatePicker from "react-datepicker";
import { CategoryProps } from "../_types/ClubForm";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ko } from "date-fns/locale";

const DateTime = ({ formData, setFormData }: CategoryProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  let handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  // FormData에 선택된 날짜와 시간을 저장
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);

    if (date) {
      setFormData({
        ...formData,
        one_time_club_date_time: date.toISOString()
      });
    }
  };

  return (
    <div>
      <h1 className="mb-4">모임 날짜와 시간을 선택해주세요</h1>
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
        <p>
          선택된 날짜: {startDate.toLocaleDateString()}
          <br />
          선택된 시간: {startDate.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default DateTime;
