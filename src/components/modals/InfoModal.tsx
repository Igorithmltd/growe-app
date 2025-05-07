import { Modal } from "../modal";
import { StyledText } from "../text";
import { StyledButton } from "../button";
import { useModal } from "@/src/contexts/ModalContext";
import { Flex, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InfoModalProps {
  title: string;
  message: string;
  hasButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
  icon?: ReactNode;
}

const InfoModal = ({
  title,
  message,
  hasButton = false,
  buttonText,
  onButtonClick,
  isLoading = false,
  icon,
}: InfoModalProps) => {
  const { isInfoOpen, setIsInfoOpen } = useModal();

  return (
    <Modal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} maxWidth={{ md: "395px" }}>
      <VStack align="stretch" spaceY={6}>
        {icon && <Flex justify="center">{icon}</Flex>}
        <StyledText
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
          textAlign="center"
        >
          {title}
        </StyledText>
        <StyledText fontSize={{ base: "md", md: "xl" }} color="grey" textAlign="center">
          {message}
        </StyledText>
        {hasButton && (
          <StyledButton type="button" onClick={onButtonClick} loading={isLoading}>
            {buttonText}
          </StyledButton>
        )}
      </VStack>
    </Modal>
  );
};

export default InfoModal;
