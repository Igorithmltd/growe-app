"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Badge,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function MyChatsPage() {
  const router = useRouter();
  const id = "education"; // Replace with actual group ID or data

  return (
    <Box p={4}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="semibold" color="green.700">
          My Chats
        </Text>
        <IconButton
          aria-label="Settings"
          size="sm"
          variant="ghost"
        >
          <SettingsIcon />
        </IconButton>
      </Flex>

      {/* Chat Item */}
      <Box
        bg="white"
        borderRadius="lg"
        p={3}
        shadow="sm"
        _hover={{ shadow: "md", cursor: "pointer" }}
        onClick={() => router.push(`/chat/${id}`)} // Replace with actual group ID
      >
        <Flex align="center">
          {/* <Avatar
            src="/icons/education.png" // Replace with your actual icon path
            name="Education"
            size="md"
            mr={3}
          /> */}

          <VStack align="start" spaceX={0} spaceY={0} flex="1">
            <Text fontWeight="medium">Education Savings Group</Text>
            <Text fontSize="sm" color="gray.500">
              20 group members
            </Text>
          </VStack>

          <VStack align="end" spaceX={0} spaceY={0}>
            <Text fontSize="xs" color="gray.500">
              11:31 AM
            </Text>
            <Badge colorScheme="red" borderRadius="full" px={2}>
              1
            </Badge>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}
