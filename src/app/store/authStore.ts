import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface UserState {
  user_id: string | null;
  setUser_id: (user_id: string) => void;
  user_email: string | null;
  setUser_email: (user_email: string) => void;
  user_gender: string | null;
  setUser_gender: (user_gender: string) => void;
  user_age: number | null;
  setUser_age: (user_age: number) => void;
  user_profile_img: string | null;
  setUser_profile_img: (user_profile_img: string) => void;
  user_roletype: string | null;
  setUser_roletype: (user_roletype: string) => void;
  user_name: string | null;
  setUser_name: (user_name: string) => void;
  user_create_at: Date | null;
}

type UserPersistOptions = PersistOptions<UserState>;

export const useAuthStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      user_id: null,
      setUser_id: (user_id: string) => set({ user_id }),
      user_email: null,
      setUser_email: (user_email: string) => set({ user_email }),
      user_gender: null,
      setUser_gender: (user_gender: string) => set({ user_gender }),
      user_age: null,
      setUser_age: (user_age: number) => set({ user_age }),
      user_profile_img: null,
      setUser_profile_img: (user_profile_img: string) => set({ user_profile_img }),
      user_roletype: null,
      setUser_roletype: (user_roletype: string) => set({ user_roletype }),
      user_name: null,
      setUser_name: (user_name: string) => set({ user_name }),
      user_create_at: null
    }),
    {
      name: "loginInfoStore",
      getStorage: () => localStorage
    } as UserPersistOptions
  )
);
