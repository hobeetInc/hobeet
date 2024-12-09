"use client";

import { useEffect } from "react";
import useScreenSizeStore from "@/store/useScreenSizeStore";
const ScreenSizeInitializer = () => {
  const setIsLargeScreen = useScreenSizeStore((state) => state.setIsLargeScreen);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsLargeScreen]);
  return null;
};
export default ScreenSizeInitializer;
