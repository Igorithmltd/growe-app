"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isInfoOpen: boolean;
  setIsInfoOpen: (value: boolean) => void;
  isWeekOpen: boolean;
  setIsWeekOpen: (value: boolean) => void;
  isMonthOpen: boolean;
  setIsMonthOpen: (value: boolean) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (value: boolean) => void;
  isJoinSavingsOpen: boolean;
  setIsJoinSavingsOpen: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isWeekOpen, setIsWeekOpen] = useState<boolean>(false);
  const [isMonthOpen, setIsMonthOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isJoinSavingsOpen, setIsJoinSavingsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        isInfoOpen,
        setIsInfoOpen,
        isWeekOpen,
        setIsWeekOpen,
        isMonthOpen,
        setIsMonthOpen,
        isCalendarOpen,
        setIsCalendarOpen,
        isJoinSavingsOpen,
        setIsJoinSavingsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
