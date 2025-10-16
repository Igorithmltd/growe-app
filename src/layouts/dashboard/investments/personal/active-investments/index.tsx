"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";
//
import { Loader, StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { EmptyCard, InvestmentInfoCard } from "../../../cards";
import { useQuery } from "@tanstack/react-query";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";

const PersonalInvestmentsLayout = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const { getPersonalInvestments } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["personal-investments"],
    queryFn: getPersonalInvestments,
  });

  const investments = data?.data.message || [];
  const loading = isPending || isFetching;

  return (
    <Box px={{ md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Personal Investments
        </StyledText>
      </Box>

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
            <EmptyCard title="No active personal investments" />
          </Box>
        ) : (
          investments.map((investment, index) => (
            <InvestmentInfoCard
              key={index}
              id={investment._id}
              name={investment.title}
              investors={30}
              amountPerUnit={investment.minimumMemberContribution}
              annualReturn={Number(investment.interestRate)}
              image="/images/investments/1.png"
              isSuggested={false}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};

export default PersonalInvestmentsLayout;
