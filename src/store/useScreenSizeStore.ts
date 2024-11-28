import { create } from "zustand";

interface ScreenSizeState {
  isLargeScreen: boolean;
  setIsLargeScreen: (isLarge: boolean) => void;
}

const useScreenSizeStore = create<ScreenSizeState>((set) => ({
  isLargeScreen: false,
  setIsLargeScreen: (isLarge) => set({ isLargeScreen: isLarge })
}));

export default useScreenSizeStore;
