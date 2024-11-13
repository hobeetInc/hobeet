// 에그팝, 에그 클럽 세로 리스트 라지 컨텐츠

import Image from "next/image";
import { EggClubVerticalList, EggPopVerticalList } from "./VerticalList";
import { EggClubMainImage } from "./EggClubMainImage";
import { HeartImage } from "./HeartImage";
import Tag from "./TagComponents/Tag";
import Text from "./TextComponents/Text";
import { FaHeart } from "react-icons/fa";

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
    <div className="w-[174px] h-[306px] flex-col justify-start items-start gap-[10px] inline-flex">
      <div className="h-[174px] pl-[126px] pt-[126px] bg-[#d9d9d9] rounded-xl justify-end items-center inline-flex">
        <EggClubMainImage imageURL={eggClub.egg_club_image} isHeart={wishList} size={174} />
      </div>
      <div className="self-stretch h-[124px] flex-col justify-start items-start gap-1.5 flex">
        <EggClubVerticalList eggClub={eggClub} />
      </div>
    </div>
  );
};

export const VerticalContentsListLargeEggClub = ({ eggClub, hostName, hostImage, memberCount, isWished, wishListCount }) => {
  return (
    // 컴포넌트 전체 컨테이너
    <div className=" w-[174px] h-[306px] mb-10 flex-col justify-start items-start gap-2 inline-flex ">
      {/* 썸네일 이미지 영역 */}

      <div className={`relative w-[174px] h-[174px] bg-gray-100 rounded-xl`}>
        <div
          className="w-full h-full rounded-xl object-cover"
          style={{
            background: `url(${eggClub.egg_club_image}) lightgray 50% / cover no-repeat`
          }}
        />
        <div className="absolute bottom-1 right-1">
          <HeartImage selectedId={isWished ? 2 : 1} />
        </div>
      </div>

      {/* 컨텐츠 정보 영역 */}
      <div className="h-[124px] flex-col justify-start items-start gap-1.5 flex">
        {/* 에그클럽 태그 */}
        <Tag tagName="eggclub" />

        {/* 모임 제목 */}
        <div className="self-stretch text-gray-900 text-subtitle-16">
          <Text variant="subtitle-16">{eggClub.egg_club_name}</Text>
        </div>

        {/* 호스트 및 멤버 정보 */}
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
          {/* 호스트 정보 */}
          <div className="justify-start items-center gap-0.5 flex">
            {/* 호스트 프로필 이미지 */}
            <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
              <Image
                src={hostImage}
                alt={hostName}
                width={22}
                height={22}
                className="rounded-full object-cover w-[22px] h-[22px]"
              />
            </div>
            {/* 호스트 이름 */}
            <div className="grow shrink basis-0 ">
              <Text variant="body_medium-14" className="text-gray-400">
                {hostName}
              </Text>
            </div>
          </div>

          {/* 멤버 카운트 */}
          <Text className="justify-start items-center gap-0.5 flex">
            <Text variant="body_medium-14" className=" text-gray-400">
              멤버
            </Text>
            <Text variant="body_medium-14" className=" text-gray-400">
              {memberCount} / {eggClub.egg_club_people_limited}
            </Text>
          </Text>
        </div>

        {/* 찜하기 정보 */}
        <div className="pt-1 justify-start items-center gap-0.5 inline-flex">
          <div className="justify-start items-center flex gap-[2px]">
            <FaHeart color="#F02A49" />

            <Text variant="body-12" className="text-gray-400 ml-[2px]">
              {wishListCount > 100 ? "100+" : wishListCount}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};