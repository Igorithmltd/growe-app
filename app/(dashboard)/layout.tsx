"use client";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box h="100vh" bg="#f5f5f5" flexDirection="column" position="relative">
      {/* Mobile Header - only shown on mobile */}
      {!isDesktop && (
        <Flex
          p={4}
          bg="white"
          align="center"
          justify="space-between"
          borderBottom="1px solid #e2e8f0"
        >
          <Box>
            <Box fontWeight="bold">Hello, John</Box>
            <Box fontSize="sm" color="gray.500">
              Welcome back
            </Box>
          </Box>
          {/* Placeholder for avatar */}
          <Box w="40px" h="40px" bg="gray.300" borderRadius="full" />
        </Flex>
      )}

      {/* Main Content Area */}
      <Box flex={1} overflowY="auto" pb={!isDesktop ? "80px" : 0}>
        {children}
      </Box>

      {!isDesktop && (
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
          <Box textAlign="center">
            <Box>🏠</Box>
            <Box fontSize="xs">Home</Box>
          </Box>
          <Box textAlign="center">
            <Box>💰</Box>
            <Box fontSize="xs">Savings</Box>
          </Box>
          <Box textAlign="center">
            <Box>💬</Box>
            <Box fontSize="xs">Messages</Box>
          </Box>
          <Box textAlign="center">
            <Box>👤</Box>
            <Box fontSize="xs">Me</Box>
          </Box>
        </Flex>
      )}

      {/* Desktop Sidebar - only shown on desktop */}
      {isDesktop && (
        <Flex
          position="fixed"
          left={0}
          top={0}
          bottom={0}
          w="250px"
          bg="white"
          borderRight="1px solid #e2e8f0"
          flexDirection="column"
        >
          {/* Sidebar header */}
          <Box p={4} borderBottom="1px solid #e2e8f0">
            <Box fontWeight="bold">Hello, John</Box>
            <Box fontSize="sm" color="gray.500">
              Welcome back
            </Box>
          </Box>
        </Flex>
      )}

      {/* Desktop Main Content - offset for sidebar */}
      {isDesktop && (
        <Box ml="250px" flex={1} p={6} bg="red">
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Layout;
