import Image from "next/image";

import { EggClubHorizontalList, EggClubHorizontalListSearch, EggPopHorizontalList } from "./HorizontalList";

// // 에그팝 가로 리스트
export const HorizontalContentsListLargeEggPop = ({ eggPop }) => {
  return (
    <div className=" h-[102px] justify-start items-start gap-2 inline-flex">
      <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px]">
        <Image
          width={102}
          height={102}
          src={eggPop.egg_pop_image}
          alt={eggPop.eggPop_name}
          className="w-[102px] h-[102px] object-cover"
        />
      </div>
      <EggPopHorizontalList eggPop={eggPop} />
    </div>
  );
};

// 에그클럽 가로 리스트
export const HorizontalContentsListLargeEggClub = ({ eggClub }) => {
  return (
    <div className="h-[102px] justify-start items-start gap-2 inline-flex">
      {/* <EggPopMainImage imageURL={eggClub.egg_club_image} size={102} /> */}
      <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px]">
        <Image
          width={102}
          height={102}
          src={eggClub.egg_club_image}
          alt={eggClub.egg_club_name}
          className="w-[102px] h-[102px] object-cover"
        />
      </div>
      <EggClubHorizontalList eggClub={eggClub} />
    </div>
  );
};

export const HorizontalContentsListLargeEggClubImage88Size = ({ eggClub }) => {
  return (
    <div className="h-[88px] justify-start items-start gap-2 inline-flex">
      <div className="w-[88px] h-[88px] relative overflow-hidden rounded-[12px]">
        <Image
          width={88}
          height={88}
          src={eggClub.egg_club_image}
          alt={eggClub.egg_club_name}
          className="w-[88px] h-[88px] object-cover"
        />
      </div>
      <EggClubHorizontalList eggClub={eggClub} />
    </div>
  );
};

export const HorizontalContentsListLargeEggClubSearch = ({ eggClub }) => {
  return (
    <div className="h-[102px] justify-start items-start gap-2 inline-flex">
      <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px]">
        <Image
          width={102}
          height={102}
          src={eggClub.egg_club_image}
          alt={eggClub.egg_club_name}
          className="w-[102px] h-[102px] object-cover"
        />
      </div>
      <EggClubHorizontalListSearch eggClub={eggClub} />
    </div>
  );
};
