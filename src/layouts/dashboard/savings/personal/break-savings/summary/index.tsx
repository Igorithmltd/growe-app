import { BreakSavingsCard } from "@/src/layouts/dashboard/cards";
import { SimpleGrid } from "@chakra-ui/react";

export default function SavingsSummarySection() {
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
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
      {summaryCards.map((card, index) => (
        <BreakSavingsCard key={index} {...card} />
      ))}
    </SimpleGrid>
  );
}
