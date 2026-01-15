"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import {
  Box,
  Grid,
  HStack,
  StackSeparator,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import { DetailsCard, InvestmentImageCard } from "../../../../cards";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { formatDateWithSuffix } from "@/src/utils/helpers";

const JoinedInvestmentDetailsLayout = () => {
  const router = useRouter();
  const { id } = useParams();

  const { getInvestment } = useInvestments();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["investment", id],
    queryFn: () => getInvestment(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <VStack justify="center" align="center" minH="50vh">
        <Spinner size="lg" />
      </VStack>
    );
  }

  if (isError || !data) {
    return (
      <VStack justify="center" align="center" minH="50vh">
        <StyledText color="red.500">
          Failed to load investment details
        </StyledText>
      </VStack>
    );
  }

  const investment = data.data.message;

  const infoData = [
    { label: "Investment Type", value: investment.investType || "N/A" },
    {
      label: "Withdrawal Date",
      value: formatDateWithSuffix(investment.withdrawalDate),
    },
    { label: "Start Date", value: formatDateWithSuffix(investment.startDate) },
    { label: "Payout Type", value: investment.disbursementMethod || "N/A" },
    { label: "Annual Return", value: investment.interestRate || "N/A" },
    { label: "Investors", value: investment.investmentId.investors || "0" },
  ];

  return (
    <Box px={{ md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack spaceX={3}>
        <Box onClick={() => router.back()} cursor="pointer">
          <BackIcon />
        </Box>
        <StyledText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
        >
          {investment.title}
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <InvestmentImageCard
          name={investment.title}
          bgImage={"url('/images/investments/cover.jpg')"}
          image="/images/investments/2.png"
        />

        <StyledText
          alignSelf="flex-end"
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="normal"
          color="primary"
          display="flex"
          alignItems="center"
          spaceX={1}
        >
          Verified investment{" "}
          <RiVerifiedBadgeFill size={20} style={{ marginLeft: "6px" }} />
        </StyledText>

        <HStack justify="space-between" align="center">
          <Box>
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="secondary"
            >
              {investment.title}
            </StyledText>
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              mb={2}
              fontWeight="normal"
              color="bfgrey"
            >
              By {investment.investmentId.investmentType || "Unknown"}
            </StyledText>
          </Box>

          <Box textAlign="center">
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="primary"
            >
              ₦{investment.investmentTarget?.toLocaleString()}
            </StyledText>
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              mb={2}
              fontWeight="normal"
              color="bfgrey"
            >
              Investment Target
            </StyledText>
          </Box>
        </HStack>

        <StyledButton
          onClick={() =>
            router.push(`/investments/my-investments/${id}/invest`)
          }
        >
          Invest
        </StyledButton>

        {/* Investment Info */}
        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            fontWeight="normal"
            color="secondary"
          >
            Investment Information
          </StyledText>
          <Grid templateColumns="repeat(2, 1fr)" justifyContent="start" gap={6}>
            {infoData.map(({ label, value }) => (
              <DetailsCard title={label} value={String(value)} key={label} />
            ))}
          </Grid>
        </Box>

        {/* Overview */}
        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            fontWeight="normal"
            color="secondary"
          >
            Investment Overview
          </StyledText>
          <StyledText
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="normal"
            color="bfgrey"
          >
            {investment.groupDescription || "No description available."}
          </StyledText>
        </Box>

        {/* Historical Performance */}
        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            fontWeight="medium"
            color="secondary"
          >
            Historical Performance
          </StyledText>

          <VStack
            align="stretch"
            bg="white"
            borderRadius="2xl"
            separator={<StackSeparator color="border" />}
            mt={3}
          >
            {[
              { year: 2025, performance: 20 },
              { year: 2024, performance: 18.5 },
              { year: 2023, performance: 12.7 },
              { year: 2022, performance: 9.2 },
            ].map(({ year, performance }: any) => (
              <HStack justify="space-between" key={year} px={4} py={3}>
                <StyledText
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="medium"
                  color="secondary"
                >
                  {year}
                </StyledText>
                <StyledText
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="medium"
                  color="primary"
                >
                  {performance}%
                </StyledText>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Info Alert */}
        <HStack
          py="12px"
          px="6px"
          bg="#FFF4EB"
          borderRadius="10px"
          justify="center"
          align="center"
        >
          <IoIosInformationCircleOutline size={20} color="#FFCA99" />
          <StyledText
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="normal"
            color="#D4A880"
          >
            Past performance is not indicative of future returns
          </StyledText>
        </HStack>
      </VStack>
    </Box>
  );
};

export default JoinedInvestmentDetailsLayout;
