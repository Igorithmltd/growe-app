"use client";

import { useRouter } from "next/navigation";
import { StyledText } from "@/src/components";
import { Box, HStack, VStack, Image, Avatar } from "@chakra-ui/react";
import { ProfileIconCard } from "../cards";
import { MdOutlinePersonOutline } from "react-icons/md";
import { PiHandWithdraw, PiPhoneLight } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import { IoGiftOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useUserDetailsStore } from "@/src/stores/user-details";

const Account = () => {
  const user = useUserDetailsStore((state) => state.user);
  const router = useRouter();

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack justify="space-between">
        <VStack align="start">
          <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
            My Account
          </StyledText>

          <StyledText color="bfgrey" fontSize={{ base: "sm", md: "md" }}>
            {fullName}
          </StyledText>
          <StyledText
            bg="#ECFAEAE5"
            color="#89C184"
            fontSize="xs"
            borderRadius="20px"
            py="4px"
            px="8px"
          >
            Verified
          </StyledText>
        </VStack>

        <Avatar.Root size="2xl">
          <Avatar.Fallback name={fullName} />
          <Avatar.Image src="/images/profile-Image.jpeg" />
        </Avatar.Root>
      </HStack>

      <VStack spaceY={4} align="stretch" mt={6}>
        <ProfileIconCard
          label="Profile"
          icon={MdOutlinePersonOutline}
          onClick={() => router.push("/me/profile")}
        />
        <ProfileIconCard
          label="Withdraw funds"
          icon={PiHandWithdraw}
          onClick={() => router.push("/me/withdrawal")}
        />
        <ProfileIconCard
          label="Security"
          icon={GoLock}
          onClick={() => router.push("/me/security")}
        />
        <ProfileIconCard
          label="Referral Program"
          icon={IoGiftOutline}
          onClick={() => router.push("/me/referral")}
        />
        <ProfileIconCard
          label="Notification and Preferences"
          icon={HiOutlineBell}
          onClick={() => router.push("/me/notification-preferences")}
        />
        <ProfileIconCard
          label="Help and Support"
          icon={PiPhoneLight}
          onClick={() => router.push("/me/help-and-support")}
        />
        <ProfileIconCard
          label="Logout"
          icon={RiLogoutCircleRLine}
          iconBg="#FFF5F5"
          iconColor="#ff7173"
          onClick={() => router.push("/login")}
        />
      </VStack>
    </Box>
  );
};

export default Account;
