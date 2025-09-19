"use client";

import { Field, Select, createListCollection } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { StyledText } from "@/src/components";

export interface StyledSelectProps extends Field.RootProps {
  label?: string;
  placeholder?: string;
  fieldProps?: UseFormRegisterReturn;
  error?: string;
  bgColor?: string;
  borderRadius?: string;
  labelColor?: string;
  labelWeight?: string;
  disabled?: boolean;
  options: { label: string; value: string | number }[];
}

export const StyledSelect = ({
  label,
  placeholder,
  fieldProps,
  error,
  bgColor = "white",
  borderRadius = "10px",
  labelColor = "grey",
  labelWeight,
  disabled = false,
  options,
  ...props
}: StyledSelectProps) => {
  const collection = createListCollection<{ label: string; value: string }>({
    items: options.map((opt) => ({
      value: String(opt.value),
      label: opt.label,
    })),
  });

  return (
    <Field.Root invalid={!!error} disabled={disabled} spaceY={1}>
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
        collection={collection}
        {...props}
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
