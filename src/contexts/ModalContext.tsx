"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isSuccessOpen: boolean;
  setIsSuccessOpen: (value: boolean) => void;
  isErrorOpen: boolean;
  setIsErrorOpen: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isSuccessOpen, setIsSuccessOpen, isErrorOpen, setIsErrorOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
