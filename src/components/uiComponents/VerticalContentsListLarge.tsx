// 에그팝, 에그 클럽 세로 리스트 라지 컨텐츠

import Image from "next/image";
import { EggClubVerticalList, EggPopVerticalList } from "./VerticalList";
import { EggClubMainImage } from "./EggClubMainImage";

export const EggPopVerticalContentsListLarge = ({ eggPop }) => {
  return (
    <div className="w-[174px] h-[325px] flex-col justify-start items-start gap-2 inline-flex">
      <div className="h-[174px] relative bg-gray-100 rounded-xl">
        <Image src={eggPop.egg_pop_image} alt={eggPop.egg_pop_name} width={174} height={174} />
      </div>
      <div className="self-stretch h-[143px] flex-col justify-start items-start gap-1 flex">
        <EggPopVerticalList eggPop={eggPop} />
      </div>
    </div>
  );
};

// wishList true는 하트, false면 빈하트
export const EggClubVerticalContentsListLarge = ({ eggClub, wishList }) => {
  return (
    <div className="w-[174px] h-[306px] flex-col justify-start items-start gap-2 inline-flex">
      <div className="h-[174px] pl-[126px] pt-[126px] bg-[#d9d9d9] rounded-xl justify-end items-center inline-flex">
        <EggClubMainImage imageURL={eggClub.egg_club_image} isHeart={wishList} size={174} />
      </div>
      <div className="self-stretch h-[124px] flex-col justify-start items-start gap-1.5 flex">
        <EggClubVerticalList eggClub={eggClub} />
      </div>
    </div>
  );
};
