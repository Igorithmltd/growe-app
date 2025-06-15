"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function WithdrawFundsPage() {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("1234567891");
  const [accountName, setAccountName] = useState("John Doe");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const toast = useToast();

  const handleGenerateOtp = () => {
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "An OTP code has been sent to your phone.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    toast({
      title: "Bank Details Saved",
      description: "Your withdrawal bank details were saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Withdraw Funds
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        When you withdraw, your saved funds in the Growe app are securely sent
        to your linked bank account, quick, easy, and reliable!
      </Text>

      <VStack spacing={5} align="stretch">
        <FormControl>
          <FormLabel fontSize="sm">What’s your bank</FormLabel>
          <Select
            placeholder="Select Bank"
            bg="gray.50"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="firstbank">First Bank</option>
            <option value="gtbank">GTBank</option>
            <option value="access">Access Bank</option>
            {/* Add more banks as needed */}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">What’s your account number</FormLabel>
          <Input
            type="text"
            bg="gray.50"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">Account name</FormLabel>
          <Input
            type="text"
            bg="gray.50"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">
            Enter OTP. Tap action below to generate code
          </FormLabel>
          <Input
            type="text"
            bg="gray.50"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </FormControl>

        <Button
          variant="ghost"
          colorScheme="green"
          size="sm"
          onClick={handleGenerateOtp}
          alignSelf="flex-end"
        >
          Tap to generate OTP
        </Button>

        <Button
          bg="green.400"
          color="white"
          size="lg"
          _hover={{ bg: "green.500" }}
          onClick={handleSave}
          mt={4}
        >
          Save Bank Details
        </Button>
      </VStack>
    </Box>
  );
}
