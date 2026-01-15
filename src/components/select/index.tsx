/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Field, Select, createListCollection } from "@chakra-ui/react";
import { StyledText } from "@/src/components";

export interface StyledSelectProps {
  label?: string;
  placeholder?: string;
  error?: string;
  bgColor?: string;
  borderRadius?: string;
  labelColor?: string;
  labelWeight?: string;
  disabled?: boolean;
  options: { label: string; value: string | number }[];
  value?: string | number; // controlled value
  onChange?: (val: string) => void; // controlled onChange
  [key: string]: any; // allow forwarding other props
}

export const StyledSelect = ({
  label,
  placeholder,
  error,
  bgColor = "#F8F8F8",
  borderRadius = "10px",
  labelColor = "grey",
  labelWeight,
  disabled = false,
  options,
  value, // controlled value
  onChange, // controlled onChange
  ...props
}: StyledSelectProps) => {
  // Convert all values to string arrays for Chakra v3
  const collection = createListCollection<{ label: string; value: string[] }>({
    items: options.map((opt) => ({
      value: [String(opt.value)],
      label: opt.label,
    })),
  });

  // Wrap controlled value in array
  const selectedValue = value !== undefined ? [String(value)] : undefined;

  return (
    <Field.Root invalid={!!error} disabled={disabled} spaceY={1} {...props}>
      {label && (
        <Field.Label>
          <StyledText
            smVariant="p14-medium"
            mdVariant="p16-medium"
            variant="p16-medium"
            color={labelColor}
            fontWeight={labelWeight}
          >
            {label}
          </StyledText>
        </Field.Label>
      )}

      <Select.Root
        bg={bgColor}
        borderRadius={borderRadius}
        disabled={disabled}
        border="2px solid #9BAB69"
        _focus={{
          outlineWidth: "2px",
          border: "none",
        }}
        collection={collection}
        defaultValue={selectedValue}
        value={selectedValue}
        onValueChange={(details) => onChange?.(details.value[0])}
      >
        <Select.HiddenSelect />

        <Select.Control borderColor="grey" fontSize="14px" px="3" py="2">
          <Select.Trigger border="none">
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>

          <Select.IndicatorGroup>
            <Select.Indicator />
            <Select.ClearTrigger />
          </Select.IndicatorGroup>
        </Select.Control>

        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item, idx) => (
              <Select.Item key={idx} item={item}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>

      <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500">
        {error}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default StyledSelect;
