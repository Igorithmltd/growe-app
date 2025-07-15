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
// import { ViewIcon, ViewOffIcon, } from "@chakra-ui/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiChevronLeft, } from "react-icons/hi2";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";

export default function ChangePasswordPage() {
  const { setIsInfoOpen } = useModal();
  const router = useRouter();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleOld = () => setShowOld(!showOld);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleConfirm = () => {
    //save logic to be handled there
    setIsInfoOpen(true);
  };

  return (
    <Box px={6} py={6} mx="auto">
      <Flex align="center" mb={4}>
        <Icon
          as={HiChevronLeft}
          boxSize={5}
          cursor="pointer"
          aria-label="Go back"
          onClick={() => router.push("/security")}
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
              placeholder="..........."
              bg="gray.50"
              border={"none"}
              fontSize={"xl"}
              color={"bfgrey"}
              letterSpacing={"7px"}
              fontWeight="extrabold"
              outline={"none"}
              py={6}
            // pr="3rem"
            />
            <Icon
              as={showOld ? AiOutlineEyeInvisible : AiOutlineEye}
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
              placeholder="..........."
              bg="gray.50"
              border={"none"}
              fontSize={"xl"}
              color={"bfgrey"}
              letterSpacing={"7px"}
              fontWeight="extrabold"
              outline={"none"}
              py={6}
            // pr="3rem"
            />
            <Icon
              as={showNew ? AiOutlineEyeInvisible : AiOutlineEye}
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
              placeholder="..........."
              bg="gray.50"
              border={"none"}
              fontSize={"xl"}
              color={"bfgrey"}
              letterSpacing={"7px"}
              fontWeight="extrabold"
              outline={"none"}
              py={6}
            // pr="3rem"
            />
            <Icon
              as={showConfirm ? AiOutlineEyeInvisible : AiOutlineEye}
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
        <Button colorScheme="green" bg={"primary"} py={6} size="lg" rounded="lg" onClick={handleConfirm} cursor={"pointer"}>
          Update Password
        </Button>
      </VStack>
      <InfoModal
              // title="Success"
              icon={<TbLockPassword size={100} color="#9BAB69" />}
              hasButton={true}
              buttonText="Back"
              onButtonClick={() => { router.push("/security/biometric"), setIsInfoOpen(false) }}
              message="Success!🎉 Your password has been updated securely "
            />
    </Box>
  );
}
