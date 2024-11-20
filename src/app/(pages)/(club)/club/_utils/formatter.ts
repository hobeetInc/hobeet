// 날짜 formatter
export const formatterDate = (date: string) => {
  const currentDate = new Date(date);
  const addZero = (num: number) => String(num).padStart(2, "0");

  // 오전/오후 판단
  const hours = currentDate.getHours();
  const isPm = hours >= 12 ? "오후" : "오전";
  const displayHours = hours % 12 || 12;

  const formDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일 ${isPm} ${displayHours}:${addZero(currentDate.getMinutes())}`;

  return formDate;
};

// 장소 formatter
export const formatterLocation = (location: string) => {
  const currentLocation = location.split(" ").slice(1).join(" ");

  return currentLocation;
};

// 참가비 formatter
export const formatterTax = (tax: number) => {
  const currentTax = tax === 0 ? "X" : tax.toLocaleString() + "원";

  return currentTax;
};

// 성별 formatter
export const formatterGender = (gender: null | string) => {
  if (gender === null) {
    return "누구나";
  } else if (gender === "남성") {
    return "남성만";
  } else {
    return "여성만";
  }
};

// 나이 formatter
export const formatterAge = (age: number) => {
  if (age === 100) {
    return "제한 없음";
  } else if (age === 50) {
    return "50대";
  } else if (age === 49) {
    return "40대";
  } else if (age === 39) {
    return "30대";
  } else if (age === 29) {
    return "20대";
  } else if (age === 19) {
    return "10대";
  }
};

// 인원제한 formatter
export const formatterPeopleLimit = (limit: number) => {
  if (limit === 100) {
    return "최대 100명";
  } else {
    return `최대 ${limit}명`;
  }
};
