import { StyledText } from "@/src/components";
import { Box, Grid, Text } from "@chakra-ui/react";
import TestimonialCard from "./card";

const testimonials = [
  {
    name: "Adanna",
    role: "Freelancer",
    feedback:
      "I never thought I could save for a vacation, but this app made it so easy! Setting goals and watching my savings grow with interest kept me motivated.",
    image: "/path/to/adanna.jpg",
  },
  {
    name: "Tunde",
    role: "Entrepreneur",
    feedback:
      "Saving with my friends for our startup fund was a game-changer. The group feature kept us all accountable, and we reached our goal faster.",
    image: "/path/to/tunde.jpg",
  },
  {
    name: "Chioma",
    role: "Teacher",
    feedback:
      "As a beginner investor, I was nervous, but the app's curated investment plans and real-time tracking made it so simple.",
    image: "/path/to/chioma.jpg",
  },
  {
    name: "Emeka",
    role: "Student",
    feedback:
      "I earned rewards just by inviting my friends! The referral program is amazing, and it’s great to see my loved ones saving.",
    image: "/path/to/emeka.jpg",
  },
  {
    name: "Funmi",
    role: "Entrepreneur",
    feedback:
      "The financial notes feature has been a lifesaver! I can now track my expenses, set budgets, and stay organized—all in one place.",
    image: "/path/to/funmi.jpg",
  },
  {
    name: "Ahmed",
    role: "Engineer",
    feedback:
      "I love how simple and intuitive this app is. It's perfect for anyone, whether you're a beginner or a pro!",
    image: "/path/to/ahmed.jpg",
  },
];

const Testimonials = () => {
  return (
    <Box bg="#FAF8FF" w="100vw">
      <Box
        id="testimonials"
        textAlign="center"
        maxW={{ md: "95%", lg: "90%" }}
        mx="auto"
        px={5}
        py="90px"
      >
        <Box width={{ md: "40%" }} mx="auto">
          <StyledText
            fontSize={{ base: "12px", md: "18px" }}
            fontWeight="normal"
            color="#A9AD9B"
            my={6}
          >
            Testimonials
          </StyledText>
          <StyledText fontSize={{ base: "21px", md: "35px" }} fontWeight="medium" color="secondary">
            Loved by Thousands of Smart Savers &{" "}
            <Text as="span" color="primary">
              Investors!
            </Text>
          </StyledText>
        </Box>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={8}
          mt={8}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Testimonials;
