import { Box, Spacer, Stack } from "@chakra-ui/react";
import { BackIcon } from "@/public/svgs";
import AuthCarousel from "@/src/layouts/auth/carousel";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "center" }}>
      <AuthCarousel />
      <Spacer />
      <Box w={{ lg: "45%" }} px={{ lg: 10 }}>
        <Box ml={6}>
          <BackIcon />
        </Box>
        {children}
      </Box>
    </Stack>
  );
}
