import { StyledButton } from "@/src/components";
import { VStack } from "@chakra-ui/react";

const OnboardingPage = () => {
  return (
    <VStack mt={{ base: 16, lg: "unset" }} spaceY={6} align="stretch" px={6}>
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
