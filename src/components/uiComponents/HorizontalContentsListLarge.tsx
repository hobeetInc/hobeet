import Image from "next/image";
import { EggPopMainImage } from "./EggClubMainImage";
import { EggClubHorizontalList, EggPopHorizontalList } from "./HorizontalList";

// 에그팝 가로 리스트
export const HorizontalContentsListLargeEggPop = ({ eggPop }) => {
  return (
    <div className="w-[358px] h-[102px] justify-start items-start gap-2 inline-flex">
      <EggPopMainImage imageURL={eggPop.egg_pop_image} size={102} />
      <EggPopHorizontalList eggPop={eggPop} />
    </div>
  );
};

// 에그클럽 가로 리스트
export const HorizontalContentsListLargeEggClub = ({ eggClub }) => {
  return (
    <div className="w-[358px] h-[102px] justify-start items-start gap-2 inline-flex">
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

// 에그데이 가로 리스트
// export const HorizontalContentsListLargeEggDat = ({ eggDay }) => {
//   return (
//     <div className="w-[358px] h-[102px] justify-start items-start gap-2 inline-flex">
//       <EggPopMainImage imageURL={eggDay.egg_club_image} size={102} />
//       <EggDayHorizontalList eggDay={eggDay} />
//     </div>
//   );
// };
