import { Modal, StyledButton, StyledText, SelectButtonGroup } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { VStack } from "@chakra-ui/react";

interface WeekModalProps {
  value: string;
  onChange: (val: string) => void;
}

const WeekModal = ({ value, onChange }: WeekModalProps) => {
  const { isWeekOpen, setIsWeekOpen } = useModal();

  const days = [
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
    "Sundays",
  ];

  return (
    <Modal isOpen={isWeekOpen} onClose={() => setIsWeekOpen(false)} maxWidth={{ md: "395px" }}>
      <VStack align="stretch" spaceY={6}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Ready to start? Pick the day that works best for you!
        </StyledText>

        <StyledText
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          fontWeight="normal"
          color="bfgrey"
        >
          Choose your preferred day
        </StyledText>

        <SelectButtonGroup options={days} value={value} onChange={onChange} />

        <StyledButton type="button" onClick={() => setIsWeekOpen(false)} disabled={!value}>
          Done
        </StyledButton>
      </VStack>
    </Modal>
  );
};

export default WeekModal;
