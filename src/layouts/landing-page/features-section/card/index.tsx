import { StyledText } from "@/src/components";
import { Box, Grid, HStack, Image, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

interface Feature {
  title: string;
  description: string;
  image: string;
  icon: ReactElement;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <Box p={6} pb={0} borderRadius={5} bg="bluelight">
      <VStack spaceY={4} align="start">
        <HStack alignItems="center" gap={6}>
          <Grid
            boxSize={{ base: "46px", lg: "58px" }}
            placeItems="center"
            borderRadius={5}
            bg="#F8FBEB"
          >
            {feature.icon}
          </Grid>
          <Box>
            <StyledText
              smVariant="p14-medium"
              mdVariant="p16-medium"
              variant="p24-medium"
              color="secondary"
              alignSelf="start"
            >
              {feature.title}
            </StyledText>
          </Box>
        </HStack>

        <StyledText
          smVariant="p12-regular"
          mdVariant="p14-regular"
          variant="p16-regular"
          mb={4}
          textAlign="start"
        >
          {feature.description}
        </StyledText>
      </VStack>
      <Box mt={12} maxWidth={{ base: "184px", md: "305px" }} mx="auto">
        <Image src={feature.image} alt={feature.title} w="full" />
      </Box>
    </Box>
  );
};

export default FeatureCard;
