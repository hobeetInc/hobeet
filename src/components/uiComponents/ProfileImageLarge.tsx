import Image from "next/image";

// 프로필 사진 큰 버전
export const ProfileImageLarge = ({ image }) => {
  return (
    <div className="w-[52px] h-[52px] relative bg-gray-100 rounded-[26px]">
      <Image src={image} alt="에그장 이미지" width={52} height={52} />
    </div>
  );
};

// 프로필 사진 작은 버전
export const ProfileImageSmall = ({ image }) => {
  return (
    <div className="w-[40px] h-[40px] relative bg-gray-100 rounded-[26px]">
      <Image src={image} alt="에그즈 이미지" width={40} height={40} />
    </div>
  );
};
