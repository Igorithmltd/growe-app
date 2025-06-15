// app/profile/page.tsx or components/ProfileView.tsx
"use client";

import { Box, Avatar, Text, Button, VStack, Image, Icon, } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCameraRetro } from "react-icons/fa";

const ProfileView = () => {
  const router = useRouter();

  return (
    <Box textAlign="center" py={10}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Edit Profile
      </Text>
      <VStack spaceX={6} spaceY={4} align="center">
        <Box position="relative">
          <Image
            src="/images/profile-Image.jpeg"
            boxSize="70px"
            borderRadius="full"
          />
          <Icon
            as={FaCameraRetro}
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
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="2px solid"
          borderColor="gray.300" mb={4}>

          <Text fontWeight="bold" fontSize="xl" color={"bfgrey"}>User Id</Text>
          <Text  fontSize="lg" mb={4}>JohnDoe2025</Text>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="2px solid"
          borderColor="gray.300" mb={4}>

          <Text fontWeight="bold" fontSize="xl" color={"bfgrey"}>Name</Text>
          <Text  fontSize="lg" mb={4}>John Doe</Text>
        </Box>
        <Box  display={"flex"} justifyContent={"space-between"} w="full" borderBottom="2px solid"
          borderColor="gray.300" >
          <Text fontWeight="bold" fontSize="xl" color={"bfgrey"}>Email</Text>
          <Text color="gray.500" mb={4}>johndoe@example.com</Text>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="2px solid"
          borderColor="gray.300">
    
          <Text fontWeight="bold" fontSize="xl" color={"bfgrey"}>Phone</Text>
          <Text color="gray.500" mb={4}>+1 123 456 7890</Text>
        </Box>
        <Button width="full"
          borderRadius="lg"
          colorScheme="green"
          bg={"primary"}
          py={6}
          mt={4} onClick={() => router.push("/me/profile/edit")}>
          Edit Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileView;
