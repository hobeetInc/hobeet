import Image from "next/image";
import { Icon } from "../../atoms/icons/Icon";
import Tag from "../../atoms/tags/Tag";
import Text from "../../atoms/text/Text";
import { CustomAddress } from "@/utils/CustomAddress";

export const HorizontalContentsEggClubList = ({ eggClub, hostName, hostImage, memberCount, wishListCount }) => {
  return (
    <div className="w-full h-[144px] flex gap-4 items-start p-4">
      {/* 썸네일 이미지 */}
      <div className="w-[144px] h-[144px] rounded-[16.7px] overflow-hidden flex-shrink-0">
        <Image
          width={144}
          height={144}
          alt={eggClub.egg_club_name}
          src={eggClub.egg_club_image}
          className="w-full h-full object-cover"
          quality={50}
          sizes="144px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 h-full flex flex-col gap-1.5">
        <div className="flex items-center">
          <Tag tagName="eggclub" />
        </div>

        <Text variant="subtitle-16" className="text-gray-900 line-clamp-2 break-words">
          {eggClub.egg_club_name}
        </Text>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <div className="w-[22px] h-[22px] rounded-full overflow-hidden bg-gray-200">
              <Image
                width={22}
                height={22}
                alt={hostName}
                src={hostImage}
                className="w-full h-full object-cover"
                sizes="22px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </div>
            <Text variant="body_medium-14" className="text-gray-400">
              {hostName}
            </Text>
          </div>
          <div className="flex items-center gap-0.5">
            <Text variant="body_medium-14" className="text-gray-400">
              멤버
            </Text>
            <Text variant="body_medium-14" className="text-gray-400">
              {memberCount} / {eggClub.egg_club_people_limited}
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-[2px]">
          <Icon name="heart" />
          <Text variant="body-12" className="text-gray-400 ml-[2px]">
            {wishListCount > 100 ? "100+" : wishListCount}
          </Text>
        </div>
      </div>
    </div>
  );
};

export const HorizontalContentsEggPopList = ({ eggPop, hostName, hostImage, memberCount }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const addZero = (num: number) => String(num).padStart(2, "0");

    return {
      date: `${month}월 ${day}일`,
      time: `${hours}:${addZero(minutes)}`
    };
  };

  const formattedDateTime = formatDateTime(eggPop.egg_pop_date_time);

  return (
    <div className="w-full h-[144px] flex gap-4 items-start p-4">
      {/* 썸네일 이미지 */}
      <div className="w-[144px] h-[144px] relative rounded-[16.7px] overflow-hidden flex-shrink-0">
        <Image
          width={144}
          height={144}
          alt={eggPop.egg_pop_name}
          src={eggPop.egg_pop_image}
          className="w-full h-full object-cover"
          quality={50}
          sizes="144px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 h-full flex flex-col gap-1.5">
        <Tag tagName="eggpop" />

        <Text variant="subtitle-16" className="text-gray-900 line-clamp-2 break-words">
          {eggPop.egg_pop_name}
        </Text>

        <div className="flex items-center gap-0.5">
          <div className="w-4 h-4 flex justify-center items-center">
            <Icon name="locationIcon" />
          </div>
          <Text variant="body_medium-14" className="text-gray-400">
            {CustomAddress(eggPop.egg_pop_location)}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <Text variant="body_medium-14" className="text-gray-400">
            {formattedDateTime.date}
          </Text>
          <Text variant="body_medium-14" className="text-gray-400">
            {formattedDateTime.time}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <div className="w-[22px] h-[22px] rounded-full overflow-hidden">
              <Image
                width={22}
                height={22}
                alt={hostName}
                src={hostImage}
                className="w-full h-full object-cover"
                sizes="22px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </div>
            <Text variant="body_medium-14" className="text-gray-400">
              {hostName}
            </Text>
          </div>
          <div className="flex items-center gap-0.5">
            <Text variant="body_medium-14" className="text-gray-400">
              멤버
            </Text>
            <Text variant="body_medium-14" className="text-gray-400">
              {memberCount} / 100
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
