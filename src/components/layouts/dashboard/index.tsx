"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StyledText } from "../../text";
import { ChatIcon, HomeIcon, InvestIcon, ProfileIcon, SavingsIcon } from "@/public/svgs";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { signOutUser } from "@/src/utils/helpers";
import { FaNoteSticky } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

const navItems = [
  { label: "Home", icon: HomeIcon, href: "/home" },
  { label: "Savings", icon: SavingsIcon, href: "/savings" },
  { label: "Investments", icon: InvestIcon, href: "/investments" },
  { label: "Chat", icon: ChatIcon, href: "/chat" },
  { label: "Finance Notes", icon: FaNoteSticky, href: "/finance-notes" },
  { label: "Me", icon: ProfileIcon, href: "/me" },
  { label: "Logout", icon: BiLogOut, action: () => signOutUser() },
];

export const MobileHeader = () => {
  const user = useUserDetailsStore((state) => state.user);

  return (
    <Flex p={4} bg="white" align="center" justify="space-between" borderBottom="1px solid #e2e8f0">
      <Box>
        <Box fontWeight="bold">Hello, {user?.firstName || "User"}</Box>
        <Box fontSize="sm" color="gray.500">
          Welcome back
        </Box>
      </Box>

      <Box w="40px" h="40px" bg="gray.300" borderRadius="full" />
    </Flex>
  );
};

export const MobileNavbar = () => {
  const pathname = usePathname();

  const mobileNavItems = navItems.filter(
    (item) => item.label !== "Finance Notes" && item.label !== "Logout",
  );

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
      {mobileNavItems.map(({ label, icon: Icon, href, action }) => {
        const isActive = href ? pathname.startsWith(href) : false;

        const content = (
          <VStack
            textAlign="center"
            color={isActive ? "primary" : "bfgrey"}
            fontSize="20px"
            cursor="pointer"
            onClick={action}
          >
            <Icon />
            <StyledText fontSize="sm" fontWeight="normal" color="inherit">
              {label}
            </StyledText>
          </VStack>
        );

        return href ? (
          <Link key={label} href={href}>
            {content}
          </Link>
        ) : (
          <Box key={label}>{content}</Box>
        );
      })}
    </Flex>
  );
};

export const DesktopSidebar = () => {
  const pathname = usePathname();
  const user = useUserDetailsStore((state) => state.user);

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
        <Box px={6} mb={8}>
          <Box fontWeight="bold">Hello, {user?.firstName || "User"}</Box>
          <Box fontSize="sm" color="gray.500">
            Welcome back
          </Box>
        </Box>

        <VStack align="start" spaceY={12} px={6}>
          {navItems.map(({ label, icon: Icon, href, action }) => {
            const isActive = href ? pathname.startsWith(href) : false;

            const content = (
              <Flex
                align="center"
                gap={4}
                color={isActive ? "primary" : "grey"}
                fontWeight={isActive ? "bold" : "normal"}
                cursor="pointer"
                _hover={{ color: "primary" }}
                fontSize="30px"
                onClick={action}
              >
                <Icon />
                <StyledText fontSize="xl" fontWeight="semibold" color="inherit">
                  {label}
                </StyledText>
              </Flex>
            );

            return href ? (
              <Link key={label} href={href}>
                {content}
              </Link>
            ) : (
              <Box key={label}>{content}</Box>
            );
          })}
        </VStack>
      </Box>

      <Box px={6} mt={10}>
        <Box w="40px" h="40px" bg="gray.300" borderRadius="full" />
      </Box>
    </Flex>
  );
};
