"use client";

import { BackIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { Box, VStack, Text, Icon, HStack, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiPhone, FiHelpCircle, FiStar } from "react-icons/fi";
import { ProfileIconCard } from "../../cards";

export default function HelpSupportLayout() {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <Box px={3} py={{ base: 3, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Help and Support
        </StyledText>
      </HStack>

      <VStack spaceY={4} align="stretch" mt={6}>
        <ProfileIconCard label="FAQ" icon={FiHelpCircle} onClick={() => router.push("/#faqs")} />

        <ProfileIconCard
          label="Contact Support"
          icon={FiPhone}
          onClick={() => router.push("/me/help-and-support/contact")}
        />

        <Box bg="white" cursor="pointer" boxShadow="none" borderRadius="15px" px={4} py={4}>
          <HStack spaceX={3} justify="space-between">
            <HStack spaceX={3} p={2}>
              <Box
                bg="#F4FCE5"
                p={2}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiStar} boxSize={6} color="primary" />
              </Box>
              <Text fontSize="md" color="secondary">
                Review the App
              </Text>
            </HStack>
            <Text fontSize="sm" color="bfgrey">
              Version 1.0
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
