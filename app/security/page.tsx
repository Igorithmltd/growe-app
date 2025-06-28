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
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SecuritySettingsPage() {
  const router = useRouter();

  return (
    <Box px={6} py={6} mx="auto">
      <HStack mb={6}>
        <HiOutlineChevronLeft size={"20px"} onClick={() => router.push("/me")} cursor="pointer" />
        <Text>
          Security
        </Text>
      </HStack>

      <VStack spaceY={4} align="stretch">
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
            <Flex bg="#F4FCE5" rounded="full" p={2} align="center" justify="center">
              <Icon as={RiLockPasswordFill} boxSize={5} color="primary" />
            </Flex>
            <Text>Change Password</Text>
          </HStack>
          <Icon as={HiChevronRight} boxSize={5} color="gray.500" />
        </Flex>

        <Flex align="center" justify="space-between" bg="gray.50" rounded="lg" p={4} onClick={() => router.push("/security/biometric")} cursor="pointer">
          <HStack>
            <Flex bg="#F4FCE5" rounded="full" p={2} align="center" justify="center">
              <Icon as={RiFingerprintFill} boxSize={5} color="primary" />
            </Flex>
            <Text>Biometric Login</Text>
          </HStack>
          {/* <Switch colorScheme="green" /> */}
        </Flex>
      </VStack>
    </Box>
  );
}