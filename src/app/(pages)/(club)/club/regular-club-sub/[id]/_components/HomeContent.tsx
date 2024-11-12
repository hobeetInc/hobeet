import Image from "next/image";
import CrewList from "./CrewList";
import { HomeContentProps } from "@/types/eggclub.types";
import Text from "@/components/uiComponents/TextComponents/Text";
import { ProfileImageLarge } from "@/components/uiComponents/ProfileImageLarge";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import WishListHeart from "./WishListHeart";

const HomeContent = ({
  clubInfo,
  hostInfo,
  crewMembers,
  egg_club_id,
  notificationData,
  stringCategory
}: HomeContentProps) => {
  // 성별 커스텀
  const gender = (gender: null | string) => {
    if (gender === null) {
      return "누구나";
    } else if (gender === "남성") {
      return "남성만";
    } else {
      return "여성만";
    }
  };

  // 인원 제한 커스텀
  const limited = (limit: number) => {
    if (limit === 100) {
      return "최대 100명";
    } else {
      return `최대 ${limit}명`;
    }
  };

  // 나이 커스텀
  const age = (age: number) => {
    if (age === 100) {
      return "제한 없음";
    } else if (age === 50) {
      return "50대";
    } else if (age === 49) {
      return "40대";
    } else if (age === 39) {
      return "30대";
    } else if (age === 29) {
      return "20대";
    } else if (age === 19) {
      return "10대";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex overflow-hidden w-[390px] h-[332px] relative bg-gray-100 mb-6">
        <Image
          src={clubInfo.egg_club_image}
          alt={clubInfo.egg_club_name}
          width={390}
          height={332}
          className="w-[390px] h-[332px] object-cover"
        />
      </div>

      <div className="w-full flex-col justify-start items-start gap-8 px-4 inline-flex">
        <div className="self-stretch flex-col justify-start items-start gap-5 flex">
          {/* 여기  */}

          <div className="self-stretch flex-col justify-start items-start gap-1 flex">
            <div className="px-2 py-0.5 bg-neutral-800 rounded-[124px] justify-center items-center inline-flex">
              <Text variant="body-10" className="text-white">
                {stringCategory}
              </Text>
            </div>
            <div className="w-full justify-between items-center gap-1.5 inline-flex">
              <Text variant="subtitle-20"> {clubInfo.egg_club_name}</Text>
              <div className="w-8 h-8 justify-center items-center flex">
                <WishListHeart egg_club_id={clubInfo.egg_club_id} />
              </div>
            </div>
          </div>
          <div className="w-[252px] justify-start items-center gap-3 inline-flex">
            <ProfileImageLarge image={hostInfo?.userImage} />
            <div className="w-[133px] flex-col justify-start items-start gap-1 inline-flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <Text variant="subtitle-16">{hostInfo?.userName}</Text>
                <Tag tagName="eggmaster" variant="black" />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>
        <div className="self-stretch h-[116px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <Text variant="subtitle-18">상세 정보</Text>
            </div>
          </div>
          <div className="self-stretch h-40 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <Text variant="subtitle-14">나이</Text>
              <Text variant="body-14">{age(clubInfo.egg_club_age)}</Text>
            </div>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <Text variant="subtitle-14">성별</Text>
              <Text variant="body-14"> {gender(clubInfo.egg_club_gender)}</Text>
            </div>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <Text variant="subtitle-14">인원</Text>
              <Text variant="body-14">{limited(clubInfo.egg_club_people_limited)}</Text>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>

        {/* 여기 */}

        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <Text variant="subtitle-18">모임 소개</Text>
            </div>
          </div>

          <Text variant="body-14" className="self-stretch text-gray-800">
            {clubInfo.egg_club_introduction}
          </Text>
        </div>

        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>

        <CrewList
          crewMembers={crewMembers}
          clubId={egg_club_id}
          clubHostId={clubInfo.user_id}
          notificationData={notificationData}
        />
      </div>
    </div>
  );
};

export default HomeContent;

// <>
//   <div className="flex flex-col w-full">
//     <Image src={clubInfo.egg_club_image} alt={clubInfo.egg_club_name} width={100} height={100} className="w-full" />
//   </div>

//   <div className="flex flex-col gap-10 p-4">
//     <div className="flex flex-col gap-4 mt-4">
//       <p className="text-[13px]">{stringCategory}</p>

//       <div className="flex justify-between">
//         <h1 className="font-bold text-[23px]">{clubInfo.egg_club_name}</h1>
//         <WishListHeart egg_club_id={clubInfo.egg_club_id} />
//       </div>
//       <p>
//         맴버 {crewMembers.length} / {clubInfo.egg_club_people_limited}
//       </p>

//       <p>이 모임의 호스트</p>
//       <div className="flex flex-col gap-10">
//         <div className="flex justify-first items-center gap-4 pb-5 border-b-2 border-solid">
//           <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full ">
//             <Image
//               src={hostInfo?.userImage || ""}
//               alt={hostInfo?.userName || "호스트"}
//               width={50}
//               height={50}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="flex flex-col gap-1 justify-center">
//             <div className="flex gap-2">
//               <p>{hostInfo?.userName}</p>
//               <p className="text-[13px]">에그장</p>
//             </div>

//             <p className="text-[13px]">참여도</p>
//           </div>
//         </div>

//         <div>
//           <h1 className="font-semibold text-[20px] mb-2">상세 정보</h1>
//           <p>나이: {clubInfo.egg_club_age}세 이하</p>
//           <p>성별: {gender(clubInfo.egg_club_gender)}</p>
//           <p>인원: {limited(clubInfo.egg_club_people_limited)}</p>
//         </div>

//         <div className="flex flex-col gap-2">
//           <h1 className="text-[20px] font-semibold">모임 소개</h1>

//           <p>{clubInfo.egg_club_introduction}</p>
//         </div>
//       </div>
//     </div>

//     <CrewList
//       crewMembers={crewMembers}
//       clubId={egg_club_id}
//       clubHostId={clubInfo.user_id}
//       notificationData={notificationData}
//     />
//   </div>
// </>
