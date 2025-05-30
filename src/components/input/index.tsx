"use client";

import { Field, Input, InputGroup, Textarea } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { StyledText } from "@/src/components";
import { ReactNode } from "react";

export interface StyledFieldProps extends Field.RootProps {
  label?: string;
  placeholder: string;
  type?: string;
  fieldProps?: UseFormRegisterReturn;
  error?: string;
  isTextarea?: boolean;
  bgColor?: string;
  borderRadius?: string;
  labelColor?: string;
  labelWeight?: string;
  disabled?: boolean;
  icon?: ReactNode;
  currency?: ReactNode;
}

export const StyledField = ({
  label,
  placeholder,
  type = "text",
  fieldProps,
  error,
  isTextarea = false,
  bgColor = "white",
  borderRadius = "10px",
  labelColor = "grey",
  labelWeight,
  disabled = false,
  icon,
  currency,
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
          h="100px"
          fontSize="14px"
          borderRadius={borderRadius}
          border="2px solid #9BAB69"
          _focus={{
            outlineWidth: "2px",
            border: "none",
          }}
        />
      ) : (
        <InputGroup startElement={currency} endElement={icon}>
          <Input
            type={type}
            placeholder={placeholder}
            {...fieldProps}
            bg={bgColor}
            borderColor="grey"
            size="lg"
            fontSize="14px"
            borderRadius={borderRadius}
            {...props}
          />
        </InputGroup>
      )}
      <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500">
        {error}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default StyledField;
