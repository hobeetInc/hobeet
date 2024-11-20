import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDate } from "@/utils/CustomDate";
import Image from "next/image";
import Tag from "@/components/uiComponents/atoms/tags/Tag";

export const EggPopHorizontalList = ({ eggPop }) => {
  return (
    <div className="min-w-[190px] h-[91px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
      <Tag tagName="eggpop" />

      <div className="self-stretch text-gray-900 text-subtitle-14">{eggPop.egg_pop_name}</div>

      <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
        <div className="justify-start items-center gap-1 flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <span>
              <Image src={"/asset/Icon/Icon-Location.png"} alt="지도" width={16} height={16} />
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
    <div className="min-w-[190px] h-[90px] flex-col justify-start items-start gap-1.5 inline-flex">
      <Tag tagName="eggclub" />
      <div className="self-stretch h-[65px] flex-col justify-start items-start gap-[5px] flex">
        <div className="self-stretch h-[43px] flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-gray-900 text-subtitle-14">{eggClub.egg_club_name}</div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="justify-start items-center gap-0.5 flex">
              <div className="flex items-center gap-2 self-stretch">
                <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
                  <Image
                    src={eggClub.user_id.user_profile_img}
                    alt="profile"
                    width={22}
                    height={22}
                    className="rounded-full object-cover"
                  />
                </div>
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
            <span>
              <Image src={"/asset/Icon/Heart-Filled.svg"} alt="heart" width={16} height={16} />
            </span>
          </div>
          <div className="justify-start items-center flex">
            <div className="text-gray-400 flex font-normal text-body-12">
              {eggClub.wish_list.length > 100 ? "100+" : eggClub.wish_list.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EggClubHorizontalListSearch = ({ eggClub }) => {
  return (
    <div className="min-w-[190px] h-[90px] flex-col justify-start items-start gap-1.5 inline-flex">
      <Tag tagName="eggclub" />
      <div className="self-stretch h-[65px] flex-col justify-start items-start gap-[5px] flex">
        <div className="self-stretch h-[43px] flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-gray-900 text-subtitle-14">{eggClub.egg_club_name}</div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="justify-start items-center gap-0.5 flex">
              <div className="flex items-center gap-2 self-stretch">
                <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
                  <Image
                    src={eggClub.user.user_profile_img}
                    alt="profile"
                    width={22}
                    height={22}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 text-gray-400 text-body_medium-14 leading-tight">
                {eggClub.user.user_name}
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
            <span>
              <Image src={"/asset/Icon/Heart-Filled.svg"} alt="heart" width={16} height={16} />
            </span>
          </div>
          <div className="justify-start items-center flex">
            <div className="text-gray-400 flex font-normal text-body-12">
              {eggClub.wish_list.length > 100 ? "100+" : eggClub.wish_list.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
