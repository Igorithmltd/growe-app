/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Image,
  Badge,
  Icon,
  Button,
} from "@chakra-ui/react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { IoCopyOutline } from "react-icons/io5";
import useShowToast from "@/src/hooks/useShowToast";

export default function ReferralProgramPage() {
  const router = useRouter();
  const showToast = useShowToast();

  const referralCode = "REF/JohnDoe123";
  const totalReferrals = 5;
  const totalReward = "₦2,500";

  const referrals = [
    { name: "Ben Victor", status: "Successful", amount: "₦500", avatar: "/images/ben.png" },
    { name: "Goodluck Ben", status: "Successful", amount: "₦500", avatar: "/images/goodluck.png" },
    { name: "Uche Mark", status: "Successful", amount: "₦500", avatar: "/images/uche.png" },
    { name: "David Lookman", status: "Successful", amount: "₦500", avatar: "/images/uche.png" },
    { name: "Chioma Charity", status: "Successful", amount: "₦500", avatar: "/images/uche.png" },
  ];

  return (
    <Box p={6}>
      {/* Heading */}
      <HStack mb={6}>

        <HiOutlineChevronLeft size={"20px"} onClick={() => router.push("/me/profile")} cursor="pointer" />

        <Text>
          Referral Program
        </Text>
      </HStack>
      
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
          <Icon
            as={IoCopyOutline}
            cursor="pointer"
            color={"primary"}
            border={"primary"}
            onClick={() =>
              showToast({
                title: "",
                description: "Referral code copied",
                status: "info",
              })
            }
          />
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
        <VStack align="stretch" mb={6}>
          {referrals.map((ref, index) => (
            <HStack key={index} justify="space-between" p={3} bg="gray.50" borderRadius="md">
              <HStack spaceX={3}>
                {/* <Avatar src={ref.avatar} size="sm" /> */}
                <Image
                  src="/images/profile-Image.jpeg"
                  boxSize="70px"
                  borderRadius="full"
                />
                <Box>
                  <Text >{ref.name}</Text>
                  <HStack spaceX={1}>
                    <Badge bg={"#ecfeeb"} color={"#99db99"} borderRadius={20} >{ref.status}</Badge>
                  </HStack>

                </Box>
              </HStack>
              <Text color="primary">{ref.amount}</Text>
            </HStack>
          ))}
        </VStack>

        {/* Action Buttons */}
        <HStack spaceX={4}>
          <Button flex={1} bg="#F4FCE5" color="black" onClick={() =>
              showToast({
                title: "",
                description: "Referral code copied",
                status: "info",
              })
            }>
            Copy
          </Button>
          <Button flex={1} bg="primary" color="white">
            Share
          </Button>
        </HStack>
    </Box>
  );
}
