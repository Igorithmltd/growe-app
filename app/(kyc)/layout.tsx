"use client";

import { Box, Spacer, Stack } from "@chakra-ui/react";
import { BackIcon } from "@/public/svgs";
import { useRouter } from "next/navigation";
import KycCarousel from "@/src/layouts/kyc/carousel";

export default function KycLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <Stack direction={{ base: "column", lg: "row" }}>
      <KycCarousel />
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
