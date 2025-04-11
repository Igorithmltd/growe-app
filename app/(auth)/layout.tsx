"use client";

import { Box, Spacer, Stack } from "@chakra-ui/react";
import { BackIcon } from "@/public/svgs";
import AuthCarousel from "@/src/layouts/auth/carousel";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <Stack direction={{ base: "column", lg: "row" }}>
      <AuthCarousel />
      <Spacer />
      <Box w={{ lg: "45%" }} px={{ lg: 10 }} py={{ lg: 6 }}>
        <Box ml={6} mt={{ base: 6, lg: "unset" }} cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>
        {children}
      </Box>
    </Stack>
  );
}
