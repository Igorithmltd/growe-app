import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "../modal";

interface SelectCardProps<T> {
  option: T;
  isSelected: boolean;
  onSelect: (option: T) => void;
  render: (option: T, isSelected: boolean) => ReactNode;
}

export function SelectCard<T>({ option, isSelected, onSelect, render }: SelectCardProps<T>) {
  return (
    <Box
      p={4}
      w="100%"
      border="1px solid"
      borderColor={isSelected ? "primary" : "gray.200"}
      borderRadius="lg"
      bg={isSelected ? "primary.50" : "white"}
      cursor="pointer"
      onClick={() => onSelect(option)}
      _hover={{ borderColor: "primary" }}
    >
      {render(option, isSelected)}
    </Box>
  );
}

interface SelectOptionModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  options: T[];
  render: (option: T, isSelected: boolean) => React.ReactNode;
  onSelect: (option: T) => void;
  getKey: (option: T) => string | number;
  defaultSelected?: T;
}

export function SelectOptionModal<T>({
  isOpen,
  onClose,
  options,
  render,
  onSelect,
  getKey,
  defaultSelected,
}: SelectOptionModalProps<T>) {
  const [selected, setSelected] = useState<T | undefined>(defaultSelected);

  const handleSelect = (option: T) => {
    setSelected(option);
    onSelect(option);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} hasCloseButton>
      <VStack spaceY={4}>
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
