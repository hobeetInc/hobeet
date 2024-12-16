"use client";

import { useClubStore } from "@/store/crewStore";
import { EggClub } from "@/types/features/club/eggclub.types";
import { EggDayWithEggDayMember } from "@/types/features/club/eggday.types";
import { MemberInfo } from "@/types/features/user/user.types";
import { useRef } from "react";

interface StoreInitializerProps {
  clubInfo: EggClub;
  hostInfo: MemberInfo | undefined;
  crewMembers: MemberInfo[];
  notificationData: EggDayWithEggDayMember[];
  stringCategory: string | undefined;
}

export const StoreInitializer = ({
  clubInfo,
  hostInfo,
  crewMembers,
  notificationData,
  stringCategory
}: StoreInitializerProps) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useClubStore.setState({
      clubInfo,
      hostInfo,
      crewMembers,
      notificationData,
      stringCategory
    });

    initialized.current = true;
  }

  return null;
};
