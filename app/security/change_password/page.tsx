"use client";

import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  VStack,
  //   useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, } from "@chakra-ui/icons";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiChevronLeft, } from "react-icons/hi2";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleOld = () => setShowOld(!showOld);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  return (
    <Box px={6} py={6} mx="auto">
      <Flex align="center" mb={4}>
        <Icon
          as={HiChevronLeft}
          boxSize={5}
          cursor="pointer"
          aria-label="Go back"
          onClick={() => router.back()}
        />
        <Text ml={2} fontSize="lg" fontWeight="semibold">
          Change Password
        </Text>
      </Flex>

      <Text fontSize="sm" color="bfgrey" mb={6}>
        Keep your account secure by updating your password with a strong and unique one.
      </Text>

      <VStack spaceY={5} align="stretch">
        {/* Old Password */}

        <Box position="relative">
          <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Enter your current password</Text>
          <Box>
            <Input
              type={showOld ? "text" : "password"}
              placeholder="Enter your Current Password"
              bg="gray.50"
              border={"none"}
              outline={"none"}
              py={6}
              // pr="3rem"
            />
            <Icon
              as={showOld ? ViewOffIcon : ViewIcon}
              boxSize={5}
              position="absolute"
              top="50%"
              right="0.5rem"
              // transform="translateY(-20%)"
              aria-label="Toggle current password visibility"
              cursor="pointer"
              onClick={toggleOld}
            />
          </Box>
        </Box>

        {/* New Password */}
        <Box position="relative">
          <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Enter your new password</Text>
          <Box>
          <Input
            type={showNew ? "text" : "password"}
            placeholder="......"
            bg="gray.50"
            border={"none"}
            outline={"none"}
            py={6}
            // pr="3rem"
          />
          <Icon
            as={showNew ? ViewOffIcon : ViewIcon}
            boxSize={5}
            position="absolute"
            top="50%"
            right="0.5rem"
            // transform="translateY(-50%)"
            aria-label="Toggle new password visibility"
            cursor="pointer"
            onClick={toggleNew}
          />
          </Box>
        </Box>

        {/* Confirm Password */}
        <Box position="relative">
          <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block" color={"text"}>Confirm your new password</Text>
          <Box>

          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            bg="gray.50"
            border={"none"}
            outline={"none"}
            py={6}
            // pr="3rem"
          />
          <Icon
            as={showConfirm ? ViewOffIcon : ViewIcon}
            boxSize={5}
            position="absolute"
            top="50%"
            right="0.5rem"
            // transform="translateY(-50%)"
            aria-label="Toggle confirm password visibility"
            cursor="pointer"
            onClick={toggleConfirm}
          />
          </Box>
        </Box>

        {/* Update Button */}
        <Button colorScheme="green" bg={"primary"} py={6} size="lg" rounded="lg">
          Update Password
        </Button>
      </VStack>
    </Box>
  );
}
