"use client";
import React from "react";

import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RiLockPasswordFill, RiFingerprintFill } from "react-icons/ri";
import { BackIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { ProfileIconCard } from "../../cards";

export default function SecurityLayout() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Security
        </StyledText>
      </Box>

      <VStack spaceY={4} align="stretch" mt={6}>
        <ProfileIconCard
          label="Change Password"
          icon={RiLockPasswordFill}
          onClick={() => router.push("/me/security/change-password")}
        />
        <ProfileIconCard
          label="Biometric Login"
          icon={RiFingerprintFill}
          onClick={() => router.push("/me/security/biometric")}
        />
      </VStack>
    </Box>
  );
}
