import { TargetMark } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";
import { Box, HStack, VStack } from "@chakra-ui/react";

const data = [
  { label: "Target Amount", value: "₦800,000" },
  { label: "Frequent Amount", value: "₦800,000" },
  { label: "Interest Rate", value: "10% p.a" },
  { label: "Maturity Date", value: "Apr 15, 2025" },
  { label: "Automation", value: "Every Sunday" },
  { label: "Estimated Future Amount", value: "₦808,000" },
];

const SummaryLayout = () => {
  const { setIsInfoOpen } = useModal();

  return (
    <Box>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        Summary
      </StyledText>

      <VStack align="stretch" spaceY="2" mt={12}>
        {data.map(({ label, value }, index) => (
          <HStack justify="space-between" key={label}>
            <StyledText
              mt={6}
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="normal"
              color="bfgrey"
            >
              {label}
            </StyledText>

            <StyledText
              mt={6}
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="normal"
              color={index === data.length - 1 ? "primary" : "secondary"}
            >
              {value}
            </StyledText>
          </HStack>
        ))}
      </VStack>
      <StyledButton type="button" w="full" mt={14} onClick={() => setIsInfoOpen(true)}>
        Next
      </StyledButton>

      <InfoModal
        message="Congratulations! 🎉 Your Goal is Set and Funded!"
        hasButton={true}
        buttonText={"Go back to Quick Save"}
        icon={<TargetMark />}
      />
    </Box>
  );
};

export default SummaryLayout;
