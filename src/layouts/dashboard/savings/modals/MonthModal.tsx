import { Modal, StyledButton, StyledText, SelectButtonGroup } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { VStack } from "@chakra-ui/react";

interface MonthModalProps {
  value: string;
  onChange: (val: string) => void;
}

const MonthModal = ({ value, onChange }: MonthModalProps) => {
  const { isMonthOpen, setIsMonthOpen } = useModal();

  const days = Array.from({ length: 28 }, (_, i) => (i + 1).toString()).concat("Last day");

  return (
    <Modal isOpen={isMonthOpen} onClose={() => setIsMonthOpen(false)} maxWidth={{ md: "395px" }}>
      <VStack align="stretch" spaceY={6}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Ready to start? Pick the day that works best for you!
        </StyledText>

        <StyledText
          fontSize={{ base: "am", md: "md", lg: "lg" }}
          fontWeight="normal"
          color="bfgrey"
        >
          Choose your preferred day
        </StyledText>

        <SelectButtonGroup
          isGrid
          isCircle
          width="1fr"
          columns={5}
          options={days}
          value={value}
          onChange={onChange}
        />

        <StyledButton type="button" onClick={() => setIsMonthOpen(false)} disabled={!value}>
          Done
        </StyledButton>
      </VStack>
    </Modal>
  );
};

export default MonthModal;
