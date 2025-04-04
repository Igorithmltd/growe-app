import { AppStore, PlayStore } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Box, Flex, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";

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
        py={24}
        pl={{ lg: 28 }}
      >
        <VStack align="start" spaceY={5}>
          <Flex bg="#F8FBEB" px={5} py={3} borderRadius="full">
            <StyledText smVariant="p12-regular" mdVariant="p14-regular" variant="p18-regular">
              50,000+ Active Savers & Investors on Growe
            </StyledText>
          </Flex>

          <StyledText
            fontSize={{ base: "28px", md: "40px", lg: "64px" }}
            fontWeight="semibold"
            color="secondary"
            textAlign="start"
            lineHeight={1.2}
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

          <HStack spaceX={3}>
            <StyledButton type="button" display="flex" alignItems="center">
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
            >
              <Icon>
                <PlayStore />
              </Icon>
              Get on Android
            </StyledButton>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Hero;
