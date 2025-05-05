"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StyledText } from "../../text";
import { ChatIcon, HomeIcon, InvestIcon, ProfileIcon, SavingsIcon } from "@/public/svgs";

const navItems = [
  { label: "Home", icon: HomeIcon, href: "/home" },
  { label: "Savings", icon: SavingsIcon, href: "/savings" },
  { label: "Invest", icon: InvestIcon, href: "/invest" },
  { label: "Chat", icon: ChatIcon, href: "/chat" },
  { label: "Me", icon: ProfileIcon, href: "/me" },
];

export const MobileHeader = () => {
  return (
    <Flex p={4} bg="white" align="center" justify="space-between" borderBottom="1px solid #e2e8f0">
      <Box>
        <Box fontWeight="bold">Hello, John</Box>
        <Box fontSize="sm" color="gray.500">
          Welcome back
        </Box>
      </Box>
      {/* Placeholder for avatar */}
      <Box w="40px" h="40px" bg="gray.300" borderRadius="full" />
    </Flex>
  );
};

export const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <Flex
      bg="white"
      p={3}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      justify="space-around"
      borderTop="1px solid #e2e8f0"
      zIndex="docked"
    >
      {navItems.map(({ label, icon: Icon, href }) => {
        const isActive = pathname === href;

        return (
          <Link key={label} href={href}>
            <VStack textAlign="center" color={isActive ? "primary" : "#BFBFBF"} cursor="pointer">
              <Icon size={20} />
              <StyledText fontSize="sm" fontWeight="normal" color="inherit">
                {label}
              </StyledText>
            </VStack>
          </Link>
        );
      })}
    </Flex>
  );
};

export const DesktopSidebar = () => {
  const pathname = usePathname();

  return (
    <Flex
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      w="250px"
      bg="white"
      borderRight="1px solid #e2e8f0"
      flexDirection="column"
      justifyContent="space-between"
      py={6}
    >
      <Box>
        {/* Sidebar header */}
        <Box px={6} mb={8}>
          <Box fontWeight="bold">Hello, John</Box>
          <Box fontSize="sm" color="gray.500">
            Welcome back
          </Box>
        </Box>

        {/* Navigation */}
        <VStack align="start" spaceY={6} px={6}>
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;

            return (
              <Link key={label} href={href} passHref>
                <Flex
                  align="center"
                  gap={3}
                  color={isActive ? "primary" : "#BFBFBF"}
                  fontWeight={isActive ? "bold" : "normal"}
                  cursor="pointer"
                >
                  <Icon size={20} />
                  <StyledText fontSize="sm" color="inherit">
                    {label}
                  </StyledText>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Box>

      {/* Avatar placeholder at the bottom (optional) */}
      <Box px={6} mt={10}>
        <Box w="40px" h="40px" bg="gray.300" borderRadius="full" />
      </Box>
    </Flex>
  );
};
