"use client";

import { Box, Center, Flex, IconButton, VStack } from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import ChatItem from "./chat-item";
import { BackIcon } from "@/public/svgs";
import { Loader, StyledText } from "@/src/components";
import { useRouter } from "next/navigation";
import useChats from "@/src/hooks/apis/queries/useChats";
import { useQuery } from "@tanstack/react-query";

export default function ChatsLayout() {
  const router = useRouter();
  const { getChatList } = useChats();

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["chats-list"],
    queryFn: getChatList,
  });

  const loading = isLoading || isPending;
  const chats = data?.data.message || [];

  return (
    <Box h="100vh" w={{ lg: "65%" }} mx="auto" px={6} display="flex" flexDirection="column">
      <Flex
        justify="space-between"
        align="center"
        py={{ base: 5, lg: 10 }}
        position="sticky"
        top={0}
        zIndex={10}
        bg="white"
        boxShadow="0 4px 6px -4px rgba(0, 0, 0, 0.15)"
      >
        <Box display="flex" gap={4} alignItems="center">
          <Box cursor="pointer" onClick={() => router.back()}>
            <BackIcon />
          </Box>

          <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
            My Chats
          </StyledText>
        </Box>

        <IconButton aria-label="Settings" size="md" variant="ghost">
          <IoSettingsOutline color="gray.100" />
        </IconButton>
      </Flex>

      <Box flex="1" overflowY="auto" pb={4}>
        {loading ? (
          <Loader />
        ) : chats.length ? (
          <VStack spaceY={4} align="stretch" mt={2}>
            {chats.map((chat) => (
              <ChatItem key={chat._id} chat={chat} />
            ))}
          </VStack>
        ) : (
          <Center h="100%">
            <StyledText textAlign="center" color="secondary" fontSize="lg">
              You have no chats yet.
            </StyledText>
          </Center>
        )}
      </Box>
    </Box>
  );
}
