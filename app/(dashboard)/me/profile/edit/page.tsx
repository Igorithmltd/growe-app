"use client";

import {
  Box,
  Input,
  Button,
  VStack,
  Image,
  Text,
  Icon, 
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext"; // make sure this is correctly imported
import { Label } from "recharts";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { setIsInfoOpen } = useModal();
  const router = useRouter();

  const handleSave = () => {
    // Perform save logic here, then open the modal
    setIsInfoOpen(true);
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Edit Profile
      </Text>

      <VStack spaceX={2} spaceY={6}>
        {/* Avatar with camera icon */}
        <Box position="relative">
          <Image
            src="/images/profile-Image.jpeg"
            boxSize="70px"
            borderRadius="full"
          />
          <Icon
            as={FaCamera}
            aria-label="Upload"
            size="sm"
            position="absolute"
            bottom={0}
            right={0}
            color="primary"
            borderRadius="full"
          />
        </Box>
        <Text fontSize="sm" color="primary" fontWeight="semibold">
          Verified
        </Text>

        {/* Form Fields */}
        <Box w="full">
           <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Full Nane</Text>
          <Input
            placeholder="Enter your full name"
            bg="gray.100"
            border={"none"}
            color={"text"}
          />
        </Box>
        <Box w="full">
           <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Email</Text>
          <Input
            placeholder="Enter your email"
            bg="gray.100"
            border={"none"}
            color={"text"}
          />
        </Box>
        <Box w="full">
           <Text as="label" fontSize={"sm"} fontWeight={"semi-bold"} mb={1} display="block">Phone Number</Text>
          <Input
            placeholder="Enter your Phone number"
            bg="gray.100"
            border={"none"}
            color={"text"}
          />
        </Box>

        <Button
          width="full"
          borderRadius="lg"
          colorScheme="green"
          bg={"primary"}
          onClick={handleSave}
          py={6}
          mt={4}
        >
          Save Changes
        </Button>
      </VStack>

      {/* Success Modal (controlled by context now) */}
      <InfoModal
        // title="Success"
        hasButton={true}
        buttonText="Back"
        onButtonClick={() =>{router.push("/me/profile")}}
        message="Hooray! Your profile has been updated successfully! 🎉    "
      />
    </Box>
  );
}
