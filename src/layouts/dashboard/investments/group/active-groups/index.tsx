"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";
//
import { Loader, StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { EmptyCard, InvestmentGroupCard } from "../../../cards";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { useQuery } from "@tanstack/react-query";
import { getDaysLeft } from "@/src/utils/helpers";

const JoinedInvestmentsGroupsLayout = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const { getGroupInvestments } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["active-group"],
    queryFn: getGroupInvestments,
  });

  const investments = data?.data.message || [];
  const loading = isPending || isFetching;

  return (
    <Box
      px={{ md: 6 }}
      py={{ base: 5, lg: 10 }}
      w={{ lg: "65%" }}
      mx="auto"
    >
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        mt={{ base: 6, lg: "unset" }}
      >
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Investment Groups
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
            <EmptyCard title="No active group investments" />
          </Box>
        ) : (
          investments.map((investment, index) => (
            <InvestmentGroupCard
              key={index}
              title={investment.title}
              image="/images/investments/1.png"
              members={Number(investment.memberLimit)}
              target={investment.investmentTarget}
              contribution={investment.minimumMemberContribution}
              returnRate={investment.interestRate}
              progress={investment.totalAmount}
              daysLeft={Number(
                getDaysLeft(investment.startDate, investment.withdrawalDate)
              )}
              link={`/investments/active-groups/${investment._id}`}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};

export default JoinedInvestmentsGroupsLayout;
