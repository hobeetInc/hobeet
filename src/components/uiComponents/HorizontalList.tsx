import { LocationImage } from "./LocationImage";
import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDate } from "@/utils/CustomDate";
import { HeartImage } from "./HeartImage";
import Image from "next/image";
import Tag from "./Tag";

export const EggPopHorizontalList = ({ eggPop }) => {
  return (
    <div className="w-[248px] h-[91px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
      <Tag tagName="에그팝" />

      <div className="self-stretch text-gray-900 text-subtitle-14">{eggPop.egg_pop_name}</div>

      <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
        <div className="justify-start items-center gap-1 flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <span className="w-4 h-4 relative flex-col justify-start items-start flex">
              <LocationImage selectedId={1} />
            </span>
          </div>
          <span className="text-gray-400 text-body_medium-14 leading-tight">
            {CustomAddress(eggPop.egg_pop_location)}
          </span>
        </div>
        <span className="text-gray-400 text-body_medium-14 leading-tight">{CustomDate(eggPop.egg_pop_date_time)}</span>
      </div>

      <div className="justify-start items-center gap-0.5 inline-flex">
        <span className="text-gray-400 text-body_medium-14 leading-tight">멤버</span>
        <span className="text-gray-400 text-body_medium-14 leading-tight">
          {eggPop.egg_pop_member[0].count} / {eggPop.egg_pop_people_limited}
        </span>
      </div>
    </div>
  );
};

export const EggClubHorizontalList = ({ eggClub }) => {
  return (
    <div className="w-[248px] h-[90px] flex-col justify-start items-start gap-1.5 inline-flex">
      <Tag tagName="에그클럽" />
      <div className="self-stretch h-[65px] flex-col justify-start items-start gap-[5px] flex">
        <div className="self-stretch h-[43px] flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-gray-900 text-subtitle-14">{eggClub.egg_club_name}</div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="justify-start items-center gap-0.5 flex">
              <div className="w-[22px] h-[22px] justify-center items-center flex">
                <div className="w-[22px] h-[22px] bg-gray-100 rounded-full" />
                <Image
                  width={22}
                  height={22}
                  src={eggClub.user_id.user_profile_img}
                  alt="profile"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="grow shrink basis-0 text-gray-400 text-body_medium-14 leading-tight">
                {eggClub.user_id.user_name}
              </div>
            </div>
            <div className="justify-start items-center gap-0.5 flex">
              <div className="text-gray-400 text-body_medium-14 leading-tight">멤버</div>
              <div className="text-gray-400 text-body_medium-14 leading-tight">
                {eggClub.egg_club_member[0].count} / {eggClub.egg_club_people_limited}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start items-center gap-0.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
          </div>
          <div className="justify-start items-center flex">
            <div className="text-gray-400 font-normal text-body-12">
              <HeartImage selectedId={2} />
              <span className="text-body_medium-14 text-gray-400">
                {eggClub.wish_list.length > 100 ? "100+" : eggClub.wish_list.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EggDayHorizontalList = ({ eggDay }) => {
  // 날짜와 시간 포맷팅
  const dateObj = new Date(eggDay.egg_day_date_time);

  const date = dateObj.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric"
  });

  const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
  return (
    <div className="w-[248px] h-[91px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
      <Tag tagName="에그데이" />
      <div className="self-stretch text-gray-900 text-subtitle-14">{eggDay.egg_day_name}</div>
      <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
        <div className="justify-start items-center gap-1 flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
          </div>
          <div className="text-gray-400 text-sm font-medium font-['Pretendard'] leading-tight">
            {eggDay.egg_day_location}
          </div>
        </div>
        <div className="text-gray-400 text-sm font-medium font-['Pretendard'] leading-tight">12월 25일</div>
        <div className="text-gray-400 text-sm font-medium font-['Pretendard'] leading-tight">17:00</div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        <div className="text-gray-400 text-sm font-medium font-['Pretendard'] leading-tight">참여 인원</div>
        <div className="text-gray-400 text-sm font-medium font-['Pretendard'] leading-tight">
          {eggDay.egg_day_people_limited}
        </div>
      </div>
    </div>
  );
};
