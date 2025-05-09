import { create } from "zustand";

type UserDetailsState = {
  user: any;
  setUser: (user: any) => void;
};

export const useUserDetailsStore = create<UserDetailsState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
