"use client";

import { useEffect } from "react";
import CreateButton from "./_components/CreateButton";
import OneTimeClubList from "./_components/OneTimeClubList";
import RegularClubList from "./_components/RegularClubList";
import { ONETIME_CLUB_CREATE, REGULAR_CLUB_CREATE } from "./_utils/localStorage";

const ClubCreatePage = () => {
  useEffect(() => {
    localStorage.removeItem(ONETIME_CLUB_CREATE);
    localStorage.removeItem(REGULAR_CLUB_CREATE);
  }, []);

  return (
    <div>
      <div className="container bg-gray-200 flex justify-end">
        <CreateButton />
      </div>
      <div className="container">
        <RegularClubList />
        <OneTimeClubList />
      </div>
    </div>
  );
};

export default ClubCreatePage;
