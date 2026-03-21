"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { DesktopSidebar, MobileNavbar } from "@/src/components/layouts/dashboard";
import { RouteGuard } from "@/src/guard/auth";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop] = useMediaQuery(["(min-width: 62em)"]);

  const pathname = usePathname();

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
          <Box height="100vh" display="flex" px={2} flexDirection="column" bg="#FDFDFD" pt={2}>
            <Box flex={1} overflowY={pathname.startsWith("/chat/") ? "hidden" : "auto"} pb="80px">
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
