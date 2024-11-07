import Image from "next/image";
// 하트 이미지를 선택하는 컴포넌트(<HeartImage selectedId={숫자} />)
export const HeartImage = ({ selectedId }: { selectedId: number }) => {
  const images = [
    {
      id: 1,
      src: "/asset/Icon/Heart.png",
      alt: "white heart" //빈 흰색 테두리 하트
    },
    {
      id: 2,
      src: "/asset/Icon/Icon-Heart.png",
      alt: "red heart" //빨간색 채워진 하트
    },
    {
      id: 3,
      src: "/asset/Icon/Heart-Outline.png",
      alt: "break heart" // 빈 검정색 테두리 하트
    }
  ];
  const selectedImage = images.find((image) => image.id === selectedId);

  return (
    <div className="flex w-6 h-6 content-center items-center shrink-0">
      <Image src={selectedImage.src} alt={selectedImage.alt} width={24} height={24} />
    </div>
  );
};
