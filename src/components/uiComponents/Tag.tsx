// tagName으로 에그팝, 에그클럽, 에그데이, 에그장, 에그즈
// variant으로 black 혹은 yellow 받고 variant에 따라 에그장 달라짐
// 에그장이 아닐 땐 그냥 tagName만 보내면 됨
const Tag = ({ tagName, variant }: { tagName: string; variant?: string }) => {
  const baseStyle = "h-[19px] px-2 py-0.5 rounded-[124px] justify-center items-center inline-flex";

  const tagStyle =
    tagName === "에그팝"
      ? `${baseStyle} bg-[#fdb800] text-[#0c0c0c]`
      : tagName === "에그클럽"
      ? `${baseStyle} bg-[#262626] text-white`
      : tagName === "에그데이" || tagName === "에그즈"
      ? `${baseStyle} bg-[#ffe399] text-[#0c0c0c]`
      : tagName === "에그장"
      ? `${baseStyle} ${variant === "black" ? "bg-[#262626] text-white" : "bg-[#fdb800] text-[#0c0c0c]"}`
      : `${baseStyle} bg-gray-200 text-black`;
  return (
    <div className={tagStyle}>
      <div className="text-[10px] font-normal font-['Pretendard'] leading-[14.5px]">{tagName}</div>
    </div>
  );
};
export default Tag;
