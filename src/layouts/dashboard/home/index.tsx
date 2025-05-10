"use client";

import { StyledText } from "@/src/components";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Avatar,
  Badge,
  Progress,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FiChevronRight, FiMessageSquare } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { AccountCard, SavingsCard } from "../cards";

const DashboardHome = () => {
  return (
    <Box w="full" p={2}>
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
        spaceX={{base: 2, md: 4}}
        overflowX="auto"
        mt={8}
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
        />
      </HStack>

      {/* Recent messages section */}
      <Heading size="sm" mb={3}>
        Recent Messages
      </Heading>

      <VStack spaceY={4} mb={6}>
        {/* Message 1 */}
        <Box w="full" p={3} borderWidth="1px" borderRadius="md">
          <Flex justify="space-between">
            <Text fontWeight="bold">Family Savings</Text>
            <Badge
              colorScheme="red"
              borderRadius="full"
              boxSize={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              1
            </Badge>
          </Flex>
          <Text fontSize="sm" color="gray.600">
            Payment for this month has been received
          </Text>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="xs" color="gray.400">
              2m ago
            </Text>
            {/* <Icon as={FiMessageSquare} color="gray.400" /> */}
          </Flex>
        </Box>

        {/* Message 2 */}
        <Box w="full" p={3} borderWidth="1px" borderRadius="md">
          <Flex justify="space-between">
            <Text fontWeight="bold">Investment Group</Text>
            <Badge
              colorScheme="red"
              borderRadius="full"
              boxSize={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              1
            </Badge>
          </Flex>
          <Text fontSize="sm" color="gray.600">
            New investment opportunity available
          </Text>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="xs" color="gray.400">
              1hr ago
            </Text>
            {/* <Icon as={FiMessageSquare} color="gray.400" /> */}
          </Flex>
        </Box>
      </VStack>

      {/* Active savings */}
      <Heading size="sm" mb={3}>
        Active Savings
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
        <Text fontWeight="bold" mb={2}>
          Rent
        </Text>
        <Text fontSize="sm" color="gray.500" mb={2}>
          6 months plan
        </Text>

        <VStack spaceY={2} mb={3}>
          <Flex justify="space-between" w="full">
            <Text fontSize="sm">90% completed</Text>
            <Text fontSize="sm">¥800,000</Text>
          </Flex>
          {/* <Progress value={90} size="sm" colorScheme="green" borderRadius="full" /> */}
        </VStack>

        <Text fontSize="sm" color="gray.500">
          Target amount
        </Text>
      </Box>

      {/* Promoted savings groups */}
      <Box bg="blue.50" p={4} borderRadius="md">
        <Heading size="sm" mb={2}>
          Promoted savings Groups
        </Heading>
        <Text fontSize="sm" mb={3}>
          ¥50K each
        </Text>
        <Button variant="solid" colorScheme="blue">
          Find more
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardHome;
