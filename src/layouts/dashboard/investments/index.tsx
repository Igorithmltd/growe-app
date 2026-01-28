"use client";

import { Spinner, StyledText } from "@/src/components";
import { Box, Flex, HStack } from "@chakra-ui/react";
import PersonalInvestments from "./personal";
import { EmptyCard, InvestmentCard, PromoCard } from "../cards";
import { MdChevronRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { useQuery } from "@tanstack/react-query";

const InvestmentLayout = () => {
  const router = useRouter();

  const { getSuggestedInvestments } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["suggested-investments"],
    queryFn: getSuggestedInvestments,
  });

  const investments = data?.data.message || [];
  const loading = isPending || isFetching;

  return (
    <Box p={2} px={{ xl: 50 }}>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        My Investments
      </StyledText>

      <PersonalInvestments />

      <Box mt={6}>
        <HStack justify="space-between">
          <StyledText
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            fontWeight="medium"
            color="secondary"
          >
            Suggested Investments
          </StyledText>

          <Flex
            align="center"
            color="primary"
            cursor="pointer"
            onClick={() => router.push("/investments/suggested-investments")}
          >
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
              Find more
            </StyledText>
            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </Flex>
        </HStack>

        {loading ? (
          <Flex h="250px" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex h="250px" alignItems="center" justifyContent="center">
            <StyledText color="red.500" fontSize="md">
              {error instanceof Error ? error.message : "Unknown error"}
            </StyledText>
          </Flex>
        ) : investments.length === 0 ? (
          <Box w="full" mt={6}>
            <EmptyCard title="No suggested investments" />
          </Box>
        ) : (
          <HStack
            spaceX={{ base: 2, md: 4 }}
            mt={6}
            overflowX="auto"
            css={{
              "@media (max-width: 61.99em)": {
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              },
            }}
          >
            {investments.map((investment, index) => (
              <InvestmentCard
                key={index}
                name={investment.title}
                annualReturn={Number(investment.interestRate)}
                image="/images/investments/3.png"
              />
            ))}
          </HStack>
        )}
      </Box>

      <PromoCard />
    </Box>
  );
};

export default InvestmentLayout;
