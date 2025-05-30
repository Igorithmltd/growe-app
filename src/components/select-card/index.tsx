import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "../modal";
import { useModal } from "@/src/contexts/ModalContext";

interface SelectCardProps<T> {
  option: T;
  isSelected: boolean;
  onSelect: (option: T) => void;
  render: (option: T, isSelected: boolean) => ReactNode;
}

function SelectCard<T>({ option, isSelected, onSelect, render }: SelectCardProps<T>) {
  return (
    <Box
      p={4}
      w="100%"
      borderRadius="lg"
      bg={"white"}
      cursor="pointer"
      onClick={() => onSelect(option)}
      _hover={{ borderColor: "primary" }}
    >
      {render(option, isSelected)}
    </Box>
  );
}

interface SelectOptionModalProps<T> {
  options: T[];
  render: (option: T, isSelected: boolean) => React.ReactNode;
  onSelect: (option: T) => void;
  getKey: (option: T) => string | number;
  defaultSelected?: T;
}

export function SelectOptionModal<T>({
  options,
  render,
  onSelect,
  getKey,
  defaultSelected,
}: SelectOptionModalProps<T>) {
  const { isSelectOpen, setIsSelectOpen } = useModal();

  const [selected, setSelected] = useState<T | undefined>(defaultSelected);

  const handleSelect = (option: T) => {
    setSelected(option);
    onSelect(option);
    setIsSelectOpen(false);
  };

  return (
    <Modal isOpen={isSelectOpen} onClose={() => setIsSelectOpen(false)} bg="#FDFDFD" hasCloseButton>
      <VStack spaceY={4} py={5}>
        {options.map((option) => {
          const key = getKey(option);
          return (
            <SelectCard<T>
              key={key}
              option={option}
              isSelected={selected ? getKey(selected) === key : false}
              onSelect={handleSelect}
              render={render}
            />
          );
        })}
      </VStack>
    </Modal>
  );
}
