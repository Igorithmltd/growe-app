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
  hasCloseButton?: boolean;
  isCalender?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  hasCloseButton = true,
  isCalender = false,
  ...boxProps
}: ModalProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!isOpen) return null;

  const shouldCenter = isCalender || !isMobile;

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

      {/* Modal Content */}
      <MotionBox
        initial={{
          y: shouldCenter ? "-50%" : "100%",
          opacity: 0,
          x: "-50%",
        }}
        animate={{
          y: shouldCenter ? "-50%" : 0,
          opacity: 1,
          x: "-50%",
        }}
        exit={{
          y: shouldCenter ? "-50%" : "100%",
          opacity: 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3 }}
        position="fixed"
        left="50%"
        top={shouldCenter ? "50%" : undefined}
        bottom={!shouldCenter ? 0 : undefined}
        zIndex={1001}
        onClick={(e) => e.stopPropagation()}
        width={isMobile ? "100vw" : "auto"}
        style={{
          transform: shouldCenter ? "translate(-50%, -50%)" : "none",
        }}
      >
        <Box
          bg="white"
          position="relative"
          borderTopRadius={!shouldCenter ? "30px" : undefined}
          borderRadius={shouldCenter ? "xl" : undefined}
          boxShadow="lg"
          width={isMobile ? "100vw" : "400px"}
          maxW={isMobile ? "100vw" : "90vw"}
          p={6}
          {...boxProps}
        >
          {hasCloseButton && !isMobile && (
            <CloseButton
              position="absolute"
              top={2}
              right={2}
              size="md"
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
