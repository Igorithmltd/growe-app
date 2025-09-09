"use client";

import { BackIcon } from "@/public/svgs";
import { Spinner, StyledText } from "@/src/components";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ActiveSavingsCard, EmptyCard } from "../../../cards";
import useSavings from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";

const SavingGoalList = () => {
  const router = useRouter();

  const { getPersonalSavings } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-personal-savings"],
    queryFn: getPersonalSavings,
  });

  const savings = data?.data.message || [];
  const loading = isPending || isFetching;

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center">
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Saving Goals
        </StyledText>
      </Box>
      <VStack align="stretch" spaceY={4} mt={6}>
        {loading ? (
          <Flex h="50vh" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex h="50vh" alignItems="center" justifyContent="center">
            <StyledText color="red.500" fontSize="md">
              {error instanceof Error ? error.message : "Unknown error"}
            </StyledText>
          </Flex>
        ) : savings.length === 0 ? (
          <Box mt={6}>
            <EmptyCard title="You Don’t Have Any Active Personal Savings Yet!" />
          </Box>
        ) : (
          savings.map((saving, index) => (
            <ActiveSavingsCard
              key={saving._id || index}
              name={saving.title}
              amount={saving.targetAmount.toLocaleString()}
              plan={`${saving.duration} months`}
              value={saving.savingProgress}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};

export default SavingGoalList;
