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
import { IoSettingsOutline } from "react-icons/io5";

export default function MyChatsPage() {
  const router = useRouter();
  const id = "education"; // Replace with actual group ID or data

  return (
    <Box p={1}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.600">
          My Chats
        </Text>
        <IconButton
          aria-label="Settings"
          size="md"
          variant="ghost"
        >
          <IoSettingsOutline color="gray.100" fontWeight={"bold"} />
        </IconButton>
      </Flex>

      {/* Chat Item */}
      <Box
        bg="white"
        borderRadius="lg"
        p={3}
        // shadow="sm"
        _hover={{ shadow: "md", cursor: "pointer" }}
        onClick={() => router.push(`/chat/${id}`)} // Replace with actual group ID
      >
        <Flex align="center">
          <img
            src="/images/group/3.jpg" // Replace with your actual icon path
            alt="Education"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "25%",
              objectFit: "cover",
              marginRight: "12px"
            }}
          />

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
            <Badge bg="red" fontSize="xs" borderRadius="full" px={"5px"}>
              1
            </Badge>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}
