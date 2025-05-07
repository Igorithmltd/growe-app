"use client";

import { Box, BoxProps, CloseButton, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  ...boxProps
}: ModalProps) => {
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
        onClick={closeOnOverlayClick ? onClose : undefined}
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
          position="relative"
          borderTopRadius={isMobile ? "30px" : undefined}
          borderRadius={isMobile ? undefined : "xl"}
          boxShadow="lg"
          width={isMobile ? "100vw" : "400px"}
          maxW={isMobile ? "100vw" : "90vw"}
          p={6}
          {...boxProps}
        >
          {!isMobile && (
            <CloseButton
              position="absolute"
              top={4}
              right={4}
              onClick={onClose}
              zIndex={1002}
            />
          )}
          {children}
        </Box>
      </MotionBox>
    </>
  );
};
