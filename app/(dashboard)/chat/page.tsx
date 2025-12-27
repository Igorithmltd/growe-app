"use client";

import { Box, Flex, Text, IconButton, Badge, VStack, Spacer } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import ChatsLayout from "@/src/layouts/dashboard/chats";

export default function MyChatsPage() {
  const router = useRouter();
  const id = "education"; // Replace with actual group ID or data

  return <ChatsLayout />;
}
