import { Box, Container, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";
import {
  PersonalSavings as PersonalSavingsIcon,
  GroupSavings as GroupSavingsIcon,
  Investments as InvestmentsIcon,
  FinancialNotes as FinancialNotesIcon,
} from "@/public/svgs";
import FeatureCard from "./card";
import { StyledText } from "@/src/components";

const features = [
  {
    title: "Personal Savings",
    description:
      "Set personal savings goals with flexible timelines and earn competitive interest rates to achieve your financial dreams.",
    image: "/images/personal-savings.webp",
    icon: <PersonalSavingsIcon />,
  },
  {
    title: "Group Savings",
    description:
      "Save collaboratively with friends or family, set group goals, and choose disbursement options for shared success.",
    image: "/images/group-saving.webp",
    icon: <GroupSavingsIcon />,
  },
  {
    title: "Investments",
    description:
      "Grow your wealth with curated investment plans, categorized by risk level, and track performance in real-time.",
    image: "/images/investment.webp",
    icon: <InvestmentsIcon />,
  },
  {
    title: "Financial Notes",
    description:
      "Organize and track your finances with integrated notes for expenses, income, and savings progress.",
    image: "/images//financial-notes.webp",
    icon: <FinancialNotesIcon />,
  },
];

const FeaturesSection = () => {
  return (
    <Box
      id="features"
      textAlign="center"
      mt={"150px"}
      maxW={{ md: "95%", lg: "90%" }}
      mx="auto"
      px={5}
      py={18}
    >
      <StyledText
        fontSize={{ base: "12px", md: "18px" }}
        fontWeight="normal"
        color="#A9AD9B"
        my={6}
      >
        Features
      </StyledText>
      <StyledText fontSize={{ base: "21px", md: "35px" }} fontWeight="medium" color="secondary">
        Why Choose{" "}
        <Text as="span" color="primary">
          Growe?
        </Text>
      </StyledText>
      <Container maxW="full">
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          maxWidth="container.lg"
          gap="38px"
          mt={8}
        >
          {features.map((feature, index) => (
            <FeatureCard feature={feature} key={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
