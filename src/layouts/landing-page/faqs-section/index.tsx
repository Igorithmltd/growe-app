import { Box, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { StyledButton, StyledText } from "@/src/components";
import FAQs from "./faq";

const FAQSection = () => {
  return (
    <Box id="faqs" textAlign="center" maxW={{ md: "95%", lg: "90%" }} mx="auto" px={5} py="50px">
      <Box width={{ md: "40%" }} mx="auto">
        <StyledText
          fontSize={{ base: "12px", md: "18px" }}
          fontWeight="normal"
          color="#A9AD9B"
          my={6}
        >
          FAQs
        </StyledText>
        <StyledText fontSize={{ base: "21px", md: "35px" }} fontWeight="medium" color="secondary">
          Got Questions? We’ve Got{" "}
          <Text as="span" color="primary">
            Answers!
          </Text>
        </StyledText>
      </Box>

      <Stack direction={{ base: "column", lg: "row" }} spaceY={5} align="start" py={24}>
        <VStack
          spaceY={8}
          align="start"
          w={{ base: "unset", lg: "30%" }}
          textAlign="start"
          mt={{ lg: 5 }}
        >
          <StyledText fontWeight="medium" fontSize={{ base: "14px", lg: "24px" }} color="secondary">
            Ask your question{" "}
          </StyledText>
          <StyledText smVariant="p12-regular" mdVariant="p14-regular" variant="p16-regular" mb={4}>
            If the question is not available on our FAQ section, Feel free to contact us personally,
            we will resolve your respective doubts.
          </StyledText>
          <StyledButton type="button" size="md" bgColor="border" color="secondary">
            Ask Question
          </StyledButton>
        </VStack>

        <Spacer flex={0.5} />

        <FAQs />
      </Stack>
    </Box>
  );
};

export default FAQSection;
