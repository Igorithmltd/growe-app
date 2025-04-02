import { StyledText } from "@/src/components";
import { Button, ButtonGroup, Stack, Steps } from "@chakra-ui/react";

const steps = [
  {
    title: "Sign Up & Create an Account",
    description: "Register in minutes and set up your profile.",
  },
  {
    title: "Set individual or group savings goals.",
    description: "Create or join a group savings to start saving.",
  },
  {
    title: "Choose investment plans or create financial notes.",
    description: "Pick investment plans or track finances with notes.",
  },
  {
    title: "Track progress and earn rewards through referrals.",
    description: "Monitor progress and earn rewards via referrals.",
  },
];

const Stepper = () => {
  return (
    <Steps.Root orientation="vertical" height="350px" count={steps.length} flex={{ lg: 1.6 }}>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title} mt={0}>
            <Steps.Indicator
              color="white"
              bg="transparent"
              borderColor="white"
              boxSize={{ base: "40px", lg: "50px" }}
              fontSize={{ base: "18px", lg: "25px" }}
            />
            <Steps.Title textAlign="start">
              <StyledText
                fontSize={{ base: "14px", md: "22px" }}
                fontWeight="normal"
                color="white"
                mb={4}
              >
                {step.title}
              </StyledText>
              <StyledText fontSize={{ base: "12px", md: "18px" }} fontWeight="normal" color="white">
                {step.description}
              </StyledText>
            </Steps.Title>
            <Steps.Separator alignSelf="center" ml={{ base: 2, lg: 3 }} mt={{ lg: 4 }} />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  );
};

export default Stepper;
