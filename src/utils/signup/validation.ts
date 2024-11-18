export const NAME_REGEX = /^[가-힣]{2,5}$/;

export const validateName = (name: string) => {
  const trimmedName = name.trim();
  if (!trimmedName) return "이름을 입력해주세요.";
  if (!NAME_REGEX.test(trimmedName)) return "이름은 한글 2~5자로 입력해야 합니다.";
  return "";
};

export const validateGender = (gender: string) => {
  if (!gender) return "성별을 선택해주세요.";
  return "";
};

export const validateBirthDate = (year: string, month: string, day: string) => {
  if (!year || !month || !day) return "생년월일을 모두 선택해주세요.";
  const today = new Date();
  const selectedDate = new Date(Number(year), Number(month) - 1, Number(day));
  if (selectedDate > today) return "오늘 이후의 날짜는 선택할 수 없습니다.";
  return "";
};
