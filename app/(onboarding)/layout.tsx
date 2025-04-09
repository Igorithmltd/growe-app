import OnboardingCarousel from "@/src/layouts/onboarding/carousel";
import { Box, Spacer, Stack } from "@chakra-ui/react";

export default function OnboardingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Stack direction={{ base: "column", lg: "row" }} align="center">
      <OnboardingCarousel />
      <Spacer />
      <Box w="45%" px={10}>
        {children}
      </Box>
    </Stack>
  );
}
