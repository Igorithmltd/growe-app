import { StyledText } from "@/src/components";
import { Box, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import Stepper from "./stepper";

const HowItWorks = () => {
  return (
    <Box
      id="how-it-works"
      textAlign="center"
      mx="auto"
      px={5}
      py="60px"
      borderRadius="20px"
      bg="#8083FF"
      mt={12}
    >
      <Box width={{ md: "40%" }} mx="auto">
        <StyledText
          fontSize={{ base: "12px", md: "18px" }}
          fontWeight="normal"
          color="white"
          my={6}
        >
          How it works
        </StyledText>
        <StyledText fontSize={{ base: "21px", md: "35px" }} fontWeight="medium" color="white">
          Start Saving & Investing in 4 Easy{" "}
          <Text as="span" color="#FFC34E">
            Steps!
          </Text>
        </StyledText>
      </Box>

      <Stack
        direction={{ base: "column", lg: "row" }}
        spaceY={5}
        align="center"
        py={24}
        px={{ lg: 5 }}
      >
        <Box
          bg="linear-gradient(to bottom, #8083FF 0%, #000033 100%)"
          borderRadius="20px"
          pt={12}
          flex={{ lg: 1 }}
        >
          <Image src="/images/how-it-works.webp" alt="mockup" w="full" />
        </Box>

        <Spacer flex={{ lg: 0.5 }} />

        <Stepper />
      </Stack>
    </Box>
  );
};

export default HowItWorks;
