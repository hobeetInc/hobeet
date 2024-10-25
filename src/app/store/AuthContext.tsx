"use client";

import { createContext, ReactNode } from "react";
import { useAuthStore } from "./authStore";

export const AuthContext = createContext<ReturnType<typeof useAuthStore> | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authStore = useAuthStore();

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
};
