import { create } from "zustand";
import { Balance } from "../hooks/apis/queries/useBalance";

type BalanceState = {
  balance: Balance | null;
  setBalance: (balance: Balance) => void;
};

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: null,
  setBalance: (balance) => set({ balance }),
}));
