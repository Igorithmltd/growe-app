"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isInfoOpen: boolean;
  setIsInfoOpen: (value: boolean) => void;
  isWeekOpen: boolean;
  setIsWeekOpen: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isWeekOpen, setIsWeekOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isInfoOpen, setIsInfoOpen, isWeekOpen, setIsWeekOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
