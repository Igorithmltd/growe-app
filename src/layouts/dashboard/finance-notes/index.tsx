"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Loader, StyledButton, StyledText } from "@/src/components";
import { BackIcon } from "@/public/svgs";
import { EmptyCard, FinanceCard } from "../cards";
import useGetFinanceNotes from "@/src/hooks/apis/queries/useFinanceNotes";

const colorSchemes = [
  { bg: "#E3F0E12B", accent: "#89C184" },
  { bg: "#FFF3B12B", accent: "#FFEB80" },
  { bg: "#E7E7FB2B", accent: "#8080FF" },
  { bg: "#FFF6F6", accent: "#FF8080" },
];

const FinanceNotesLayout = () => {
  const router = useRouter();
  const { getAllFinanceNotes } = useGetFinanceNotes();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-finance-notes"],
    queryFn: getAllFinanceNotes,
  });

  const financeNotes = data?.data.message || [];
  const loading = isPending || isFetching;

  const handleBack = () => router.back();

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
        {loading ? (
          <Loader />
        ) : error ? (
          <Flex h="150px" alignItems="center" justifyContent="center">
            <StyledText color="red.500" fontSize="md">
              {error instanceof Error ? error.message : "Unknown error"}
            </StyledText>
          </Flex>
        ) : financeNotes.length === 0 ? (
          <Box mt={6}>
            <EmptyCard title="You Don’t Have Finance Notes Yet!" />
          </Box>
        ) : (
          financeNotes.map((note, index) => {
            const scheme = colorSchemes[index % colorSchemes.length];

            return (
              <FinanceCard
                key={note._id || index}
                title={note.title}
                description={note.description}
                amount={note.amount}
                date={"22-01-2025"} // Replace with actual `note.date` if available
                tag={note.category}
                bg={scheme.bg}
                accentColor={scheme.accent}
              />
            );
          })
        )}
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
