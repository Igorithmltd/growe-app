"use client";

import { Box, BoxProps, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children, ...boxProps }: ModalProps) => {
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

      {/* Animated Modal */}
      <MotionBox
        initial={{
          y: isMobile ? "100%" : 0,
          opacity: 0,
          x: "-50%",
        }}
        animate={{
          y: 0,
          opacity: 1,
          x: "-50%",
        }}
        exit={{
          y: isMobile ? "100%" : 0,
          opacity: 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3 }}
        position="fixed"
        left="50%"
        top={isMobile ? undefined : "40%"}
        bottom={isMobile ? 0 : undefined}
        zIndex={1001}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isMobile ? "translateY(0)" : "translateY(-50%)",
        }}
      >
        <Box
          bg="white"
          borderTopRadius={isMobile ? "30px" : undefined}
          borderRadius={isMobile ? undefined : "xl"}
          boxShadow="lg"
          width={isMobile ? "100vw" : "400px"}
          maxW={isMobile ? "100vw" : "90vw"}
          p={6}
          {...boxProps}
        >
          {children}
        </Box>
      </MotionBox>
    </>
  );
};
