import { StyledButton } from "@/src/components";
import { VStack } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growe | Get Started",
};

const OnboardingPage = () => {
  return (
    <VStack mt={{ base: 14, lg: "unset" }} spaceY={4} align="stretch" px={8}>
      <StyledButton type="button" py={8}>
        Get Started
      </StyledButton>
      <StyledButton type="button" color="primary" bgColor="#E1E5D4" py={8}>
        Login
      </StyledButton>
    </VStack>
  );
};

export default OnboardingPage;
