// app/help-support/page.tsx
"use client";

import {
  Box,
  VStack,
  Text,
  Icon,
  HStack, 
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiPhone, FiHelpCircle, FiStar } from "react-icons/fi";

export default function HelpSupportPage() {
  const router = useRouter();

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Help and Support
      </Text>
      <VStack spaceX={4} spaceY={4} align="stretch">
        <LinkBox
          p={4}
          rounded="lg"
          bg="gray.50"
          shadow="md"
          onClick={() => router.push("/help-support/contact")}
          cursor="pointer"
        >
          <HStack spaceX={3} spaceY={3}>
            <Icon as={FiHelpCircle} boxSize={6} color="green.400" />
            <Box>
              <LinkOverlay>
                <Text fontWeight="medium">FAQ</Text>
              </LinkOverlay>
            </Box>
          </HStack>
        </LinkBox>

        <LinkBox
          p={4}
          rounded="lg"
          bg="gray.50"
          shadow="md"
          onClick={() => router.push("/help_and_support/contact")}
          cursor="pointer"
        >
          <HStack spaceX={3} spaceY={3} justify="space-between">
            <HStack spaceX={3} spaceY={3}>
              <Icon as={FiPhone} boxSize={6} color="green.400" />
              <Text fontWeight="medium">Contact Support</Text>
            </HStack>
            <Text>{">"}</Text>
          </HStack>
        </LinkBox>

        <Box p={4} rounded="lg" bg="gray.50" shadow="md">
          <HStack spaceX={3} spaceY={3} justify="space-between">
            <HStack spaceX={3} spaceY={3}>
              <Icon as={FiStar} boxSize={6} color="green.400" />
              <Text fontWeight="medium">Review the App</Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              Version 1.0
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
