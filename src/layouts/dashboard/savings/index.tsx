"use client";

import { StyledText } from "@/src/components";
import { Box } from "@chakra-ui/react";
import PersonalSavings from "./personal";

const SavingsLayout = () => {
  return (
    <Box p={2}>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        My Savings
      </StyledText>

      <PersonalSavings />
    </Box>
  );
};

export default SavingsLayout;
