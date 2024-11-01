// 주소 커스텀 함수

export const CustomAddress = (address: string) => {
  const withoutNumber = address.replace(/\[\d+\]\s*/, "");
  const parts = withoutNumber.split(" ");
  return parts.slice(0, 2).join(" ");
};
