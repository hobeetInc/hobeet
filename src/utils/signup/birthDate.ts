export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDaysInMonth = (year: number, month: number): number => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
};

export const formatBirthDate = (year: string, month: string, day: string): string => {
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const calcAge = (birthYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear + 1;
};

export const getYearsList = (count: number = 100): number[] => {
  return [...Array(count)].map((_, i) => new Date().getFullYear() - i);
};

export const getMonthsList = (): number[] => {
  return [...Array(12)].map((_, i) => i + 1);
};

export const getDaysList = (year: number, month: number): number[] => {
  const daysInMonth = getDaysInMonth(year, month);
  return [...Array(daysInMonth)].map((_, i) => i + 1);
};
