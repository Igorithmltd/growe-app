"use client";

import { DesktopSidebar, MobileNavbar } from "@/src/components/layouts/dashboard";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  if (isDesktop) {
    return (
      <Box display="flex" height="100vh">
        <DesktopSidebar />
        <Box ml="250px" flex={1} p={6} bg="#FDFDFD" overflowY="auto">
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" bg="#FDFDFD" pt={5}>
      {/* <MobileHeader /> */}
      <Box flex={1} overflowY="auto" pb="80px" px={4}>
        {children}
      </Box>
      <MobileNavbar />
    </Box>
  );
};

export default Layout;
