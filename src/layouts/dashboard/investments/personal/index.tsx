"use client";

import { Spinner, StyledText } from "@/src/components";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { EmptyCard, InvestmentCard, SavingsCard } from "../../cards";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";

const PersonalInvestments = () => {
  const router = useRouter();

  const { getActiveInvestments } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["active-investments"],
    queryFn: getActiveInvestments,
  });

  const investments = data?.data.message || [];
  const loading = isPending || isFetching;
  const isEmpty = investments.length === 0;

  return (
    <Box>
      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Personal Investments"
          amount="0.00"
          amountColor="#285100"
          interest="0%"
          bg="#F6EDD9"
          color="primary"
          bgImage="url('/images/card-image2.webp')"
          buttonBg="#F8FBEB"
          boxShadow="sm"
          buttonText="Performance"
          buttonAction={() => {
            router.push("/investments/performance");
          }}
        />
      </VStack>

      <HStack justify="space-between" mt={12}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Active Personal Investments
        </StyledText>

        {!isEmpty && (
          <Flex
            align="center"
            color="primary"
            cursor="pointer"
            onClick={() => router.push("/investments/my-investments")}
          >
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
              Find more
            </StyledText>
            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </Flex>
        )}
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
  <Box mt={6}>
    <EmptyCard title="No active personal investments" />
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
  );
};

export default PersonalInvestments;
