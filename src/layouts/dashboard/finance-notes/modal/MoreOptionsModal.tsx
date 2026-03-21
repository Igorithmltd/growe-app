"use client";

import { Modal } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface MoreOptionsModalProps {
  onEdit: () => void;
  onDelete: () => void;
}

const MoreOptionsModal = ({ onEdit, onDelete }: MoreOptionsModalProps) => {
  const { isMoreOpen, setIsMoreOpen } = useModal();

  const handleClose = () => setIsMoreOpen(false);

  return (
    <Modal isOpen={isMoreOpen} onClose={handleClose} maxWidth={{ base: "100%", md: "395px" }}>
      <VStack align="stretch" spaceY={4}>
        <HStack
          p={4}
          borderRadius="12px"
          bg="#F5F5F5"
          cursor="pointer"
          _hover={{ bg: "#EDEDED" }}
          onClick={() => {
            onEdit();
            handleClose();
          }}
        >
          <FiEdit2 size={20} />
          <Text fontSize="16px">Edit Note</Text>
        </HStack>

        <HStack
          p={4}
          borderRadius="12px"
          bg="#F5F5F5"
          cursor="pointer"
          _hover={{ bg: "#EDEDED" }}
          onClick={() => {
            onDelete();
            handleClose();
          }}
        >
          <FiTrash2 size={20} />
          <Text fontSize="16px">Delete note</Text>
        </HStack>
      </VStack>
    </Modal>
  );
};

export default MoreOptionsModal;
