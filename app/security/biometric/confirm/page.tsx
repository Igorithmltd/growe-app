"use client";

import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModal } from "@/src/contexts/ModalContext";
import InfoModal from "@/src/components/modals/InfoModal";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";

export default function ConfirmBiometric() {
  const { setIsInfoOpen } = useModal();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleConfirm = () => {
    //save logic to be handled there
    setIsInfoOpen(true);
  };

  return (
    <Box px={4} py={6} mx="auto">
      <Flex align={"center"} mb={6} gap={3} >
        <HiOutlineChevronLeft size={"20px"} onClick={() => router.push("/security/biometric")} cursor="pointer" />
        <Text fontSize={"lg"} color={"secondary"}>
          Confirm Your Identity
        </Text>
      </Flex>

      <Text fontSize="md" color="gray.500" mb={8}>
        Confirm your identity, enter your password to finalize the biometric setup.
      </Text>

      <VStack spaceY={6} align="stretch">
        <Box position="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="..........."
            bg="gray.50"
            border={"none"}
            fontSize={"xl"}
            color={"bfgrey"}
            letterSpacing={"7px"}
            fontWeight="extrabold"
            outline={"none"}
            py={6}
            pr="3rem"
          />
          <Icon
            as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye}
            boxSize={5}
            position="absolute"
            top="50%"
            right="0.5rem"
            transform="translateY(-50%)"
            cursor="pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </Box>

        <Button colorScheme="green" bg="primary" size="lg" rounded="lg" onClick={handleConfirm}>
          Confirm and Enable Biometric
        </Button>
      </VStack>

      <InfoModal
        // title="Success"
        icon={<GrStatusGood size={100} color="#9BAB69" />}
        hasButton={true}
        buttonText="Back"
        onButtonClick={() => { router.push("/security/biometric"), setIsInfoOpen(false) }}
        message="Biometric setup successful! "
      />
    </Box>
  );
}
