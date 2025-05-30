"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { DesktopSidebar, MobileNavbar } from "@/src/components/layouts/dashboard";
// import { RouteGuard } from "@/src/guard/auth";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop] = useMediaQuery(["(min-width: 62em)"]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    // <RouteGuard>
    <>
      {isDesktop ? (
        <Box display="flex" height="100vh">
          <DesktopSidebar />
          <Box ml="250px" flex={1} p={6} bg="#FDFDFD" overflowY="auto">
            {children}
          </Box>
        </Box>
      ) : (
        <Box height="100vh" display="flex" flexDirection="column" bg="#FDFDFD" pt={5}>
          <Box flex={1} overflowY="auto" pb="80px" px={4}>
            {children}
          </Box>
          <MobileNavbar />
        </Box>
      )}
      </>
    // </RouteGuard>
  );
};

export default Layout;
