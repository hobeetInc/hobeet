import { CustomAddress } from "@/utils/CustomAddress";
import { LocationImage } from "./LocationImage";
import { CustomDate } from "@/utils/CustomDate";
import Image from "next/image";
import { HeartImage } from "./HeartImage";
import Tag from "./TagComponents/Tag";

export const EggPopVerticalList = ({ eggPop }) => {
  return (
    <div className="flex w-[174px] flex-col items-start gap-1">
      <Tag tagName="eggpop" variant="yellow" />
      {/* 에그팝 제목*/}
      <span
        className="self-stretch overflow-hidden text-ellipsis text-subtitle-16 font-semibold leading-[21.6px] text-gray-900"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2
        }}
      >
        {eggPop.egg_pop_name}
      </span>
      <div className="flex pt-[2px] items-center gap-[2px] self-stretch">
        <LocationImage selectedId={1} />
        <span
          className="flex-1 overflow-hidden text-ellipsis text-body_medium-14 font-medium leading-[20.3px] text-gray-400"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1
          }}
        >
          {/* 모임을 가지는 주소 */}
          {CustomAddress(eggPop.egg_pop_location)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {/* 모임을 가지는 일정 */}
        <span className="text-body_medium-14">{CustomDate(eggPop.egg_pop_date_time)}</span>
      </div>
      <div className="flex items-center gap-2 self-stretch">
        <div className="flex max-w-[93px] items-center gap-[2px]">
          <div className="w-[22px] h-[22px] rounded-full bg-gray-100">
            {/* 모임장 프로필 이미지 */}
            <Image
              width={22}
              height={22}
              src={eggPop.user_id.user_profile_img}
              alt="profile"
              className="rounded-full object-cover"
            />
          </div>
          {/* 모임장 이름 */}
          <div className="flex-1 overflow-hidden text-ellipsis text-gray-400 text-body_medium-14">
            {eggPop.user_id.user_name}
          </div>
        </div>
        <div className="flex items-center gap-[2px]">
          <span className="text-body_medium-14 text-gray-400">멤버</span>
          {/* 모임 입장 수 / 입장 제한 수 */}
          <span className="text-body_medium-14 text-gray-400">
            {eggPop.egg_pop_member[0].count} / {eggPop.egg_pop_people_limited}
          </span>
        </div>
      </div>
    </div>
  );
};

export const EggClubVerticalList = ({ eggClub }) => {
  return (
    <div className="flex w-[174px] flex-col items-start gap-[6px]">
      <Tag tagName="eggclub" variant="black" />
      <span
        className="self-stretch overflow-hidden text-ellipsis text-subtitle-16 font-semibold leading-[21.6px] text-gray-900"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2
        }}
      >
        {/* 에그클럽 제목 */}
        {eggClub.egg_club_name}
      </span>
      <div className="flex items-center gap-2 self-stretch">
        <div className="flex max-w-[93px] items-center gap-[2px]">
          <div className="w-[22px] h-[22px] rounded-full bg-gray-100">
            {/* 모임장 프로필 이미지 */}
            <Image
              width={22}
              height={22}
              src={eggClub.user_id.user_profile_img}
              alt="profile"
              className="rounded-full object-cover"
            />
          </div>
          {/* 모임장 이름 */}
          <div className="flex-1 overflow-hidden text-ellipsis text-gray-400 text-body_medium-14">
            {eggClub.user_id.user_name}
          </div>
        </div>
        <div className="flex pt-1 items-center gap-[2px]">
          <HeartImage selectedId={2} />
          {/* 찜한 수 */}
          <span className="text-body_medium-14 text-gray-400">
            {eggClub.wish_list.length > 100 ? "100+" : eggClub.wish_list.length}
          </span>
        </div>
      </div>
    </div>
  );
};
