"use client";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bg="blackAlpha.600"
        zIndex={1000}
        onClick={onClose}
      />

      {/* Modal content */}
      <Box
        position="fixed"
        bottom={isMobile ? 0 : "50%"}
        left="50%"
        transform={isMobile ? "translateX(-50%)" : "translate(-50%, 50%)"}
        bg="white"
        borderTopRadius={isMobile ? "2xl" : undefined}
        borderRadius={isMobile ? undefined : "xl"}
        boxShadow="lg"
        width={isMobile ? "100vw" : "400px"}
        maxW="90vw"
        zIndex={1001}
        p={6}
        onClick={(e) => e.stopPropagation()} // prevent overlay click from triggering close
      >
        {children}
      </Box>
    </>
  );
};

