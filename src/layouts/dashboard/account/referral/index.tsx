"use client";

import {
  Box,
  VStack,
  HStack,
  Image,
  Badge,
  Icon,
  Avatar,
  StackSeparator,
} from "@chakra-ui/react";
import { IoCopyOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { BackIcon } from "@/public/svgs";
import useShowToast from "@/src/hooks/useShowToast";
import { StyledButton, StyledText } from "@/src/components";
import { copyToClipboard } from "@/src/utils/helpers";

export default function ReferralLayout() {
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

  const handleBack = () => router.back();

  const handleCopy = async () => {
    await copyToClipboard(referralCode);
    showToast({
      title: "",
      description: "Referral code copied",
      status: "info",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Growe and earn rewards",
          text: `Use my referral code ${referralCode} to join Growe and earn rewards!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      handleCopy();
      showToast({
        title: "Copied",
        description: "Referral copied. You can now paste and share manually.",
        status: "info",
      });
    }
  };

  return (
    <Box px={3} py={{ base: 3, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Referral Program
        </StyledText>
      </HStack>

      <StyledText fontSize={{ base: "sm", md: "md" }} color="bfgrey" mt={2}>
        Share your referral code or link with friends and earn amazing rewards when they sign up and
        save or invest with Growe!
      </StyledText>

      <Box my={6}>
        <Image
          src="/images/referral.webp"
          alt="Referral Banner"
          w="full"
          h="auto"
          objectFit="contain"
        />
      </Box>

      <VStack gap="16px" align="stretch">
        <Box>
          <StyledText fontSize={{ base: "sm", md: "md" }} mb={2} color="secondary">
            Your Referral Code
          </StyledText>

          <HStack px={6} py="15px" borderRadius="md" bg="#F8F8F8" justify="space-between" mb={4}>
            <StyledText fontSize={{ base: "md", md: "lg" }}>{referralCode}</StyledText>
            <Icon
              as={IoCopyOutline}
              cursor="pointer"
              color="primary"
              fontSize="lg"
              onClick={handleCopy}
            />
          </HStack>
        </Box>

        <HStack gap={4} mb={6}>
          <StatCard label="Total Referrals" value={totalReferrals} />
          <StatCard label="Total Reward" value={totalReward} />
        </HStack>

        <Box>
          <StyledText fontSize={{ base: "sm", md: "md" }} mb={2} color="secondary">
            Your Referrals
          </StyledText>

          <VStack align="stretch" separator={<StackSeparator color="border" />} mb={6}>
            {referrals.map((ref, index) => (
              <HStack key={index} justify="space-between" p={3} borderRadius="md">
                <HStack gap={3} align="center">
                  <Avatar.Root boxSize="38px">
                    <Avatar.Fallback name={ref.name} />
                    <Avatar.Image src="/images/profile-Image.jpeg" />
                  </Avatar.Root>
                  <Box>
                    <StyledText fontSize={{ base: "sm", md: "md" }} color="secondary">
                      {ref.name}
                    </StyledText>
                    <Badge bg="#ecfeeb" color="#99db99" borderRadius={20} mt={1}>
                      {ref.status}
                    </Badge>
                  </Box>
                </HStack>
                <StyledText fontSize={{ base: "sm", md: "md" }} color="primary">
                  {ref.amount}
                </StyledText>
              </HStack>
            ))}
          </VStack>
        </Box>
      </VStack>

      <HStack gap={4}>
        <StyledButton flex={1} bg="#EDF5CE" color="primary" onClick={handleCopy}>
          Copy
        </StyledButton>
        <StyledButton flex={1} onClick={handleShare}>
          Share
        </StyledButton>
      </HStack>
    </Box>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Box flex={1} p={6} bg="white" borderRadius="10px">
      <StyledText fontSize={{ base: "sm", md: "md" }} color="bfgrey" mb={2}>
        {label}
      </StyledText>
      <StyledText fontWeight="medium" color="secondary" fontSize="lg">
        {value}
      </StyledText>
    </Box>
  );
}
