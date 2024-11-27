// 프롭스로 eggPop 정보, hostName(모임장 이름), memberCount(가입 맴버수) 받아야 함

import Image from "next/image";
import { CustomAddress } from "@/utils/CustomAddress";
import { HeartImage } from "../../molecules/Images/HeartImage";
import Tag from "../../atoms/tags/Tag";
import Text from "../../atoms/text/Text";
import { FaHeart } from "react-icons/fa";

// eggPop 상세정보, hostName(모임장 이름), memberCount(모임 참여 인원) 프롭스
// 에그팝 모임 리스트 (medium)
export const VerticalContentsListMediumEggPop = ({ eggPop, hostName, hostImag, memberCount }) => {
  // 날짜와 시간 포맷팅
  const dateObj = new Date(eggPop.egg_pop_date_time);

  const date = dateObj.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric"
  });

  const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="h-[311px] flex-col justify-start items-start gap-2 inline-flex">
      {/* 썸네일 이미지 */}
      <div className="relative ">
        {/* <div
          className="relative flex justify-end items-center "
          style={{
            width: "160px",
            height: "160px",
            padding: "112px 0px 0px 112px",
            borderRadius: "12px",
            background: `url(${eggPop.egg_pop_image}) lightgray 50% / cover no-repeat`,
            display: "flex",
            alignItems: "center"
          }}
        /> */}
        <Image
          src={`${eggPop.egg_pop_image}`}
          width={160}
          height={160}
          className="p-[112px 0px 0px 112px] rounded-[12px] w-[160px] h-[160px]"
          alt={`${eggPop.egg_pop_image}`}
          priority
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="h-[143px] flex-col justify-start items-start gap-1 flex">
        {/* 에그팝 태그 */}
        <Tag tagName="eggpop" />

        {/* 모임 제목 */}
        {/* <div className="self-stretch text-gray-900 text-subtitle-16">{eggPop.egg_pop_name}</div> */}
        <Text variant="subtitle-16" className="overflow-hidden text-overflow-ellipsis line-clamp-1 max-w-[160px]">
          {eggPop.egg_pop_name}
        </Text>
        {/* 위치 정보 */}
        <div className="self-stretch pt-0.5 justify-start items-center gap-0.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <span>
              <Image src={"/asset/Icon/Icon-Location.png"} alt="지도" width={16} height={16} />
            </span>
          </div>

          <div className="grow shrink basis-0">
            <Text variant="body_medium-14" className="text-gray-400">
              {CustomAddress(eggPop.egg_pop_location)}
            </Text>
          </div>
        </div>

        {/* 날짜와 시간 */}
        <div className="justify-start items-center gap-2 inline-flex">
          <Text variant="body_medium-14" className="text-gray-400">
            {date}
          </Text>

          <Text variant="body_medium-14" className="text-gray-400">
            {time}
          </Text>
        </div>

        {/* 호스트와 멤버 정보 */}
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-center gap-0.5 flex">
            <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
              <Image
                src={hostImag}
                alt="profile"
                width={22}
                height={22}
                className="rounded-full object-cover w-[22px] h-[22px]"
              />
            </div>
            <div className="grow shrink basis-0">
              <Text variant="body_medium-14" className="text-gray-400 ">
                {hostName}
              </Text>
            </div>
          </div>
          <div className="justify-start items-center gap-0.5 flex">
            <Text variant="body_medium-14" className="text-gray-400">
              멤버
            </Text>
            <Text variant="body_medium-14" className="text-gray-400">
              {memberCount} / {eggPop.egg_pop_people_limited}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

// eggClub 정보, hostName(모임장 이름), memberCount(모임 참여 인원), wishList(불리언 값으로 true면 하트 / flase면 빈하트), wishListCount(찜 개수) 프롭스
// 에그클럽 모임 리스트 (medium)
export const VerticalContentsListMediumEggClub = ({
  eggClub,
  hostName,
  hostImage,
  memberCount,
  isWished,
  wishListCount
}) => {
  return (
    // 컴포넌트 전체 컨테이너
    <div className="w-40 h-[292px] flex-col justify-start items-start gap-2 inline-flex">
      {/* 썸네일 이미지 영역 */}

      <div className={`relative w-[160px] h-[160px] bg-gray-100 rounded-xl`}>
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
