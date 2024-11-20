import Image from "next/image";

//주소 이미지 컴포넌트
export const LocationImage = ({ selectedId }: { selectedId: number }) => {
  const images = [
    {
      id: 1,
      src: "/asset/Icon/Icon-Location.png",
      alt: "white location" // 배경색 흰색인 주소 아이콘
    },
    {
      id: 2,
      src: "/asset/Icon/State=filled.png",
      alt: "black location" // 배경색 검정색인 주소 아이콘
    }
  ];
  const selectedImage = images.find((image) => image.id === selectedId);
  return (
    <div className="flex w-6 h-6 content-center items-center shrink-0">
      <Image src={selectedImage.src} alt={selectedImage.alt} width={16} height={16} />
    </div>
  );
};
