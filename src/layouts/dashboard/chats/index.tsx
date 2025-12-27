"use client";

import { Box, Flex, IconButton } from "@chakra-ui/react";

import { IoSettingsOutline } from "react-icons/io5";
import ChatItem from "./chat-item";
import { BackIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { useRouter } from "next/navigation";

export default function ChatsLayout() {
  const router = useRouter();

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Flex justify="space-between" align="center" mb={6}>
        <Box display="flex" gap={4} alignItems="center">
          <Box cursor="pointer" onClick={() => router.back()}>
            <BackIcon />
          </Box>

          <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
           My Chats
          </StyledText>
        </Box>

        <IconButton aria-label="Settings" size="md" variant="ghost">
          <IoSettingsOutline color="gray.100" fontWeight={"bold"} />
        </IconButton>
      </Flex>

      <ChatItem id="ttt" />
    </Box>
  );
}
