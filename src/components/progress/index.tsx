import { Progress } from "@chakra-ui/react";
import { StyledText } from "../text";

interface StyledProgressProps {
  value: number;
  label?: string;
  colorScheme?: string;
  max?: number;
}

export const StyledProgress = ({
  value,
  label,
  colorScheme = "primary",
  max = 100,
}: StyledProgressProps) => {
  return (
    <Progress.Root value={value} max={max} unstyled={true}>
      <Progress.Track borderRadius="20px" h="8px" bg="#f7f7f7">
        <Progress.Range borderRadius="20px" bg={colorScheme} h="full" />
      </Progress.Track>
      {label && (
        <StyledText
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="normal"
          color="bfgrey"
          mt={2}
        >
          {label}
        </StyledText>
      )}
    </Progress.Root>
  );
};
