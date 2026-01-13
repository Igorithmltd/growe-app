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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { BackIcon } from "@/public/svgs";
import useChats from "@/src/hooks/apis/queries/useChats";
import { useQuery } from "@tanstack/react-query";

type ChatMessage = {
  sender: string;
  text: string;
  timestamp: string;
};

export default function ChatDetailsLayout() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {getChatMessages} = useChats()

  const { data, isLoading, isPending } = useQuery({
      queryKey: ["chat-messages"],
      queryFn: getChatMessages,
    });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "Me",
      text: `Hello Guys, Welcome to Educational Savings Group.`,
      timestamp: "2 minutes ago",
    },
    {
      sender: "Goodluck Ben",
      text: "Thank you for this group.",
      timestamp: "1 minute ago",
    },
    {
      sender: "Me",
      text: `Hello Guys, Welcome to Educational Savings Group.`,
      timestamp: "2 minutes ago",
    },
    {
      sender: "Goodluck Ben",
      text: "Thank you for this group.",
      timestamp: "1 minute ago",
    },
    {
      sender: "Me",
      text: `Hello Guys, Welcome to Educational Savings Group.`,
      timestamp: "2 minutes ago",
    },
    {
      sender: "Goodluck Ben",
      text: "Thank you for this group.",
      timestamp: "1 minute ago",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "Me",
        text: message,
        timestamp: "Just now",
      },
    ]);

    setMessage("");
  };

  return (
    <Box h="100dvh">
      <Flex direction="column" h="full" w={{ lg: "65%" }} mx="auto" bg="white">
        <Flex
          position="sticky"
          top="0"
          zIndex="10"
          bg="white"
          px={4}
          py={3}
          borderBottom="1px solid"
          borderColor="gray.200"
          justify="space-between"
          align="center"
        >
          {showSearchInput ? (
            <HStack gap={3} width="100%">
              <BackIcon
                aria-label="Back"
                cursor="pointer"
                onClick={() => {
                  setShowSearchInput(false);
                  setSearchQuery("");
                }}
              />

              <Input
                placeholder="Search messages..."
                outline="none"
                border="none"
                bg={"bluelight"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                width="full"
                borderRadius="full"
              />
            </HStack>
          ) : (
            <>
              <HStack gap={3}>
                <Box cursor="pointer" onClick={() => router.back()}>
                  <BackIcon />
                </Box>
                <Box
                  w="30px"
                  h="30px"
                  borderRadius="md"
                  bg="gray.300"
                  bgImage="url('/images/group/3.jpg')"
                  bgSize="cover"
                  backgroundPosition="center"
                />
                <Box>
                  <Text fontWeight="medium" fontSize={{ base: "md", md: "lg" }} color="secondary">
                    Educational Savings Group
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="bfgrey" truncate>
                    Me, Ben Victor, Goodluck Ben...
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

        <VStack flex="1" align="stretch" spaceY={4} px={4} py={3} mt={6} overflowY="auto">
          {messages.map((msg, idx) => (
            <Box key={idx} display="flex" gap={4} w="full">
              <Avatar.Root size="lg">
                <Avatar.Fallback name={msg.sender} />
                <Avatar.Image src="/images/profile-Image.jpeg" />
              </Avatar.Root>

              <Box w="full">
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="xs" color="secondary">
                    {msg.sender}
                  </Text>
                  <Text fontSize="xs" color="bfgrey">
                    {msg.timestamp}
                  </Text>
                </Flex>

                <Box bg="#f8fbea" p={3} borderRadius="8px">
                  <Text fontSize="sm" color="bfgrey" whiteSpace="pre-line">
                    {msg.text}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}

          {/* scroll anchor */}
          <Box ref={bottomRef} />
        </VStack>

        {/* ================= INPUT ================= */}
        <Flex
          position="sticky"
          bottom="0"
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
            border="none"
            bg="bluelight"
            _focus={{ bg: "bluelight" }}
          />

          <IconButton
            aria-label="Send"
            bg="primary"
            color="white"
            borderRadius="full"
            onClick={handleSend}
          >
            <BiSolidSend />
          </IconButton>
        </Flex>

        {/* ================= MENU ================= */}
        {isMenuOpen && (
          <Box
            ref={menuRef}
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
            <VStack spaceY={2} align="stretch">
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/chat/education/group-details");
                }}
              >
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
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/chat");
                }}
              >
                Leave Group
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/me");
                }}
              >
                Settings
              </Button>
            </VStack>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
