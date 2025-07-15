"use client";

import {
  Box,
  Avatar,
  Text,
  Button,
  VStack,
  Icon,
  Float,
  Stack,
  StackSeparator,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiOutlineCamera } from "react-icons/hi2";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { StyledButton, StyledText } from "@/src/components";
import { BackIcon } from "@/public/svgs";

const ProfileDetailItem = ({ label, value }: { label: string; value: string }) => (
  <Box display="flex" justifyContent="space-between" w="full" py="16px">
    <Text fontSize={{ base: "sm", md: "md" }} color="bfgrey">
      {label}
    </Text>
    <Text fontSize={{ base: "md", md: "lg" }} color="secondary" mb={4}>
      {value}
    </Text>
  </Box>
);

const ProfileLayout = () => {
  const user = useUserDetailsStore((state) => state.user);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const profileFields = [
    { label: "User Id", value: user?.username ?? "-" },
    { label: "Name", value: fullName },
    { label: "Email", value: user?.email ?? "-" },
    { label: "Phone", value: user?.phoneNumber ?? "-" },
  ];

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          My Profile
        </StyledText>
      </Box>

      <VStack align="stretch">
        <Box alignSelf="center">
          <Avatar.Root  boxSize="100px">
          <Avatar.Fallback name={fullName} />
          <Avatar.Image src="/images/profile-Image.jpeg" />
          <Float placement="bottom-end" offsetX="1" offsetY="1">
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
          </Float>
        </Avatar.Root>

        <StyledText
          bg="#ECFAEAE5"
          color="#89C184"
          fontSize="sm"
          borderRadius="20px"
          py="4px"
          px="8px"
          textAlign="center"
          mt={3}
        >
          Verified
        </StyledText>
        </Box>

        <Stack separator={<StackSeparator color="#f4f4f4" />} align="stretch">
          {profileFields.map(({ label, value }) => (
            <ProfileDetailItem key={label} label={label} value={value} />
          ))}
        </Stack>

        <StyledButton
          width="full"
          bg={"primary"}
          py={6}
          mt={8}
          onClick={() => router.push("/me/profile/edit")}
        >
          Edit Profile
        </StyledButton>
      </VStack>
    </Box>
  );
};

export default ProfileLayout;
