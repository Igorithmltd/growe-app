"use client";

import { StyledButton, StyledText } from "@/src/components";
import { Box, VStack } from "@chakra-ui/react";
import { SavingsCard } from "../cards";
import { FaPlus } from "react-icons/fa6";

const SavingsLayout = () => {
  return (
    <Box p={2}>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        My Savings
      </StyledText>

      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Personal Savings"
          amount="0.00"
          amountColor="secondary"
          interest="0%"
          bg="white"
          color="bfgrey"
          buttonBg="#F8FBEB"
          boxShadow="sm"
          buttonText={
            <>
              <FaPlus size="18px" /> Quick Save
            </>
          }
          buttonAction={() => {}}
        />

        <StyledButton type="button" alignSelf={{ lg: "start" }}>
          <FaPlus size="18px" /> Create New Savings Goal
        </StyledButton>

        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            fontWeight="medium"
            color="secondary"
          >
            Active Savings
          </StyledText>

          <VStack align="stretch" spaceY={4} mt={6}></VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SavingsLayout;
