import { StyledButton, StyledText } from "@/src/components";
import { Box, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { ActiveSavingsCard, EmptyCard, SavingsCard } from "../../cards";

const PersonalSavings = () => {
  const isEmpty = false;

  return (
    <Box>
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
      </VStack>
      <Box mt={12}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Active Savings
        </StyledText>

        <VStack align="stretch" spaceY={4} mt={6}>
          {isEmpty ? (
            <EmptyCard title="You Don’t Have Any Active Savings Yet!" />
          ) : (
            <VStack align="stretch" spaceY={4}>
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={90} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={10} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={25} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={50} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={75} />
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default PersonalSavings;
