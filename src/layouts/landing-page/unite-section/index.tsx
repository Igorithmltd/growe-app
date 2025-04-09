import { StyledButton, StyledText } from "@/src/components";
import { Box, Image, Spacer, Stack, VStack } from "@chakra-ui/react";
import image from "@/public/images/unite-image.webp";
import { useRouter } from "next/navigation";

const UniteSection = () => {
const router = useRouter();

  const navigateGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <Box maxW={{ md: "95%", lg: "90%" }} mx="auto" px={5} py="90px">
      <Stack direction={{ base: "column", lg: "row" }} align="center" spaceY="12">
        <Box maxWidth="450px">
          <Image src={image.src} alt="unite-image" w="full" />
        </Box>
        <Spacer />

        <VStack spaceY={8} align="start" w={{ base: "unset", lg: "40%" }}>
          <StyledText
            fontWeight="semibold"
            fontSize={{ base: "20px", lg: "30px" }}
            color="secondary"
          >
            Unite, Save, Succeed And Reach Your Dreams Faster Together!
          </StyledText>
          <StyledText smVariant="p12-regular" mdVariant="p14-regular" variant="p16-regular" mb={4}>
            Pool resources with friends or family, set shared goals, and achieve them faster through
            collaborative savings.{" "}
          </StyledText>
          <StyledButton type="button" size="md" onClick={navigateGetStarted}>
            Get started
          </StyledButton>
        </VStack>
      </Stack>
    </Box>
  );
};

export default UniteSection;
