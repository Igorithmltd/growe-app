import { AppStore, PlayStore, Rocket } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Box, Flex, HStack, Icon, Image, Spacer, Stack, Text, VStack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      id="home"
      textAlign="center"
      maxW="full"
      mx="auto"
      px={{ base: 5, lg: "unset" }}
      py="10px"
      mt={{ base: "50px", lg: "85px" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        spaceY={5}
        align="center"
        py={4}
        pl={{ lg: 28 }}
      >
        <VStack align={{ base: "center", lg: "start" }} spaceY={5} flex={1}>
          <Flex bg="#F8FBEB" px={5} py={3} borderRadius="full" gap={2} align="center">
            <Rocket />
            <StyledText smVariant="p12-regular" mdVariant="p14-regular" variant="p18-regular">
              50,000+ Active Savers & Investors on Growe
            </StyledText>
          </Flex>

          <StyledText
            fontSize={{ base: "28px", md: "40px", lg: "64px" }}
            fontWeight="semibold"
            color="secondary"
            textAlign="start"
            lineHeight={1.1}
          >
            <Text as="span" color="primary">
              Save
            </Text>
            , Invest, and Grow Your Wealth{" "}
            <Text as="span" color="primary">
              Smarter!
            </Text>
          </StyledText>

          <StyledText
            smVariant="p12-regular"
            mdVariant="p14-regular"
            variant="p18-regular"
            textAlign="left"
          >
            Take control of your finances with smart savings, high-yield investments, and secure
            group savings designed to help you grow wealth effortlessly.
          </StyledText>

          <HStack spaceX={{ base: 3, lg: 3 }} justify="center">
            <StyledButton
              type="button"
              display="flex"
              alignItems="center"
              px={{ base: 3, md: "20px" }}
            >
              <Icon>
                <AppStore />
              </Icon>
              Get on Iphone
            </StyledButton>
            <StyledButton
              bg="#F4F4F4"
              color="secondary"
              type="button"
              display="flex"
              alignItems="center"
              px={{ base: 3, md: "20px" }}
            >
              <Icon>
                <PlayStore />
              </Icon>
              Get on Android
            </StyledButton>
          </HStack>
        </VStack>

        <Spacer flex={0.2} />

        <Box
          flex={1}
          flexShrink={0}
          bgGradient="linear-gradient(180deg, #EDF5CE 0%, #9BAB89 100%)"
          h="full"
          w="full"
          borderRadius={{ base: "10px", lg: "unset" }}
          borderLeftRadius={{ lg: "20px" }}
        >
          <Image src="/images/hero-image.webp" />
        </Box>
      </Stack>
    </Box>
  );
};

export default Hero;
