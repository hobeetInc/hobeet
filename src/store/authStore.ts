import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface UserState {
  reset: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  userEmail: string | null;
  setUserEmail: (userEmail: string) => void;
  userGender: string | null;
  setUserGender: (userGender: string) => void;
  userAge: number | null;
  setUserAge: (userAge: number) => void;
  userProfileImg: string | null;
  setUserProfileImg: (userProfileImg: string) => void;
  userRoleType: string | null;
  setUserRoleType: (userRoleType: string) => void;
  userName: string | null;
  setUserName: (userName: string) => void;
  userBirth: string | null;
  setUserBirth: (userBirth: string) => void;
  userCreateAt: Date | null;
}

type UserPersistOptions = PersistOptions<UserState>;

export const useAuthStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      userId: null,
      setUserId: (userId: string) => set({ userId }),
      userEmail: null,
      setUserEmail: (userEmail: string) => set({ userEmail }),
      userGender: null,
      setUserGender: (userGender: string) => set({ userGender }),
      userAge: null,
      setUserAge: (userAge: number) => set({ userAge }),
      userProfileImg: null,
      setUserProfileImg: (userProfileImg: string) => set({ userProfileImg }),
      userRoleType: null,
      setUserRoleType: (userRoleType: string) => set({ userRoleType }),
      userName: null,
      setUserName: (userName: string) => set({ userName }),
      userBirth: null,
      setUserBirth: (userBirth: string) => set({ userBirth }),
      userCreateAt: null,

      reset: () =>
        set({
          userId: null,
          userEmail: null,
          userGender: null,
          userAge: null,
          userProfileImg: null,
          userRoleType: null,
          userName: null,
          userCreateAt: null
        })
    }),
    {
      name: "loginInfoStore",
      getStorage: () => localStorage
    } as UserPersistOptions
  )
);
