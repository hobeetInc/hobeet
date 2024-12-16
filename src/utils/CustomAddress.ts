// 주소 커스텀 함수

export const CustomAddress = (address: string) => {
  const withoutNumber = address.replace(/\[\d+\]\s*/, "");

  const normalized = withoutNumber.replace(/(특별자치도|특별시|광역시|자치시)/, "").replace(/도$/, "");

  const parts = normalized.split(" ");
  return parts.slice(0, 2).join(" ");
};
