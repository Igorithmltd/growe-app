import { Box, Image, VStack } from "@chakra-ui/react";
import logo from "@/public/images/logo.webp";
import { StyledButton, StyledText } from "@/src/components";
import { useRouter } from "next/navigation";

const FooterHeader = () => {
  const router = useRouter();

  const navigateGetStarted = () => {
    router.push("/get-started");
  };
  return (
    <VStack spaceY={8} align="start" w={{ base: "unset", lg: "30%" }}>
      <Box>
        <Image src={logo.src} alt="Grove logo" w="full" />
      </Box>
      <StyledText smVariant="p12-regular" mdVariant="p14-regular" variant="p16-regular" mb={4}>
        Start saving smarter, investing better, and growing wealth effortlessly with Growe.
      </StyledText>
      <StyledButton type="button" size="md" onClick={navigateGetStarted}>
        Get started
      </StyledButton>
    </VStack>
  );
};

export default FooterHeader;
