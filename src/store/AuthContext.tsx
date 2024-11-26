"use client";

import { createContext, ReactNode, useContext } from "react";
import { useAuthStore, UserState } from "./authStore";

export const AuthContext = createContext<UserState | null>(null);

export const useAuth = (): UserState => {
  const context = useContext(AuthContext);
  return context as UserState;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authStore = useAuthStore();

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
};
