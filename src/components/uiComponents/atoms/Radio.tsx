// true를 받으면 흰 배경 동그라미에 노란색 굵은 테두리가 감싸진 모양 반환 (선택되어 있는 느낌)
// false를 받으면 흰 배경 동그라미에 회색 얇은 테두리가 감싸진 모양 반환 (선택 안 되어 있는 느낌)
const Radio = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <div className="w-6 h-6 p-0.5 justify-center items-center inline-flex">
      {isSelected ? (
        <div className="w-5 h-5 p-[5px] bg-primary-400 rounded-[10px] justify-center items-center inline-flex">
          <div className="w-2.5 h-2.5 relative bg-white rounded-[5px]"></div>
        </div>
      ) : (
        <div className="w-5 h-5 p-1 bg-white rounded-[10px] border border-gray-200 justify-center items-center inline-flex">
          <div className="w-3 h-3 relative bg-white rounded-md"></div>
        </div>
      )}
    </div>
  );
};
export default Radio;
