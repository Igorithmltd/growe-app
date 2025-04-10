import AuthCarousel from "@/src/layouts/onboarding/auth/carousel";
import { Box, Spacer, Stack } from "@chakra-ui/react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "center" }}>
      <AuthCarousel />
      <Spacer />
      <Box w={{ lg: "45%" }} px={{ lg: 10 }}>
        {children}
      </Box>
    </Stack>
  );
}
