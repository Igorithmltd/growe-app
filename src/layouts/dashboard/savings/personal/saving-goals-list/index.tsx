import { BackIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ActiveSavingsCard, EmptyCard } from "../../../cards";

const SavingGoalList = () => {
  const router = useRouter();

  const isEmpty = false;

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center">
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Saving Goals
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

export default SavingGoalList;
