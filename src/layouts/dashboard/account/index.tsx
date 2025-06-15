"use client";

import { useRouter } from "next/navigation";
import { StyledText } from "@/src/components";
import { Box, VStack, Heading, Text, Badge, Image } from "@chakra-ui/react";
import { GoBell } from "react-icons/go";
import { ProfileIconCard } from "../cards";
import {  MdLogout, MdSettings, MdPersonOutline, } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FaChevronRight, FaMoneyBillWave, FaGift, FaLock,FaBell, FaPhone} from "react-icons/fa6";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { Router } from "next/router";
import { ro } from "date-fns/locale";


const Account = () => {
  const user = useUserDetailsStore((state) => state.user);
  const router = useRouter();

  return (
    <Box>
       <VStack align="start" paddingBottom={8} position="relative">
          <Heading size="md">My Account</Heading>
          <Text color="gray.500">John Doe</Text>
          <Badge bg={"green.100"} color={"green.400"}>Verified</Badge>
        </VStack> 

        <Image src="/images/profile-Image.jpeg" position="absolute" top={6} right={6} boxSize="70px" borderRadius="full" />

        <VStack spaceY={4} align="stretch">
          <ProfileIconCard
              label="Profile"
              icon={MdPersonOutline}
              onClick={() =>  router.push("/me/profile")}
          />
          <ProfileIconCard
              label="Withdraw funds"
              icon={FaMoneyBillWave}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => console.log("Go to settings")}
          />
          <ProfileIconCard
              label="Security"
              icon={FaLock}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => console.log("Go to settings")}
          />
          <ProfileIconCard
              label="Referral Program"
              icon={FaGift}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => console.log("Go to settings")}
          />
          <ProfileIconCard
              label="Notification and Preferences"
              icon={FaBell}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => console.log("Go to settings")}
          />
          <ProfileIconCard
              label="Help and Support"
              icon={FaPhone}
              // iconBg="#EDF2F7"
              // iconColor="#4A5568"
              onClick={() => console.log("Go to settings")}
          />
          <ProfileIconCard
              label="Logout"
              icon={MdLogout}
              iconBg="#FFF5F5"
              iconColor="#E53E3E"
              onClick={() => console.log("Logout")}
          />
        </VStack>           
    </Box>
       
  );
};

export default Account;
