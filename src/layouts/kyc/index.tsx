import { StyledText } from "@/src/components";
import { Box, VStack } from "@chakra-ui/react";

const KycPage = () => {
  return (
    <VStack spaceY={6} align="stretch">
      <Box>
        <StyledText
          fontSize={{ base: "16px", md: "21px", lg: "24px" }}
          color="secondary"
          fontWeight="semibold"
        >
          Identity Verification
        </StyledText>
        <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
          To protect your account and comply with regulations, we need to verify your identity
        </StyledText>
      </Box>
    </VStack>
  );
};

export default KycPage;
