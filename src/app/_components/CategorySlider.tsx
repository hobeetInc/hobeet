"use client";
import { Category } from "@/types/category.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Text from "@/components/uiComponents/TextComponents/Text";
import { cn } from "@/utils/cn/util";

const categories: Category[] = [
  { id: 0, name: "에그팝", icon: "/asset/Category icon_voltage.png", alt: "eggpop" },
  { id: 1, name: "아웃도어/여행", icon: "/asset/Category icon_airplane.png", alt: "여행" },
  { id: 5, name: "운동/스포츠관람", icon: "/asset/Category icon_tennis.png", alt: "운동" },
  { id: 3, name: "사교/인맥", icon: "/asset/Category icon_hot-beverage.png", alt: "사교" },
  { id: 6, name: "문화/공연/축제", icon: "/asset/Category icon_guitar.png", alt: "문화" },
  { id: 4, name: "사진/영상", icon: "/asset/Category icon_clapper-board.png", alt: "사진" },
  { id: 2, name: "댄스/무용", icon: "/asset/Category icon_woman-dancing.png", alt: "댄스" }
];

const CategorySlider = () => {
  const router = useRouter();

  const handleCategory = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <div
      className={cn("relative w-full max-w-full mx-auto px-4 mt-4 overflow-x-auto scrollbar-hide whitespace-nowrap")}
    >
      <div className={cn("flex items-center space-x-4")}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn("flex flex-col items-center flex-shrink-0")}
            onClick={() => handleCategory(category.id)}
          >
            <div className={cn("flex w-16 h-16 justify-center items-center rounded-full bg-[#fff1cc]")}>
              <Image width={48} height={48} src={category.icon} alt={category.alt} className={cn("w-12 h-12")} />
            </div>
            <div className={cn("text-center mt-1")}>
              <Text variant="body-12">{category.name}</Text>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
