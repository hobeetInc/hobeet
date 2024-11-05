"use client";
import { Category } from "@/types/category.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories: Category[] = [
  { id: 0, name: "에그팝", icon: "/asset/Category icon_voltage.png", alt: "에그팝" },
  { id: 1, name: "아웃도어/여행", icon: "/asset/Category icon_airplane.png", alt: "아웃도어/여행" },
  { id: 2, name: "운동/스포츠관람", icon: "/asset/Category icon_tennis.png", alt: "운동/스포츠관람" },
  { id: 3, name: "사교/인맥", icon: "/asset/Category icon_hot-beverage.png", alt: "사교/인맥" },
  { id: 4, name: "문화/공연/축제", icon: "/asset/Category icon_guitar.png", alt: "문화/공연/축제" },
  { id: 5, name: "사진/영상", icon: "/asset/Category icon_clapper-board.png", alt: "사진/영상" },
  { id: 6, name: "댄스/무용", icon: "/asset/Category icon_woman-dancing.png", alt: "댄스/무용" }
];

const CategorySlider = () => {
  const router = useRouter();

  const handleCategory = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex items-center gap-[6px] px-4 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0"
              onClick={() => handleCategory(category.id)}
            >
              <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
                <Image width={48} height={48} src={category.icon} alt={category.alt} className="w-12 h-12" />
              </div>
              <div className="self-stretch text-center text-xs leading-[135%]">
                <p>{category.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
