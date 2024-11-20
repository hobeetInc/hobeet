import { useCallback, useRef } from "react";

type VoidFunction = () => void;

export const useThrottle = (callback: VoidFunction, delay: number): VoidFunction => {
  const lastRun = useRef<number>(Date.now());

  return useCallback(() => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      callback();
      lastRun.current = now;
    }
  }, [callback, delay]);
};
