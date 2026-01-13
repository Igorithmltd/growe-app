"use client";

import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  Input,
  Text,
  VStack,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { BackIcon } from "@/public/svgs";
import useChats from "@/src/hooks/apis/queries/useChats";
import { useQuery } from "@tanstack/react-query";
import { useChatMutation } from "@/src/hooks/apis/mutation/dashboard/useChat";
import { groupMessagesByDate, timeAgo } from "@/src/utils/helpers";

export default function ChatDetailsLayout() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [message, setMessage] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const { getChatMessages } = useChats();
  const { sendChatMessage, isSendingMessage } = useChatMutation();

  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["chat-messages", id],
    queryFn: () =>
      getChatMessages({
        roomId: id,
        page: 1,
        limit: 50,
      }),
    enabled: !!id,
  });

  // Use our typed Message array
  const messages: Message[] = data?.data?.message ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    sendChatMessage(
      {
        groupId: id,
        receiverId: id,
        message,
        type: "text",
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );

    setMessage("");
  };

  return (
    <Box h="100dvh">
      <Flex direction="column" h="full" w={{ lg: "65%" }} mx="auto" bg="white">
        <Flex
          position="sticky"
          top={0}
          zIndex={10}
          bg="white"
          px={4}
          py={3}
          justify="space-between"
          align="center"
          boxShadow="0 4px 6px -4px rgba(0,0,0,0.15)"
        >
          {showSearchInput ? (
            <HStack gap={3} w="full">
              <BackIcon
                cursor="pointer"
                onClick={() => {
                  setShowSearchInput(false);
                  setSearchQuery("");
                }}
              />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="bluelight"
                borderRadius="full"
              />
            </HStack>
          ) : (
            <>
              <HStack gap={3}>
                <Box cursor="pointer" onClick={() => router.back()}>
                  <BackIcon />
                </Box>

                <Avatar.Root size="sm">
                  <Avatar.Image src="/images/group/3.jpg" />
                  <Avatar.Fallback name="Group" />
                </Avatar.Root>

                <Box>
                  <Text fontWeight="medium" color="secondary">
                    Educational Savings Group
                  </Text>
                  <Text fontSize="xs" color="bfgrey" truncate>
                    Group Chat
                  </Text>
                </Box>
              </HStack>

              <IconButton
                aria-label="Options"
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <BsThreeDotsVertical />
              </IconButton>
            </>
          )}
        </Flex>

        <VStack
          flex="1"
          align="stretch"
          spaceY={4} 
          px={4}
          py={3}
          overflowY="auto"
          mt={{ base: "100px", lg: 14 }}
        >
          {isLoading || isPending ? (
            <Center flex={1}>
              <Text textAlign="center" color="secondary" fontSize={{ base: "md", lg: "lg" }}>
                Loading messages...
              </Text>
            </Center>
          ) : messages.length ? (
            groupMessagesByDate(messages).map((group) => (
              <Box key={group.dateLabel} mb={4}>
                <Text textAlign="center" fontSize="xs" color="bfgrey" mb={2}>
                  {group.dateLabel}
                </Text>

                {group.messages.map((msg) => (
                  <Box key={msg._id} display="flex" gap={4} mb={2}>
                    <Avatar.Root size="sm">
                      <Avatar.Fallback
                        name={`${msg.senderId.firstName} ${msg.senderId.lastName}`}
                      />
                    </Avatar.Root>

                    <Box w="full">
                      <Flex justify="space-between" mb={1}>
                        <Text fontSize="xs" color="secondary">
                          {msg.senderId.firstName} {msg.senderId.lastName}
                        </Text>
                        <Text fontSize="xs" color="bfgrey">
                          {timeAgo(msg.createdAt)}
                        </Text>
                      </Flex>

                      <Box bg="#f8fbea" p={3} borderRadius="lg">
                        <Text fontSize="sm" color="bfgrey">
                          {msg.message}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Center flex={1}>
              <Text textAlign="center" color="secondary" fontSize={{ base: "md", lg: "lg" }}>
                No messages yet. Start the conversation!
              </Text>
            </Center>
          )}

          <Box ref={bottomRef} />
        </VStack>

        <Flex
          position="sticky"
          bottom={0}
          bg="white"
          px={3}
          py={2}
          gap={2}
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <Input
            placeholder="Write message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            borderRadius="full"
            bg="bluelight"
          />

          <IconButton
            aria-label="Send"
            bg="primary"
            color="white"
            borderRadius="full"
            onClick={handleSend}
            loading={isSendingMessage}
          >
            <BiSolidSend />
          </IconButton>
        </Flex>

        {isMenuOpen && (
          <Box
            position="fixed"
            top="70px"
            right="20px"
            zIndex={20}
            bg="white"
            shadow="md"
            borderRadius="2xl"
            p={2}
            w="200px"
          >
            <VStack align="stretch">
              <Button variant="ghost" justifyContent="flex-start">
                View Group Details
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSearchInput(true);
                }}
              >
                Search Messages
              </Button>
              <Button variant="ghost" justifyContent="flex-start">
                Leave Group
              </Button>
            </VStack>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
