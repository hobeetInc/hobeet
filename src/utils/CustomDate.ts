import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

// 날짜 커스텀 함수
export const CustomDate = (date: string) => {
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MM월 dd일(EEE) HH:mm", { locale: ko });
  } catch (error) {
    console.error("Invalid date format", error);
    return "Invalid date";
  }
};

type DateTimeFormat = {
  date: string;
  time: string;
};

export const customDateNotWeek = (dateString: string | null | undefined): DateTimeFormat => {
  if (!dateString) {
    return {
      date: "유효하지 않은 날짜",
      time: "유효하지 않은 시간"
    };
  }

  try {
    const parsedDate = parseISO(dateString);
    return {
      date: format(parsedDate, "MM월 dd일"),
      time: format(parsedDate, "HH:mm")
    };
  } catch (error) {
    console.error("날짜 포멧팅 실패:", dateString, error);
    return {
      date: "유효하지 않은 날짜",
      time: "유효하지 않은 시간"
    };
  }
};

export const customDateFormat = (dateString: string | null | undefined) => {
  if (!dateString) {
    return "날짜 정보 없음";
  }

  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, "yyyy. MM. dd");
  } catch (error) {
    console.error("날짜 포멧팅 실패:", dateString, error);
    return "유효하지 않은 날짜 형식";
  }
};
