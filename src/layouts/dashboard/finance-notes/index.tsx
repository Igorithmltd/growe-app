"use client";

import { Box, VStack } from "@chakra-ui/react";
//
import { StyledButton, StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { FinanceCard } from "../cards";
import { useQuery } from "@tanstack/react-query";
import useGetFinanceNotes from "@/src/hooks/apis/queries/useFinanceNotes";

const colorSchemes = [
  { bg: "#E3F0E12B", accent: "#89C184" }, // green
  { bg: "#FFF3B12B", accent: "#FFEB80" }, // yellow
  { bg: "#E7E7FB2B", accent: "#8080FF" }, // purple
  { bg: "#FFF6F6", accent: "#FF8080" }, // red
];

const financeNotes = [
  {
    title: "Personal Savings",
    description: "January budget analysis shows we're on track with savings goals.",
    amount: 75000,
    date: "2025-01-15",
    tag: "Savings",
  },
  {
    title: "Investment in United Capital Money Market Fund",
    description:
      "Invested ₦500,000 in the United Capital Money Market Fund for a duration of 1 year.",
    amount: 500000,
    date: "2025-01-15",
    tag: "Investment",
  },
  {
    title: "Vacation Savings Plan",
    description: "Saving ₦100,000 for a summer vacation in June 2025.",
    amount: 100000,
    date: "2025-01-15",
    tag: "Goal",
  },
  {
    title: "Monthly Grocery Expenses",
    description:
      "Spent ₦50,000 on groceries for the month, including fruits, vegetables, snacks, and household essentials.",
    amount: 50000,
    date: "2025-01-15",
    tag: "Expenses",
  },
];

const FinanceNotesLayout = () => {
  const router = useRouter();

  const { getAllFinanceNotes } = useGetFinanceNotes();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-finance-notes"],
    queryFn: getAllFinanceNotes,
  });

  const handleBack = () => {
    router.back();
  };

  return (
    <Box
      px={{ base: 3, md: 6 }}
      py={{ base: 5, lg: 10 }}
      w={{ lg: "65%" }}
      mx="auto"
      minH="90vh"
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

      <VStack align="stretch" spaceY={6} my={14}>
        {financeNotes.map((note, index) => {
          const scheme = colorSchemes[index % colorSchemes.length];

          return (
            <FinanceCard
              key={index}
              title={note.title}
              description={note.description}
              amount={note.amount}
              date={note.date}
              tag={note.tag}
              bg={scheme.bg}
              accentColor={scheme.accent} // If you use this for left border
            />
          );
        })}
      </VStack>

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
          <StyledButton type="button" w="100%" onClick={() => router.push("/finance-notes/create")}>
            Create Notes
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FinanceNotesLayout;
