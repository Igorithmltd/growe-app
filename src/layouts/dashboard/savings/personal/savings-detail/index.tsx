import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Grid, HStack, VStack } from "@chakra-ui/react";
import { ActiveSavingsCard, DetailsCard } from "../../../cards";

const data = [
  { label: "Target Amount", value: "₦800,000" },
  { label: "Frequent Amount", value: "₦800,000" },
  { label: "Interest Rate", value: "10% p.a" },
  { label: "Maturity Date", value: "Apr 15, 2025" },
  { label: "Automation", value: "Every Sunday" },
  { label: "Estimated Future Amount", value: "₦808,000" },
];

const SavingDetailsLayout = () => {
  return (
    <VStack w={{ lg: "65%" }} align="stretch" mx="auto">
      <BackIcon />
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        Summary
      </StyledText>

      <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={90} />

      <Grid templateColumns="repeat(2, 1fr)" justifyContent="start" gap={6}>
        {data.map(({ label, value }) => (
          <DetailsCard title={label} value={value} key={label} />
        ))}
      </Grid>

      <HStack alignSelf={{ lg: "start" }} spaceX={6}>
        <StyledButton type="button" color="secondary" flex={1} bg="white">
          Top Up
        </StyledButton>
        <StyledButton type="button" color="secondary" flex={1} bg="white">
          Break Savings
        </StyledButton>
      </HStack>
    </VStack>
  );
};

export default SavingDetailsLayout;
