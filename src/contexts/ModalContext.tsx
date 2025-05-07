"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext<any>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isErrorOpen, setisErrorOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isSuccessOpen, setIsSuccessOpen, isErrorOpen, setisErrorOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
