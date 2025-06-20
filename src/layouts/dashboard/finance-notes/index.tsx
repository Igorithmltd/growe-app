"use client";

import { Box, HStack, VStack } from "@chakra-ui/react";
//
import { StyledButton, StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";

const FinanceNotesLayout = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box
      px={{ base: 3, md: 6 }}
      py={{ base: 5, lg: 10 }}
      w={{ lg: "65%" }}
      mx="auto"
      bg="red"
      minH="80vh"
      position="relative"
      pb="80px"
    >
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Finance Notes
        </StyledText>
      </Box>

      <VStack align="stretch" spaceY={8} mt={14}></VStack>
      <Box
        position="absolute"
        bottom={4}
        left={0}
        right={0}
        display="flex"
        justifyContent="center"
        px={4}
      >
        <Box w="100%">
          <StyledButton type="button" w="100%">
            Create Notes
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FinanceNotesLayout;
