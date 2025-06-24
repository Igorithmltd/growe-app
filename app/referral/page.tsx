"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Image,
  IconButton,
  Icon,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

export default function ReferralProgramPage() {
  const referralCode = "REF/JohnDoe123";
  const totalReferrals = 5;
  const totalReward = "₦2,500";

  const referrals = [
    { name: "Ben Victor", status: "Successful", amount: "₦500", avatar: "/images/ben.png" },
    { name: "Goodluck Ben", status: "Successful", amount: "₦500", avatar: "/images/goodluck.png" },
    { name: "Uche Mark", status: "Successful", amount: "₦500", avatar: "/images/uche.png" },
  ];

  return (
    <Box p={6}>
      {/* Heading */}
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Referral Program
      </Text>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Share your referral code or link with friends and earn amazing rewards when they sign up and save or invest with Growe!
      </Text>

      {/* Illustration */}
      <Image
        src="/images/group/1.jpg"
        alt="Referral Banner"
        height={"300px"}
        width={"100vw"}
        borderRadius="lg"
        mb={6}
      />

      {/* Referral Code Box */}
      <Text fontWeight="medium" mb={2}>Your Referral Code</Text>
      <HStack
        spaceX={2}
        p={2}
        borderRadius="md"
        bg="gray.100"
        mb={4}
      >
        <Input value={referralCode} readOnly border="none" bg="transparent" />
        <Icon as={FaCopy} cursor="pointer" color={"primary"} border={"primary"}/>
        {/* <IconButton aria-label="Copy Code" as={FaCopy} color={"white"} /> */}
      </HStack>

      {/* Referral Stats */}
      <HStack spaceX={4} mb={6}>
        <Box flex={1} p={4} bg="gray.100" borderRadius="md" textAlign="center">
          <Text fontSize="sm" color="gray.600">Total Referrals</Text>
          <Text fontWeight="bold" fontSize="lg">{totalReferrals}</Text>
        </Box>
        <Box flex={1} p={4} bg="gray.100" borderRadius="md" textAlign="center">
          <Text fontSize="sm" color="gray.600">Total Reward</Text>
          <Text fontWeight="bold" fontSize="lg">{totalReward}</Text>
        </Box>
      </HStack>

      {/* Referral List */}
      <Text fontWeight="medium" mb={3}>Your Referrals</Text>
      <VStack spaceX={4} align="stretch" mb={6}>
        {referrals.map((ref, index) => (
          <HStack key={index} justify="space-between" p={3} bg="gray.50" borderRadius="md">
            <HStack>
              {/* <Avatar src={ref.avatar} size="sm" /> */}
              <Image
                          src="/images/profile-Image.jpeg"
                          boxSize="70px"
                          borderRadius="full"
                        />
              <Box>
                <Text fontWeight="medium">{ref.name}</Text>
                <HStack spaceX={1}>
                  <Icon as={FaCheckCircle} color="green.400" boxSize={3} />
                  <Text fontSize="xs" color="green.500">{ref.status}</Text>
                </HStack>
                {/* <Text fontSize="xs" color="green.500">{ref.status}</Text> */}
              </Box>
            </HStack>
            <Text color="green.500">{ref.amount}</Text>
          </HStack>
        ))}
      </VStack>

      {/* Action Buttons */}
      <HStack spaceX={4}>
        <Button flex={1} bg="gray.100" color="black">
          Copy
        </Button>
        <Button flex={1} bg="green.400" color="white">
          Share
        </Button>
      </HStack>
    </Box>
  );
}
