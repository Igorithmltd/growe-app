"use client";

import {
  Box,
  Input,
  Button,
  VStack,
  Image,
  Flex,
  Badge,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext"; // make sure this is correctly imported
import { Label } from "recharts";
import { useRouter } from "next/navigation";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import { BsPersonCheck } from "react-icons/bs";

export default function EditProfilePage() {
  const { setIsInfoOpen } = useModal();
  const router = useRouter();

  const handleSave = () => {
    // Perform save logic here, then open the modal
    setIsInfoOpen(true);
  };

  return (
    <Box>
      <Flex align={"center"} mb={6} gap={3} >
        <HiOutlineChevronLeft size={"lg"} onClick={() => router.push("/me/profile")} cursor="pointer" />
        <Text fontSize={"md"} color={"secondary"}>
          Edit Profile
        </Text>
      </Flex>
      <VStack align="center">
        <Box position="relative">
          <Image
            src="/images/profile-Image.jpeg"
            boxSize="80px"
            borderRadius="full"
          />
          <Icon
            as={HiOutlineCamera}
            aria-label="Upload"
            size="xl"
            bg={"white"}
            position="absolute"
            p={1}
            bottom={0}
            right={0}
            color="primary"
            borderRadius="full"
          />
        </Box>
        <Badge bg={"#ecfeeb"} color={"#99db99"} borderRadius={20} >Verified</Badge>

        {/* Form Fields */}
        <Box w="full">
          <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Full Name</Text>
          <Input
            placeholder="Enter your full name"
            bg="gray.100"
            border={"none"}
            color={"secondary"}
            mb={2}
          />
        </Box>
        <Box w="full">
          <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Email</Text>
          <Input
            placeholder="Enter your email"
            bg="gray.100"
            border={"none"}
            color={"secondary"}
            mb={2}
          />
        </Box>
        <Box w="full">
          <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Phone Number</Text>
          <Input
            placeholder="Enter your Phone number"
            bg="gray.100"
            border={"none"}
            color={"secondary"}
            mb={2}
          />
        </Box>

        <Button
          width="full"
          borderRadius="xl"
          colorScheme="green"
          bg={"primary"}
          onClick={handleSave}
          py={6}
          mt={3}
        >
          Save Changes
        </Button>
      </VStack>

      {/* Success Modal (controlled by context now) */}
      <InfoModal
        // title="Success"
        icon={<BsPersonCheck size={100} color="#9BAB69" />}
        hasButton={true}
        buttonText="Back"
        onButtonClick={() => { router.push("/me/profile"), setIsInfoOpen(false) }}
        message="Hooray! Your profile has been updated successfully! 🎉    "
      />
    </Box>
  );
}
