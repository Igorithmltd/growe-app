import OnboardingCarousel from "@/src/layouts/onboarding/carousel";
import { Box, Spacer, Stack } from "@chakra-ui/react";

export default function OnboardingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "center" }}>
      <OnboardingCarousel />
      <Spacer />
      <Box w={{ lg: "45%" }} px={{ lg: 10 }}>
        {children}
      </Box>
    </Stack>
  );
}
