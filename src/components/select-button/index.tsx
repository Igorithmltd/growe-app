// components/SelectButtonGroup.tsx

import { HStack, SimpleGrid, Button, Box } from "@chakra-ui/react";
import { StyledText } from "../text";

interface SelectButtonGroupProps {
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
  columns?: number;
  isGrid?: boolean;
  label?: string;
  labelColor?: string;
  labelWeight?: string;
  error?: string;
  spacing?: number;
}

export const SelectButtonGroup = ({
  options,
  value,
  onChange,
  columns = 2,
  spacing = 4,
  isGrid = false,
  labelColor = "grey",
  labelWeight = "medium",
  label,
  error,
}: SelectButtonGroupProps) => {
  const Wrapper = isGrid ? SimpleGrid : HStack;
  const wrapperProps = isGrid ? { columns, gap: spacing } : { spaceX: spacing };

  return (
    <Box>
      {label && (
        <StyledText
          smVariant="p14-medium"
          mdVariant="p16-medium"
          variant="p16-medium"
          color={labelColor}
          fontWeight={labelWeight}
          mb={2}
        >
          {label}
        </StyledText>
      )}
      <Wrapper {...wrapperProps}>
        {options.map((option) => (
          <Button
            key={option}
            px={5}
            py={2}
            bg={value === option ? "primary" : "border"}
            color={value === option ? "white" : "bfgrey"}
            borderRadius="full"
            fontSize="14px"
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        ))}
      </Wrapper>
      <StyledText fontSize="12px" fontWeight="normal" color="red.500" mt={1}>
        {error}
      </StyledText>
    </Box>
  );
};
