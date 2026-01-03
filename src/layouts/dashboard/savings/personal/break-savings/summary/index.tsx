import { StyledButton } from "@/src/components";
import { BreakSavingsCard } from "@/src/layouts/dashboard/cards";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { calculateBreakDetails } from "@/src/utils/helpers";

export default function SavingsSummarySection({
  saving,
  onClick,
}: {
  saving: Savings;
  onClick?: () => void;
}) {
  const { breakFee, amountToReceive } = calculateBreakDetails(saving.targetAmount);

  const summaryCards = [
    {
      title: "Total Personal Savings",
      value: `${saving.targetAmount.toLocaleString()}`,
    },
    {
      title: "Break Fee (5%)",
      value: `₦${breakFee.toLocaleString()}`,
      titleColor: "#FF8080",
    },
    {
      title: "Amount You’ll Receive",
      value: `₦${amountToReceive.toLocaleString()}`,
    },
  ];

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={6} mt={10}>
        {summaryCards.map((card, index) => (
          <BreakSavingsCard key={index} {...card} />
        ))}
      </SimpleGrid>

      <StyledButton type="button" w="full" bg="#9BAB69" onClick={onClick} mt={8}>
        Confirm & Withdraw
      </StyledButton>
    </Box>
  );
}
