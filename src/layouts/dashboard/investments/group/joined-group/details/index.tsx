"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Box, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { DetailsCard, InvestmentImageCard } from "../../../../cards";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import useShowToast from "@/src/hooks/useShowToast";
import { copyToClipboard } from "@/src/utils/helpers";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const data = [
  { label: "Investment type", value: "Full Equity" },
  { label: "Withdrawal Date", value: "₦2,000.00 per share" },
  { label: "Start Date", value: "30th of November" },
  { label: "Payout Type", value: "Profit paid by unit shares" },
  { label: "Annual Return", value: "20%" },
  { label: "Investors", value: "30" },
];

const performanceData = [
  { year: 2025, performance: 20 },
  { year: 2024, performance: 18.5 },
  { year: 2023, performance: 12.7 },
  { year: 2022, performance: 9.2 },
];

const SuggestedDetailsLayout = () => {
  const router = useRouter();

  const toast = useShowToast();

  const handleCopy = async () => {
    const success = await copyToClipboard("hgvhgv");
    toast({
      title: success ? "Copied!" : "Copy failed",
      status: success ? "success" : "error",
    });
  };

  return (
    <Box px={{ base: 3, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack spaceX={3}>
        <Box onClick={() => router.back()} cursor="pointer">
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          {""}
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <InvestmentImageCard
          name="Farmcrowdy Maize Farming"
          bgImage={"url('/images/investments/cover.jpg')"}
          image="/images/investments/2.png"
        />

        <StyledText
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="normal"
          color="primary"
          display="flex"
          alignItems="center"
          spaceX={1}
        >
          Verified investment <RiVerifiedBadgeFill />
        </StyledText>

        <HStack justify="space-between" align="center">
          <Box>
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="secondary"
            >
              Farmcrowdy Maize Farming
            </StyledText>
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              mb={2}
              fontWeight="normal"
              color="bfgrey"
            >
              By Taiwo Faith & CO
            </StyledText>
          </Box>

          <Box textAlign="center">
            <StyledText
              fontSize={{ base: "lg", md: "xl" }}
              mb={2}
              fontWeight="normal"
              color="primary"
            >
              ₦2,000,000
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

        <HStack justify="space-between" align="center" spaceX={4}>
          <StyledButton
            type="button"
            color="primary"
            bg="border"
            flex={{ base: 1, lg: "unset" }}
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
          <StyledButton
            onClick={() => router.push("/investments/suggested-investments/123/invest")}
          >
            Invest
          </StyledButton>
        </HStack>

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
            {data.map(({ label, value }) => (
              <DetailsCard title={label} value={value} key={label} />
            ))}
          </Grid>
        </Box>

        <Box>
          <StyledText
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            fontWeight="normal"
            color="secondary"
          >
            Investment Overview
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="bfgrey">
            Farmcrowdy is Nigeria’s first digital agriculture platform that connects investors with
            small-scale farmers. Invest in crops like maize, cassava, and rice, or poultry farming,
            and enjoy high-impact returns while supporting local agriculture. With flexible options
            starting from ₦90,000 per unit, Farmcrowdy offers returns of up to 25% per farming
            cycle. Each unit represents a share in a farm project, covering all essential costs from
            seeds to harvest. Take part in transforming Nigeria’s agriculture, one farm at a time.
          </StyledText>
        </Box>

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color="secondary">
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
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="medium"
                  color="secondary"
                >
                  {year}
                </StyledText>
                <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="primary">
                  {performance}%
                </StyledText>
              </HStack>
            ))}
          </VStack>
        </Box>

        <StyledText
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="normal"
          color="secondary"
          borderRadius="10px"
          textAlign="center"
          py="12px"
          px="6px"
          bg="#FFF4EB"
        >
          <IoIosInformationCircleOutline />
          Past performance is not indicative of future returns
        </StyledText>
      </VStack>
    </Box>
  );
};

export default SuggestedDetailsLayout;
