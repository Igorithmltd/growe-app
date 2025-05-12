import { create } from "zustand";

type UserDetailsState = {
  user: UserDetails | null;
  setUser: (user: UserDetails) => void;
};

export const useUserDetailsStore = create<UserDetailsState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
