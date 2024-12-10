// import Image from "next/image";
// import Tag from "../../atoms/tags/Tag";
// import Text from "../../atoms/text/Text";
// import { Icon } from "../../atoms/icons/Icon";
// import { CustomAddress } from "@/utils/CustomAddress";

// const BigVerticalContentsList = ({ eggPop, hostName, hostImage, memberCount }) => {
//   // 날짜와 시간 커스텀
//   const DateTimeCustom = (dateTime: string) => {
//     const date = new Date(dateTime);
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const addZero = (num: number) => String(num).padStart(2, "0");

//     return {
//       date: `${month}월 ${day}일`,
//       time: `${hours}:${addZero(minutes)}`
//     };
//   };

//   return (
//     <div className="w-[228px] h-[383px] flex-col justify-start items-start gap-3 inline-flex">
//       <div className="w-[228px] h-[228px] overflow-hidden rounded-[16.7px]">
//         <Image
//           width={228}
//           height={228}
//           alt={eggPop.egg_pop_name}
//           src={eggPop.egg_pop_image}
//           className="w-[228px] h-[228px] object-cover"
//         />
//       </div>

//       <div className="self-stretch h-[143px] flex-col justify-start items-start gap-1 flex">
//         <Tag tagName="eggpop" />
//         <Text variant="subtitle-16">{eggPop.egg_pop_name}</Text>
//         <div className="self-stretch pt-0.5 justify-start items-center gap-0.5 inline-flex">
//           <div className="w-4 h-4 justify-center items-center flex">
//             <Icon name="locationIcon" />
//           </div>
//           <Text variant="body_medium-14" className="text-gray-400">
//             {CustomAddress(eggPop.egg_pop_location)}
//           </Text>
//         </div>
//         <div className="justify-start items-center gap-2 inline-flex">
//           <Text variant="body_medium-14" className="text-gray-400">
//             {DateTimeCustom(eggPop.egg_pop_date)}.date
//           </Text>
//           <Text variant="body_medium-14" className="text-gray-400">
//             {DateTimeCustom(eggPop.egg_pop_date)}.time
//           </Text>
//         </div>
//         <div className="self-stretch justify-start items-center gap-2 inline-flex">
//           <div className="justify-start items-center gap-0.5 flex">
//             <div className="w-[22px] h-[22px] overflow-hidden rounded-full flex justify-center items-center">
//               <Image
//                 width={228}
//                 height={228}
//                 alt={hostName}
//                 src={hostImage}
//                 className="w-[22px] h-[22px] object-cover"
//               />
//             </div>
//             <Text variant="body_medium-14" className="text-gray-400">
//               {hostName}
//             </Text>
//           </div>
//           <div className="justify-start items-center gap-0.5 flex">
//             <Text className="text-gray-400">멤버</Text>
//             <Text className="text-gray-400">{memberCount} / 100</Text>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BigVerticalContentsList;

"use client";

import Image from "next/image";
import Tag from "../../atoms/tags/Tag";
import Text from "../../atoms/text/Text";
import { Icon } from "../../atoms/icons/Icon";
import { CustomAddress } from "@/utils/CustomAddress";

const BigVerticalContentsList = ({ eggPop, hostName, hostImage, memberCount }) => {
  // 날짜와 시간 커스텀
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

  // 날짜와 시간 분리
  const formattedDateTime = formatDateTime(eggPop.egg_pop_date);

  return (
    <div className="w-[228px] h-[383px] flex-col justify-start items-start gap-3 inline-flex">
      <div className="w-[228px] h-[228px] overflow-hidden rounded-[16.7px]">
        <Image
          width={228}
          height={228}
          alt={eggPop.egg_pop_name}
          src={eggPop.egg_pop_image}
          className="w-[228px] h-[228px] object-cover"
        />
      </div>

      <div className="self-stretch h-[143px] flex-col justify-start items-start gap-1 flex">
        <Tag tagName="eggpop" />
        <Text variant="subtitle-16">{eggPop.egg_pop_name}</Text>
        <div className="self-stretch pt-0.5 justify-start items-center gap-0.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <Icon name="locationIcon" />
          </div>
          <Text variant="body_medium-14" className="text-gray-400">
            {CustomAddress(eggPop.egg_pop_location)}
          </Text>
        </div>
        <div className="justify-start items-center gap-2 inline-flex">
          <Text variant="body_medium-14" className="text-gray-400">
            {formattedDateTime.date}
          </Text>
          <Text variant="body_medium-14" className="text-gray-400">
            {formattedDateTime.time}
          </Text>
        </div>
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-center gap-0.5 flex">
            <div className="w-[22px] h-[22px] overflow-hidden rounded-full flex justify-center items-center">
              <Image
                width={228}
                height={228}
                alt={hostName}
                src={hostImage}
                className="w-[22px] h-[22px] object-cover"
              />
            </div>
            <Text variant="body_medium-14" className="text-gray-400">
              {hostName}
            </Text>
          </div>
          <div className="justify-start items-center gap-0.5 flex">
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

export default BigVerticalContentsList;
