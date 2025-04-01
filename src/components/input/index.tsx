"use client";

import { Field, Input, Textarea } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { StyledText } from "@/src/components";

interface StyledFieldProps extends Field.RootProps {
  label?: string;
  placeholder: string;
  type?: string;
  fieldProps: UseFormRegisterReturn;
  error?: string;
  isTextarea?: boolean;
  bgColor?: string;
  borderRadius?: string;
  labelColor?: string;
  labelWeight?: string;
  disabled?: boolean;
}

export const StyledField = ({
  label,
  placeholder,
  type = "text",
  fieldProps,
  error,
  isTextarea = false,
  bgColor = "white",
  borderRadius = "radius",
  labelColor = "grey",
  labelWeight,
  disabled = false,
  ...props
}: StyledFieldProps) => {
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

      {isTextarea ? (
        <Textarea
          placeholder={placeholder}
          {...fieldProps}
          bg={bgColor}
          borderColor="grey"
          size="lg"
          borderRadius={borderRadius}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          {...fieldProps}
          bg={bgColor}
          borderColor="grey"
          size="lg"
          borderRadius={borderRadius}
          {...props}
        />
      )}
      <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500">
        {error}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default StyledField;
