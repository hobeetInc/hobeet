// 프롭스로 eggPop 정보, hostName(모임장 이름), memberCount(가입 맴버수) 받아야 함

import { EggPopMainImage } from "./EggClubMainImage";
import Image from "next/image";
import { EggClubMainImage } from "./EggClubMainImage";
import Tag from "./Tag";

// eggPop 상세정보, hostName(모임장 이름), memberCount(모임 참여 인원) 프롭스
// 에그팝 모임 리스트 (medium)
export const VerticalContentsListMediumEggPop = ({ eggPop, hostName, memberCount }) => {
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
      <EggPopMainImage imageURL={eggPop.egg_pop_image} size={160} />

      {/* 콘텐츠 영역 */}
      <div className="h-[143px] flex-col justify-start items-start gap-1 flex">
        {/* 에그팝 태그 */}
        <Tag tagName="에그팝" />

        {/* 모임 제목 */}
        <div className="self-stretch text-gray-900 text-subtitle-16">{eggPop.egg_pop_name}</div>

        {/* 위치 정보 */}
        <div className="self-stretch pt-0.5 justify-start items-center gap-0.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
          </div>
          <div className="grow shrink basis-0 text-gray-400 text-body_medium-14">{eggPop.egg_pop_location}</div>
        </div>

        {/* 날짜와 시간 */}
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="text-gray-400 text-body_medium-14 ">{date}</div>
          <div className="text-gray-400 text-body-medium-14 ">{time}</div>
        </div>

        {/* 호스트와 멤버 정보 */}
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-center gap-0.5 flex">
            <div className="w-[22px] h-[22px] relative">
              <Image
                src={eggPop.egg_pop_image}
                alt={eggPop.egg_pop_name}
                width={22}
                height={22}
                className="rounded-full object-cover"
              />
            </div>
            <div className="grow shrink basis-0 text-gray-400 text-body-medium-14">{hostName}</div>
          </div>
          <div className="justify-start items-center gap-0.5 flex">
            <div className="text-gray-400 text-body-medium-14">멤버</div>
            <div className="text-gray-400 text-body-medium-14">
              {memberCount}/{eggPop.egg_pop_people_limited}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// eggClub 정보, hostName(모임장 이름), memberCount(모임 참여 인원), wishList(불리언 값으로 true면 하트 / flase면 빈하트), wishListCount(찜 개수) 프롭스
// 에그클럽 모임 리스트 (medium)
export const VerticalContentsListMediumEggClub = (eggClub, hostName, memberCount, wishList, wishListCount) => {
  return (
    // 컴포넌트 전체 컨테이너
    <div className="w-40 h-[292px] flex-col justify-start items-start gap-2 inline-flex">
      {/* 썸네일 이미지 영역 */}
      <EggClubMainImage imageURL={eggClub.egg_club_image} isHeart={wishList} size={160} />

      {/* 컨텐츠 정보 영역 */}
      <div className="h-[124px] flex-col justify-start items-start gap-1.5 flex">
        {/* 에그클럽 태그 */}
        <Tag tagName="에그클럽" />

        {/* 모임 제목 */}
        <div className="self-stretch text-gray-900 text-subtitle-16">{eggClub.egg_club_name}</div>

        {/* 호스트 및 멤버 정보 */}
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
          {/* 호스트 정보 */}
          <div className="justify-start items-center gap-0.5 flex">
            {/* 호스트 프로필 이미지 */}
            <div className="w-[22px] h-[22px] relative">
              <Image
                src={eggClub.egg_club_image}
                alt={eggClub.egg_club_name}
                width={22}
                height={22}
                className="rounded-full object-cover"
              />
            </div>
            {/* 호스트 이름 */}
            <div className="grow shrink basis-0 text-gray-400 text-body_medium-14">{hostName}</div>
          </div>

          {/* 멤버 카운트 */}
          <div className="justify-start items-center gap-0.5 flex">
            <div className="text-gray-400 text-body-medium-14">멤버</div>
            <div className="text-gray-400 text-body-medium-14">
              {memberCount}/{eggClub.egg_club_people_limited}
            </div>
          </div>
        </div>

        {/* 찜하기 정보 */}
        <div className="pt-1 justify-start items-center gap-0.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
          </div>
          <div className="justify-start items-center flex">
            <div className="text-gray-400 text-body-12">{wishListCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
