import { StyledButton } from "@/src/components";
import { BreakSavingsCard } from "@/src/layouts/dashboard/cards";
import { Box, SimpleGrid } from "@chakra-ui/react";

export default function SavingsSummarySection({ onClick }: { onClick?: () => void }) {
  const summaryCards = [
    {
      title: "Total Personal Savings",
      value: "₦133,000",
    },
    {
      title: "Break Fee (5%)",
      value: "₦6,650",
      titleColor: "red.400",
    },
    {
      title: "Amount You’ll Receive",
      value: "₦126,350",
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
