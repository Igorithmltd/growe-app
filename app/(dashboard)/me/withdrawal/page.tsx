"use client";

import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { HiChevronLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function WithdrawFundsPage() {
  const router = useRouter()

  return (
    <Box p={2}>
      {/* Back & Title */}
      <Flex align={"center"} mb={6} gap={3} >
        <HiChevronLeft size={21} onClick={() => router.push("/me")} cursor="pointer" />
        <Text fontSize={"md"} color={"secondary"}>
          Withdraw Funds
        </Text>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={6}>
        When you withdraw, your saved funds in the Growe app are securely sent
        to your linked bank account, quick, easy, and reliable!
      </Text>

      <VStack align="stretch">
        {/* Bank Selection */}
        <Box>
          <Text fontSize="sm" mb={1}>
            What’s your bank
          </Text>
          <Select placeholder="Select Bank" />
        </Box>

        {/* Account Number */}
        <Box>
          <Text fontSize="sm" mb={1}>
            What’s your account number
          </Text>
          <Input
            placeholder="1234567891"
            bg="gray.50"
            border="none"
            type="number"
          />
        </Box>

        {/* Account Name */}
        <Box>
          <Text fontSize="sm" mb={1}>
            Account name
          </Text>
          <Input placeholder="John Doe" bg="gray.50" border="none" />
        </Box>

        {/* OTP */}
        <Box>
          <Text fontSize="sm" mb={1}>
            Enter OTP. Tap action below to generate code
          </Text>
          <Input placeholder="" bg="gray.50" border="none" />
          <Flex justify="flex-end" mt={2}>
            <Text
              fontSize="xs"
              bg="#ecfeeb"
              color="#99db99"
              px={4}
              py={1}
              borderRadius="full"
              cursor="pointer"
              _hover={{ bg: "green.100" }}
            >
              Tap to generate OTP
            </Text>
          </Flex>
        </Box>

        {/* Submit Button */}
        <Button
          mt={6}
          colorScheme="green"
          bg="primary"
          // _hover={{ bg: "green.500" }}
          size="lg"
          borderRadius="xl"
        >
          Save Bank Details
        </Button>
      </VStack>
    </Box>
  );
}
