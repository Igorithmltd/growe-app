"use client";

import { StyledText } from "@/src/components";
import { Box, Flex, Text, Heading, VStack, HStack, Badge, Button } from "@chakra-ui/react";
import { GoBell } from "react-icons/go";
import { AccountCard, MessageCard, SavingsCard } from "../cards";
import { MdChevronRight } from "react-icons/md";

const DashboardHome = () => {
  return (
    <VStack w="full" align="stretch" spaceY={{ base: 6, md: 8 }} p={2}>
      {/* Header with welcome message */}
      <HStack justify="space-between" align="center" mb={6}>
        <VStack align="flex-start" spaceY={0}>
          <StyledText fontSize={{ base: "lg", md: "xl" }} fontWeight="medium" color="primary">
            Hello, John
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="secondary">
            Welcome back
          </StyledText>
        </VStack>

        <Box boxSize={{ base: "22px", md: "24px" }} color="bfgrey">
          <GoBell size="100%" />
        </Box>
      </HStack>

      {/* Total savings section */}
      <SavingsCard
        title="Total Savings"
        amount="0.00"
        interest="0%"
        bgImage="url('/images/card-image.webp')"
        notes="Financial Notes ›"
        buttonText="View Savings"
        buttonAction={() => {}}
        notesAction={() => {}}
      />

      {/* Account info */}

      <HStack
        spaceX={{ base: 2, md: 4 }}
        overflowX="auto"
        css={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        <AccountCard
          accountName="John Doe"
          accountNumber="0123456789"
          bank="Monniepoint Microfinance Bank"
        />

        <AccountCard
          accountName="John Doe"
          accountNumber="0123456789"
          bank="Monniepoint Microfinance Bank"
          bg="#F6EDD9"
        />
      </HStack>

      {/* Recent messages section */}
      <Box>
        <HStack justify="space-between">
          <StyledText
            fontSize={{ base: "md", md: "lg", lg: "2xl" }}
            fontWeight="medium"
            color="secondary"
          >
            Recent Messages
          </StyledText>

          <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
        </HStack>

        <VStack align="stretch" spaceY={4} mt={6}>
          <MessageCard
            timeAgo="2m ago"
            title="Family Savings"
            message="Payment for this month has been received"
          />

          <MessageCard
            timeAgo="1hr ago"
            title="Investment Group"
            message="New investment opportunity available"
          />
        </VStack>
      </Box>

      {/* Active savings */}
      <Box>
        <HStack justify="space-between">
          <StyledText
            fontSize={{ base: "md", md: "lg", lg: "2xl" }}
            fontWeight="medium"
            color="secondary"
          >
            Active Savings
          </StyledText>

          <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
        </HStack>

        <VStack align="stretch" spaceY={4} mt={6}>
          <MessageCard
            timeAgo="2m ago"
            title="Family Savings"
            message="Payment for this month has been received"
          />

          <MessageCard
            timeAgo="1hr ago"
            title="Investment Group"
            message="New investment opportunity available"
          />
        </VStack>
      </Box>
    </VStack>
  );
};

export default DashboardHome;
