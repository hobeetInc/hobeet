import { create } from "zustand";
import { EggClub } from "@/types/features/commerce/cardlist.types";
import { MemberInfo } from "@/types/features/user/user.types";
import { EggDayWithEggDayMember } from "@/types/features/club/eggday.types";

interface ClubState {
  clubInfo: EggClub | null;
  hostInfo: MemberInfo | undefined;
  crewMembers: MemberInfo[];
  notificationData: EggDayWithEggDayMember[];
  stringCategory: string | undefined;

  // 액션들
  setClubInfo: (clubInfo: EggClub) => void;
  setHostInfo: (hostInfo: MemberInfo) => void;
  setCrewMembers: (members: MemberInfo[]) => void;
  setNotificationData: (data: EggDayWithEggDayMember[]) => void;
  setStringCategory: (category: string) => void;
}

export const useClubStore = create<ClubState>((set) => ({
  clubInfo: null,
  hostInfo: undefined,
  crewMembers: [],
  notificationData: [],
  stringCategory: undefined,

  setClubInfo: (clubInfo) => set({ clubInfo }),
  setHostInfo: (hostInfo) => set({ hostInfo }),
  setCrewMembers: (members) => set({ crewMembers: members }),
  setNotificationData: (data) => set({ notificationData: data }),
  setStringCategory: (category) => set({ stringCategory: category })
}));
