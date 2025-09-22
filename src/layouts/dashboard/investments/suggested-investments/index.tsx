"use client";

import { Box, VStack, Flex } from "@chakra-ui/react";
import { StyledText, Spinner, Loader } from "@/src/components";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { InvestmentInfoCard, EmptyCard } from "../../cards";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { useQuery } from "@tanstack/react-query";

const SuggestedInvestmentsLayout = () => {
  const router = useRouter();
  const { getSuggestedInvestments } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["suggested-investments"],
    queryFn: getSuggestedInvestments,
  });

  const investments = data?.data.message || [];
  const loading = isPending || isFetching;

  const handleBack = () => {
    router.back();
  };

  return (
    <Box px={{ base: 3, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      {/* Header */}
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Suggested Investments
        </StyledText>
      </Box>

      {/* Content */}
      <VStack align="stretch" spaceY={8} mt={14}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Flex h="250px" alignItems="center" justifyContent="center">
            <StyledText color="red.500" fontSize="md">
              {error instanceof Error ? error.message : "Unknown error"}
            </StyledText>
          </Flex>
        ) : investments.length === 0 ? (
          <Box mt={6}>
            <EmptyCard title="No suggested investments" />
          </Box>
        ) : (
          investments.map((investment, index) => (
            <InvestmentInfoCard
              key={investment._id ?? index}
              name={investment.title}
              investors={investment.groupMembers?.length ?? 0}
              amountPerUnit={`₦${investment.minimumMemberContribution?.toLocaleString()}`}
              annualReturn={Number(investment.interestRate)}
              image="/images/investments/1.png"
            />
          ))
        )}
      </VStack>
    </Box>
  );
};

export default SuggestedInvestmentsLayout;
