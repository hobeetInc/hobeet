"use client";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { ONETIME_CLUB_CREATE, REGULAR_CLUB_CREATE } from "./(pages)/(club)/club/_utils/localStorage";
import CreateButton from "./(pages)/(club)/club/_components/CreateButton";
import RegularClubList from "./(pages)/(club)/club/_components/RegularClubList";
import OneTimeClubList from "./(pages)/(club)/club/_components/OneTimeClubList";

export default function Home() {
  const reset = useAuthStore((state) => state.reset);

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
}
