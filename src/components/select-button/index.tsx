// components/SelectButtonGroup.tsx

import { HStack, SimpleGrid, Button } from "@chakra-ui/react";

interface SelectButtonGroupProps {
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
  columns?: number;
  isGrid?: boolean;
}

export const SelectButtonGroup = ({
  options,
  value,
  onChange,
  columns = 2,
  isGrid = false,
}: SelectButtonGroupProps) => {
  const Wrapper = isGrid ? SimpleGrid : HStack;
  const wrapperProps = isGrid ? { columns, spacing: 3 } : { spacing: 4 };

  return (
    <Wrapper {...wrapperProps}>
      {options.map((option) => (
        <Button
          key={option}
          px={5}
          py={2}
          bg={value === option ? "primary" : "border"}
          color={value === option ? "white" : "bfgrey"}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </Wrapper>
  );
};

