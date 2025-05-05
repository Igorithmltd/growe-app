"use client";

import { DesktopSidebar, MobileHeader, MobileNavbar } from "@/src/components/layouts/dashboard";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box h="100vh" bg="#f5f5f5" flexDirection="column" position="relative">
      {/* Mobile Header - only shown on mobile */}
      {!isDesktop && <MobileHeader />}

      {/* Main Content Area */}
      <Box flex={1} overflowY="auto" pb={!isDesktop ? "80px" : 0}>
        {children}
      </Box>

      {!isDesktop && <MobileNavbar />}

      {/* Desktop Sidebar - only shown on desktop */}
      {isDesktop && <DesktopSidebar />}

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
