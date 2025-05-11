import { Progress } from "@chakra-ui/react";

interface StyledProgressProps {
  value: number;
  label?: string;
  showValueText?: boolean;
  colorScheme?: string;
}

export const StyledProgress = ({
  value,
  label,
  showValueText = true,
  colorScheme = "blue",
}: StyledProgressProps) => {
  return (
    <Progress.Root value={value} max={100}>
      <Progress.Track>
        <Progress.Range style={{ backgroundColor: `var(--chakra-colors-${colorScheme}-500)` }} />
      </Progress.Track>
      {label && <Progress.Label>{label}</Progress.Label>}
      {showValueText && <Progress.ValueText />}
    </Progress.Root>
  );
};
