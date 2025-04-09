import { StyledText } from "@/src/components";
import { Box, Grid, Image } from "@chakra-ui/react";

const Item1 = () => {
  return (
    <Box>
      <Grid
        bg="primary"
        h={{ base: "50vh", lg: "75vh" }}
        w="full"
        position="relative"
        alignContent="end"
        textAlign="center"
        borderRadius={{ base: 0, lg: 6 }}
        borderBottomRadius={{ base: "30px", lg: 6 }}
      >
        <StyledText
          fontSize={{ base: "120px", lg: "170px" }}
          fontWeight="semibold"
          color="white"
          zIndex={1}
        >
          Growe
        </StyledText>

        <Box
          position="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          w="80%"
          maxW="container.md"
          zIndex={2}
        >
          <Image
            src="/images/onboarding/carousel-1.webp"
            alt="Grow your wealth"
            objectFit="contain"
            w="100%"
          />
        </Box>
      </Grid>

      <Box textAlign="center" mt={5} px={5}>
        <StyledText
          fontSize={{ base: "20px", lg: "30px" }}
          fontWeight="semibold"
          color="secondary"
          mb={3}
        >
          Smart Personal Savings
        </StyledText>
        <StyledText fontSize={{ base: "md", lg: "xl" }} fontWeight="semibold" color="#8F8F8F">
          Achieve your dreams faster with personalized savings that grow your money automatically.
        </StyledText>
      </Box>
    </Box>
  );
};

const Item2 = () => {
  return (
    <Box>
      <Grid
        bg="primary"
        h={{ base: "50vh", lg: "75vh" }}
        w="full"
        position="relative"
        alignContent="center"
        textAlign="center"
        borderRadius={{ base: 0, lg: 6 }}
        borderBottomRadius={{ base: "30px", lg: 6 }}
      >
        <StyledText
          fontSize={{ base: "120px", lg: "170px" }}
          fontWeight="semibold"
          zIndex={1}
          color="#C1C89A"
        >
          Growe
        </StyledText>

        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="80%"
          maxW="container.md"
          zIndex={2}
        >
          <Image
            src="/images/onboarding/carousel-2.webp"
            alt="Grow your wealth"
            objectFit="contain"
            w="100%"
          />
        </Box>
      </Grid>

      <Box textAlign="center" mt={5} px={5}>
        <StyledText
          fontSize={{ base: "20px", lg: "30px" }}
          fontWeight="semibold"
          color="secondary"
          mb={3}
        >
          Group Savings Made Easy
        </StyledText>
        <StyledText fontSize={{ base: "md", lg: "xl" }} fontWeight="semibold" color="#8F8F8F">
          Save together with friends and family. Create or join savings groups and choose how you
          want to receive your funds.{" "}
        </StyledText>
      </Box>
    </Box>
  );
};

const Item3 = () => {
  return (
    <Box>
      <Grid
        bg="primary"
        h={{ base: "50vh", lg: "75vh" }}
        w="full"
        position="relative"
        alignContent="center"
        textAlign="center"
        borderRadius={{ base: 0, lg: 6 }}
        borderBottomRadius={{ base: "30px", lg: 6 }}
      >
        <StyledText
          fontSize={{ base: "120px", lg: "170px" }}
          fontWeight="semibold"
          zIndex={1}
          color="#C1C89A"
        >
          Growe
        </StyledText>

        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="80%"
          maxW="container.md"
          zIndex={2}
        >
          <Image
            src="/images/onboarding/carousel-3.webp"
            alt="Grow your wealth"
            objectFit="contain"
            w="100%"
          />
        </Box>
      </Grid>

      <Box textAlign="center" mt={5} px={5}>
        <StyledText
          fontSize={{ base: "20px", lg: "30px" }}
          fontWeight="semibold"
          color="secondary"
          mb={3}
        >
          Smart Investments
        </StyledText>
        <StyledText fontSize={{ base: "md", lg: "xl" }} fontWeight="semibold" color="#8F8F8F">
          Access curated investment opportunities based on your risk preference. Track performance
          and grow your wealth.
        </StyledText>
      </Box>
    </Box>
  );
};

export const slides = [Item1, Item2, Item3];
