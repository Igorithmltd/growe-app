"use client";

import { useRouter } from "next/navigation";
import { StyledText } from "@/src/components";
import { Box, VStack, Heading, Text, Badge, Image } from "@chakra-ui/react";
import { ProfileIconCard } from "../cards";
import { MdOutlinePersonOutline } from "react-icons/md";
import { PiHandWithdraw, PiPhoneLight } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import { IoGiftOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { Router } from "next/router";
import { ro } from "date-fns/locale";


const Account = () => {
  const user = useUserDetailsStore((state) => state.user);
  const router = useRouter();

  return (
    <Box>
       <VStack align="start" paddingBottom={8} position="relative">
          <Heading size="lg">My Account</Heading>
          <Text color="gray.500" fontSize="md">John Doe</Text>
          <Badge bg={"#ecfeeb"} color={"#99db99"} borderRadius={20} >Verified</Badge>
        </VStack> 

        <Image src="/images/profile-Image.jpeg" position="absolute" top={6} right={6} boxSize="70px" borderRadius="full" />

        <VStack spaceY={4} align="stretch">
          <ProfileIconCard
              label="Profile"
              icon={MdOutlinePersonOutline}
              onClick={() =>  router.push("/me/profile")}
          />
          <ProfileIconCard
              label="Withdraw funds"
              icon={PiHandWithdraw}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => router.push("/me/withdrawal")}
          />
          <ProfileIconCard
              label="Security"
              icon={GoLock}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => router.push("/security")}
          />
          <ProfileIconCard
              label="Referral Program"
              icon={IoGiftOutline}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => router.push("/referral")}
          />
          <ProfileIconCard
              label="Notification and Preferences"
              icon={HiOutlineBell}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => router.push("/notification-preferences")}
          />
          <ProfileIconCard
              label="Help and Support"
              icon={PiPhoneLight}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => router.push("/help_and_support")}
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
