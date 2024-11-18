import Image from "next/image";
import { ParticipationRequest } from "../_types/approve.types";

export default function ActiveMembersTab({ activeMembers }: { activeMembers: ParticipationRequest[] }) {
  return (
    <div className="flex flex-col gap-6">
      {activeMembers.map((member, index) => (
        <div key={member.egg_club_participation_request_id} className="flex items-center gap-3">
          {member.user_id?.user_profile_img && (
            <Image
              src={member.user_id.user_profile_img}
              alt={`${member.user_id.user_name}의 프로필`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span className="text-gray-900 font-semibold font-pretendard">{member.user_id?.user_name}</span>
          {index === 0 ? (
            <div className="w-[42px] h-[19px] px-2 py-0.5 bg-gray-800 rounded-[124px] justify-center items-center inline-flex">
              <div className="text-white text-[10px] font-normal font-pretendard leading-[14.50px]">에그장</div>
            </div>
          ) : (
            <div className="w-[42px] h-[19px] px-2 py-0.5 bg-primary-300 rounded-[124px] justify-center items-center inline-flex">
              <div className="text-gray-900 text-[10px] font-normal font-pretendard leading-[14.50px]">에그즈</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
