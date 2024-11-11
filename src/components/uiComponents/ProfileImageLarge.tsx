import Image from "next/image";

// 프로필 사진 큰 버전
export const ProfileImageLarge = ({ image }) => {
  return (
    <div className="flex justify-center items-center w-[52px] h-[52px] relative bg-gray-100 rounded-[26px] overflow-hidden">
      <Image src={image} alt="에그장 이미지" width={52} height={52} className="w-[52px] h-[52px] object-cover" />
    </div>
  );
};

// 프로필 사진 작은 버전
export const ProfileImageSmall = ({ image }) => {
  return (
    <div className="flex justify-center items-center w-[40px] h-[40px] relative bg-gray-100 rounded-[26px] overflow-hidden">
      <Image src={image} alt="에그즈 이미지" width={40} height={40} className="w-[40px] h-[40px] object-cover" />
    </div>
  );
};
