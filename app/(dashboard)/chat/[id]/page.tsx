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
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from "react";
// import { useOutsideClick } from "@chakra-ui/react";

export default function EducationGroupChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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
    // Send logic here
    setMessage("");
  };

  return (
    <Flex direction="column" h="100vh">
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        p={4}
        borderBottom="1px solid #eee"
        bg="white"
      >
        <HStack spaceX={3}>
          <IconButton
            aria-label="Go Back"
            variant="ghost"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box
            w="30px"
            h="30px"
            borderRadius="md"
            bg="gray.300"
            bgImage="url('/icons/education.png')" // Replace with correct path
            bgSize="cover"
            backgroundPosition="center"
          />
          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              Educational Savings Group
            </Text>
            <Text fontSize="xs" color="gray.500" truncate>
              Me, Ben Victor, Goodluck Ben...
            </Text>
          </Box>
        </HStack>

        {/* Menu Icon Only */}
        <IconButton
          aria-label="Options"
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <BsThreeDotsVertical />
        </IconButton>
      </Flex>

      {/* Chat Area */}
      <VStack
        spaceX={4}
        align="stretch"
        p={4}
        overflowY="auto"
        flex="1"
        bg="gray.50"
      >
        {/* Me */}
        <Box alignSelf="flex-end" bg="green.100" p={3} borderRadius="xl" maxW="80%">
          <Text fontSize="sm" fontWeight="bold" mb={1}>
            Me
          </Text>
          <Text fontSize="sm">
            Hello Guys, Welcome to Educational Savings Group.
            <br />
            The goal of this group is creating savings where we all save for educational purpose...
          </Text>
        </Box>

        {/* Goodluck Ben */}
        <Box alignSelf="flex-start" maxW="80%">
          <Text fontSize="sm" fontWeight="bold" mb={1}>
            Goodluck Ben{" "}
            <Text as="span" fontSize="xs" color="gray.400">
              1 minute ago
            </Text>
          </Text>
          <Box bg="green.100" p={3} borderRadius="xl">
            <Text fontSize="sm">
              Thank you for this group. I'm looking forward to saving to meet the goal. Thanks once again.
            </Text>
          </Box>
        </Box>

        {/* Uche Mark */}
        <Box alignSelf="flex-start" maxW="80%">
          <Text fontSize="sm" fontWeight="bold" mb={1}>
            Uche Mark{" "}
            <Text as="span" fontSize="xs" color="gray.400">
              2 minutes ago
            </Text>
          </Text>
          <Box bg="green.100" p={3} borderRadius="xl">
            <Text fontSize="sm">
              Thank you for this group. I'm looking forward to saving to meet the goal. Thanks once again.
            </Text>
          </Box>
        </Box>
      </VStack>

      {/* Message Input */}
      <Flex p={4} borderTop="1px solid #eee" align="center" bg="white">
        <Input
          placeholder="Write message"
          borderRadius="full"
          mr={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton
          aria-label="Send"
          colorScheme="green"
          borderRadius="full"
          onClick={handleSend}
        >
          <FiSend />
        </IconButton>
      </Flex>

       {/* Bottom Sheet Dropdown */}
      {isMenuOpen && (
        <Box
        ref={menuRef} 
          position="fixed"
          // left={0}
          top={20}
          right={2}
          // bottom={0}
          zIndex={10}
          bg="white"  
          py={2}
          px={1}
          shadow="md"
          width="200px"
          maxHeight="300px"
          borderRadius="2xl"
          borderTop="1px solid #ddd"
        >
          <VStack spaceY={2} align="stretch">
            <Button
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => {
                setIsMenuOpen(false);
                // Navigate to group details
              }}
            >
               View Group Details
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => {
                setIsMenuOpen(false);
                // Trigger search messages
              }}
            >
              Search Messages
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => {
                setIsMenuOpen(false);
                // Logic to leave group
              }}
            >
               Leave Group
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => {
                setIsMenuOpen(false);
                // Logic to open settings
              }}
            >
              Settings
            </Button>
          </VStack>
        </Box>
      )}



    </Flex>
  );
}


