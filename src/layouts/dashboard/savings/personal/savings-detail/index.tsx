"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Box, Flex, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { ActiveSavingsCard, ActivityCard, DetailsCard } from "../../../cards";
import { FaUser } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { CiUnlock } from "react-icons/ci";
import { useRouter } from "next/navigation";

const data = [
  { label: "Target Amount", value: "₦800,000" },
  { label: "Frequent Amount", value: "₦800,000" },
  { label: "Interest Rate", value: "10% p.a" },
  { label: "Maturity Date", value: "Apr 15, 2025" },
  { label: "Automation", value: "Every Sunday" },
  { label: "Estimated Future Amount", value: "₦808,000" },
];

const SavingDetailsLayout = () => {
  const router = useRouter();

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack spaceX={3}>
        <Box onClick={() => router.back()}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Goal Info
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={90} />

        <Grid templateColumns="repeat(2, 1fr)" justifyContent="start" gap={6}>
          {data.map(({ label, value }) => (
            <DetailsCard title={label} value={value} key={label} />
          ))}
        </Grid>

        <HStack alignSelf={{ lg: "start" }} spaceX={6}>
          <StyledButton
            type="button"
            color="secondary"
            flex={{ base: 1, lg: "unset" }}
            bg="white"
            onClick={() => router.push("/savings/saving-goals/123/top-up")}
          >
            <Grid
              boxSize="30px"
              bg="#F8FBEB"
              color="primary"
              placeItems="center"
              borderRadius="full"
            >
              <MdPayment fontSize="14px" />
            </Grid>
            Top Up
          </StyledButton>
          <StyledButton
            type="button"
            color="secondary"
            flex={{ base: 1, lg: "unset" }}
            bg="white"
            px={8}
          >
            <Grid
              h="30px"
              w="30px"
              bg="#F8FBEB"
              color="primary"
              placeItems="center"
              borderRadius="full"
            >
              <CiUnlock />
            </Grid>
            Break Savings
          </StyledButton>
        </HStack>

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color="secondary">
            Latest Activities
          </StyledText>

          <VStack
            align="stretch"
            bg="white"
            borderRadius="2xl"
            separator={<StackSeparator color="border" />}
            mt={3}
          >
            <ActivityCard
              icon={<FaUser size={20} />}
              title="Rent Personal Savings Goal created"
              timeAgo="15 hours"
              status="Started"
            />
            <ActivityCard
              icon={<FaUser size={20} />}
              title="Deposited ₦133,000 for Rent savings goal"
              timeAgo="18 hours"
            />
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SavingDetailsLayout;
