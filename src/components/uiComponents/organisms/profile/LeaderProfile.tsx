import React from "react";

const LeaderProfile = ({ name }: { name: string }) => {
  return (
    <div className="w-[133px] h-[22px] flex-col justify-start items-start gap-1 inline-flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="text-gray-900 text-subtitle-16">{name}</div>
        <div className="h-[19px] px-2 py-0.5 bg-neutral-800 rounded-[124px] justify-center items-center flex">
          <div className="text-white text-body-10">에그장</div>
        </div>
      </div>
    </div>
  );
};

export default LeaderProfile;
