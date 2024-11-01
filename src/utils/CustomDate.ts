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
