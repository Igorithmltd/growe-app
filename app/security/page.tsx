// app/security/page.tsx
"use client";
import React from "react";

import {
  Box,
  Text,
  VStack,
  Flex,
  Icon,
  Switch,
  HStack,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiChevronRight } from "react-icons/hi2";
import { RiLockPasswordFill, RiFingerprintFill } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SecuritySettingsPage() {
  const router = useRouter();

  return (
    <Box px={6} py={6} mx="auto">
      <Flex align="center" mb={4} onClick={() => router.back()} cursor="pointer">
        <Icon as={IoMdArrowBack} boxSize={5} mr={2} />
        <Text fontSize="xl" fontWeight="semibold">
          Security
        </Text>
      </Flex>

      <VStack spaceX={4} spaceY={4} align="stretch">
        <Flex
          align="center"
          justify="space-between"
          bg="gray.50"
          rounded="lg"
          p={4}
          onClick={() => router.push("/security/change_password")}
          cursor="pointer"
        >
          <HStack>
            <Flex bg="green.100" rounded="full" p={2} align="center" justify="center">
              <Icon as={RiLockPasswordFill} boxSize={5} color="green.600" />
            </Flex>
            <Text>Change Password</Text>
          </HStack>
          <Icon as={HiChevronRight} boxSize={5} color="gray.500" />
        </Flex>

        <Flex align="center" justify="space-between" bg="gray.50" rounded="lg" p={4}>
          <HStack>
            <Flex bg="green.100" rounded="full" p={2} align="center" justify="center">
              <Icon as={RiFingerprintFill} boxSize={5} color="green.600" />
            </Flex>
            <Text>Biometric Login</Text>
          </HStack>
          {/* <Switch colorScheme="green" /> */}
        </Flex>
      </VStack>
    </Box>
  );
}