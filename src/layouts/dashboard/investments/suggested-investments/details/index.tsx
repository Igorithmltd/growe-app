"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText, Loader } from "@/src/components";
import { Box, Grid, HStack, VStack, StackSeparator } from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import { DetailsCard, InvestmentImageCard } from "../../../cards";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import useShowToast from "@/src/hooks/useShowToast";
import { formatDateWithSuffix } from "@/src/utils/helpers";

const SuggestedDetailsLayout = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const toast = useShowToast();

  const { getInvestmentPlan } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["investment-details", id],
    queryFn: () => getInvestmentPlan(id),
    enabled: Boolean(id),
  });

  const investment = data?.data?.message;
  const loading = isPending || isFetching;

  if (loading) return <Loader />;

  if (error) {
    toast({
      title: "Failed to fetch investment details",
      description: "Please try again later.",
      status: "error",
    });
    return (
      <Box py={10} textAlign="center">
        <StyledText color="red.400">
          Unable to load investment details.
        </StyledText>
      </Box>
    );
  }

  return (
    <Box px={{ md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      {/* Header */}
      <HStack spaceX={3}>
        <Box onClick={() => router.back()} cursor="pointer">
          <BackIcon />
        </Box>
        <StyledText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
        >
          {investment?.title ?? "Investment Details"}
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        {/* Image Card */}
        <InvestmentImageCard
          name={investment?.title ?? "Investment"}
          bgImage={`url(${"/images/investments/cover.jpg"})`}
          image={"/images/investments/placeholder.png"}
        />

        {/* Verified badge */}
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

        {/* Header Info */}
        <HStack justify="space-between" align="center">
          <Box>
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="secondary"
            >
              {investment?.title}
            </StyledText>
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              mb={2}
              fontWeight="normal"
              color="bfgrey"
            >
              By {investment?.investmentType ?? "Investment Creator"}
            </StyledText>
          </Box>

          <Box textAlign="center">
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="primary"
            >
              ₦{investment?.minimumInvestmentAmount?.toLocaleString() ?? "—"}
            </StyledText>
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              mb={2}
              fontWeight="normal"
              color="bfgrey"
            >
              Per Unit
            </StyledText>
          </Box>
        </HStack>

        {/* Invest Button */}
        <StyledButton
          onClick={() =>
            router.push(`/investments/suggested-investments/${id}/invest`)
          }
        >
          Invest
        </StyledButton>

        {/* Investment Information */}
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
            <DetailsCard
              title="Investment Type"
              value={investment?.investmentType ?? "N/A"}
            />
            <DetailsCard
              title="Withdrawal Date"
              value={
                formatDateWithSuffix(String(investment?.withdrawalDate)) ??
                "N/A"
              }
            />
            <DetailsCard
              title="Start Date"
              value={
                formatDateWithSuffix(String(investment?.startDate)) ?? "N/A"
              }
            />
            {/* <DetailsCard title="Payout Type" value={investment.p ?? "N/A"} /> */}
            <DetailsCard
              title="Annual Return"
              value={`${investment?.annualReturn ?? 0}%`}
            />
            <DetailsCard
              title="Investors"
              value={String(investment?.investors) ?? 0}
            />
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
            {investment?.investmentDescription}
          </StyledText>
        </Box>

        {/* Historical Performance */}
        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
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

        {/* Note */}
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

export default SuggestedDetailsLayout;
