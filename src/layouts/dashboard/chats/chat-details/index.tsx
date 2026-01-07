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
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BackIcon } from "@/public/svgs";
import { BiSolidSend } from "react-icons/bi";
import { StyledText } from "@/src/components";

type ChatMessage = {
  sender: string;
  text: string;
  timestamp: string;
};

export default function ChatDetailsLayout() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "Me",
      text: `Hello Guys, Welcome to Educational Savings Group.
The goal of this group is creating savings where we all save for educational purpose...`,
      timestamp: "2 minutes ago",
    },
    {
      sender: "Goodluck Ben",
      text: "Thank you for this group. I'm looking forward to saving to meet the goal. Thanks once again.",
      timestamp: "1 minute ago",
    },
    {
      sender: "Uche Mark",
      text: "Thank you for this group. I'm looking forward to saving to meet the goal. Thanks once again.",
      timestamp: "2 minutes ago",
    },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMsg: ChatMessage = {
      sender: "Me",
      text: message,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <Box  py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Flex justify="space-between" align="center" py={4} px={4} background={"white"}>
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
      <Flex direction="column" h="full" bg="white">
        <VStack align="stretch" spaceY={4} p={4} overflowY="auto" flex="1">
          {messages.map((msg, idx) => (
            <Box key={idx} display="flex" gap={4} w="full">
              <Avatar.Root size="lg">
                <Avatar.Fallback name={msg.sender} />
                <Avatar.Image src="/images/profile-Image.jpeg" />
              </Avatar.Root>

              <Box w="full">
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="secondary" fontWeight="normal">
                    {msg.sender}
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="bfgrey" fontWeight="normal">
                    {msg.timestamp}
                  </Text> 
                </Box>

                <Box bg="#f8fbea" p={4} borderRadius="8px">
                  <Text fontSize={{ base: "sm", md: "md" }} color="bfgrey" fontWeight="normal" whiteSpace="pre-line">
                    {msg.text}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </VStack>

        <Flex bg={"bluelight"}>
          <Input
            placeholder="Write message"
            borderRadius="full"
            mr={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            outline={"none"}
            border={"none"}
          />
          <IconButton
            aria-label="Send"
            colorScheme="green"
            borderRadius="full"
            onClick={handleSend}
            bg="primary"
          >
            <BiSolidSend />
          </IconButton>
        </Flex>

        {/* Dropdown */}
        {isMenuOpen && (
          <Box
            ref={menuRef}
            position="fixed"
            top={20}
            right={2}
            zIndex={10}
            bg="white"
            py={2}
            px={1}
            shadow="md"
            width="200px"
            borderRadius="2xl"
            borderTop="1px solid #ddd"
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
