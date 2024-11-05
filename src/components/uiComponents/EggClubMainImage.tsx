import Image from "next/image";
import { HeartImage } from "./HeartImage";

// 에그 클럽 메인 이미지 컴포넌트(하트 아이콘 포함)
// imageURL : 이미지 URL
// isHeart : 하트 아이콘 여부(1: 비선택, 2: 선택)
// size : 이미지 크기
export const EggClubMainImage = ({ imageURL, isHeart, size }: { imageURL: string; isHeart: boolean; size: number }) => {
  return (
    <div className={`relative w-[${size}px] h-[${size}px] bg-[#D9D9D9] rounded-xl`}>
      <div
        className="w-full h-full rounded-xl object-cover"
        style={{
          background: `url(${imageURL}) lightgray 50% / cover no-repeat`
        }}
      />
      <div className="absolute bottom-1 right-1">
        <HeartImage selectedId={isHeart ? 2 : 1} />
      </div>
    </div>
  );
};

// 에그 팝 메인 이미지 컴포넌트
// imageURL : 이미지 URL
// size : 이미지 크기
export const EggPopMainImage = ({ imageURL, size }: { imageURL: string; size: number }) => {
  return (
    <div className={`relative w-[${size}px] h-[${size}px] rounded-xl bg-[#D9D9D9]`}>
      <Image src={imageURL} alt="에그팝 메인 이미지" width={size} height={size} className="rounded-xl object-cover" />
    </div>
  );
};
