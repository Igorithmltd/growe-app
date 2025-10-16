"use client";

import { BackIcon } from "@/public/svgs";
import {
  Loader,
  StyledButton,
  StyledProgress,
  StyledText,
} from "@/src/components";
import { Box, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { DetailsCard, InvestmentImageCard } from "../../../../cards";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import useShowToast from "@/src/hooks/useShowToast";
import {
  copyToClipboard,
  formatDateWithSuffix,
  getDaysLeft,
} from "@/src/utils/helpers";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { useQuery } from "@tanstack/react-query";
import { useUserDetailsStore } from "@/src/stores/user-details";

const performanceData = [
  { year: 2025, performance: 20 },
  { year: 2024, performance: 18.5 },
  { year: 2023, performance: 12.7 },
  { year: 2022, performance: 9.2 },
];

const JoinedInvestmentDetailsLayout = ({ id }: { id: string }) => {
  const router = useRouter();
  const toast = useShowToast();
  const { getInvestment } = useInvestments();

  const user = useUserDetailsStore((state) => state.user);

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["investment-details", id],
    queryFn: () => getInvestment(id),
    enabled: !!id,
  });

  const loading = isPending || isFetching;

  const investment = data?.data.message;

  const handleCopy = async () => {
    const success = await copyToClipboard("hgvhgv");
    toast({
      title: success ? "Copied!" : "Copy failed",
      status: success ? "success" : "error",
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Box py={10} textAlign="center">
        <StyledText color="red.400">
          Failed to load investment details.
        </StyledText>
      </Box>
    );
  }

  const isOwner = user?._id === investment?.admin;

  const progress = getPercentage(
    investment?.investmentTarget ?? 0,
    investment?.totalAmount ?? 0
  );

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
          {investment?.title ?? "Investment Details"}
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <InvestmentImageCard
          name={investment?.title ?? "N/A"}
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
              {investment?.investmentId.title ?? "Investment Name"}
            </StyledText>
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              mb={2}
              fontWeight="normal"
              color="bfgrey"
            >
              By {investment?.investmentId.investmentType ?? "Unknown"}
            </StyledText>
          </Box>

          <Box textAlign="center">
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="primary"
            >
              ₦
              {investment?.investmentId.minimumInvestmentAmount?.toLocaleString() ??
                "0"}
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

        <StyledProgress max={100} value={progress} />

        <HStack justify="space-between">
          <StyledText
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            color="bfgrey"
          >
            {Number(
              getDaysLeft(investment?.startDate, investment?.withdrawalDate)
            )}{" "}
            days left
          </StyledText>
        </HStack>

        <HStack align="center" spaceX={4}>
          {isOwner && (
            <StyledButton
              type="button"
              color="primary"
              bg="border"
              flex={1}
              onClick={handleCopy}
            >
              <Grid
                boxSize="30px"
                bg="transparent"
                color="primary"
                placeItems="center"
                borderRadius="full"
              >
                <MdContentCopy />
              </Grid>
              Copy invite link
            </StyledButton>
          )}
          <StyledButton
            flex={1}
            onClick={() =>
              router.push(`/investments/active-groups/${id}/invest`)
            }
          >
            Invest
          </StyledButton>
        </HStack>

        {/* Investment Information */}
        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            color="secondary"
          >
            Investment Information
          </StyledText>
          <Grid templateColumns="repeat(2, 1fr)" justifyContent="start" gap={6}>
            {[
              {
                label: "Investment Type",
                value: investment?.investmentId.investmentType ?? "N/A",
              },
              {
                label: "Start Date",
                value:
                  formatDateWithSuffix(String(investment?.withdrawalDate)) ??
                  "N/A",
              },
              {
                label: "Withdrawal Date",
                value:
                  formatDateWithSuffix(String(investment?.withdrawalDate)) ??
                  "N/A",
              },

              {
                label: "Annual Return",
                value: `${investment?.interestRate ?? 0}%`,
              },
            ].map(({ label, value }) => (
              <DetailsCard title={label} value={String(value)} key={label} />
            ))}
          </Grid>
        </Box>

        {/* Overview */}
        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            color="secondary"
          >
            Investment Overview
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} color="bfgrey">
            {investment?.investmentId.investmentDescription ??
              "No description available for this investment."}
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
            {performanceData.map(({ year, performance }) => (
              <HStack justify="space-between" key={year} px={4} py={3}>
                <StyledText
                  fontSize={{ base: "md", md: "lg" }}
                  color="secondary"
                >
                  {year}
                </StyledText>
                <StyledText fontSize={{ base: "md", md: "lg" }} color="primary">
                  {performance}%
                </StyledText>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Footer Info */}
        <HStack
          py="12px"
          px="6px"
          bg="#FFF4EB"
          borderRadius="10px"
          justify="center"
          align="center"
        >
          <IoIosInformationCircleOutline size={20} color="#FFCA99" />
          <StyledText fontSize={{ base: "md", md: "lg" }} color="#D4A880">
            Past performance is not indicative of future returns
          </StyledText>
        </HStack>
      </VStack>
    </Box>
  );
};

export default JoinedInvestmentDetailsLayout;
