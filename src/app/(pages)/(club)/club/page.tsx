"use client";

import { useEffect } from "react";
import { ONETIME_CLUB_CREATE, REGULAR_CLUB_CREATE } from "./_utils/localStorage";
import RegularClubList from "./_components/RegularClubList";
import OneTimeClubList from "./_components/OneTimeClubList";

const ClubPage = () => {
  useEffect(() => {
    localStorage.removeItem(ONETIME_CLUB_CREATE);
    localStorage.removeItem(REGULAR_CLUB_CREATE);
  }, []);

  return (
    <>
      <div className="">
        <RegularClubList />
      </div>
      <div className="">
        <OneTimeClubList />
      </div>
    </>
  );
};

export default ClubPage;
