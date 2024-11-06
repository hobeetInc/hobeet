import { ProfileImageLarge, ProfileImageSmall } from "./ProfileImageLarge";
import Tag from "./Tag";

// 에그장 프로필 리스트
export const ProfileListRepresentative = ({ hostName, hostImage }) => {
  return (
    <div className="h-[52px] justify-start items-center gap-3 inline-flex">
      <ProfileImageLarge image={hostImage} />
      <div className="w-[133px] flex-col justify-start items-start gap-1 inline-flex">
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="text-gray-900 text-subtitle-16">{hostName}</div>
          <Tag tagName="에그장" variant="black" />
        </div>
      </div>
    </div>
  );
};

// 에그즈 프로필 리스트
export const ProfileListCrew = ({ crewName, crewImage }) => {
  <div className="h-10 justify-start items-center gap-3 inline-flex">
    <ProfileImageSmall image={crewImage} />
    <div className="w-[200px] flex-col justify-center items-start gap-1 inline-flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="text-gray-500 text-subtitle-16">{crewName}</div>
        <Tag tagName="에그즈" />
      </div>
    </div>
  </div>;
};
