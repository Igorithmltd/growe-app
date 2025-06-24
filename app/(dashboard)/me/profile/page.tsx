// app/profile/page.tsx or components/ProfileView.tsx
"use client";

import { Box, Avatar, Text, Button, VStack, Image, Badge, Icon, HStack, Flex, } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCameraRetro } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { PiFileXFill } from "react-icons/pi";
import { HiOutlineCamera } from "react-icons/hi2";

const ProfileView = () => {
  const router = useRouter();

  return (
    <Box>
      <Flex align={"center"} mb={6} gap={3} >
        <HiOutlineChevronLeft onClick={() => router.push("/me")} cursor="pointer" />
        <Text fontSize={"md"} color={"secondary"}>
          My Profile
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
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="1px solid"
          borderColor="gray.300" mb={4}>

          <Text fontSize="md" color={"bfgrey"}>User Id</Text>
          <Text fontSize="md" color={"secondary"} mb={4}>JohnDoe2025</Text>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="1px solid"
          borderColor="gray.300" mb={4}>

          <Text fontSize="md" color={"bfgrey"}>Name</Text>
          <Text fontSize="md" color={"secondary"} mb={4}>John Doe</Text>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="1px solid"
          borderColor="gray.300" >
          <Text fontSize="md" color={"bfgrey"}>Email</Text>
          <Text fontSize={"md"} color="secondary" mb={4}>johndoe@example.com</Text>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} w="full" borderBottom="1px solid"
          borderColor="gray.300">

          <Text fontSize="md" color={"bfgrey"}>Phone</Text>
          <Text fontSize={"md"} color="secondary" mb={4}>08163149876</Text>
        </Box>
        <Button width="full"
          borderRadius="lg"
          colorScheme="green"
          bg={"primary"}
          py={6}
          mt={8} onClick={() => router.push("/me/profile/edit")}>
          Edit Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileView;
