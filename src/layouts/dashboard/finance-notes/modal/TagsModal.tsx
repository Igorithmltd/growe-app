import { Modal, StyledButton, StyledText, SelectButtonGroup } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { VStack } from "@chakra-ui/react";

interface TagsModalProps {
  value: string;
  onChange: (val: string) => void;
}

const TagsModal = ({ value, onChange }: TagsModalProps) => {
  const { isTagsOpen, setIsTagsOpen } = useModal();

  const tags = [
    "Savings",
    "Group Savings",
    "Investment",
    "Salary",
    "Home Deposit",
    "Agriculture",
    "Expenses",
    "Income",
    "Goal",
  ];

  return (
    <Modal isOpen={isTagsOpen} onClose={() => setIsTagsOpen(false)} maxWidth={{ md: "395px" }}>
      <VStack align="stretch" spaceY={6}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Add Tags to Organize Your Note
        </StyledText>

        <SelectButtonGroup
          width="1fr"
          columns={3}
          options={tags}
          value={value}
          onChange={onChange}
        />

        <StyledButton type="button" onClick={() => setIsTagsOpen(false)} disabled={!value}>
          Done
        </StyledButton>
      </VStack>
    </Modal>
  );
};

export default TagsModal;
