import { StarIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { Avatar, Box, HStack, Spacer, VStack } from "@chakra-ui/react";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  image: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <VStack
      p={8}
      align="start"
      spaceY={6}
      bg="white"
      border="1px solid"
      borderColor="#F8F8F8"
      borderRadius={"15px"}
    >
      <Box>
        <StyledText
          smVariant="p12-regular"
          mdVariant="p14-regular"
          variant="p16-regular"
          mb={4}
          textAlign="start"
        >
          "{testimonial.feedback}"
        </StyledText>
      </Box>

      <Spacer />

      <HStack align="center">
        <Avatar.Root boxSize={{ base: "57px", lg: "70px" }}>
          <Avatar.Fallback name={testimonial.name} />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
        <VStack align="start">
          <StyledText
            smVariant="p14-medium"
            mdVariant="p16-medium"
            variant="p20-medium"
            color="secondary"
          >
            {testimonial.name}, {testimonial.role}
          </StyledText>

          <HStack justify="center">
            {[...Array(5)].map((_, i) => (
              <Box boxSize={{ base: "16px", lg: "20px" }} key={i}>
                <StarIcon />
              </Box>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default TestimonialCard;
