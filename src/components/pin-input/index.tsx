"use client";

import { Box, Field, Flex, PinInput, usePinInput } from "@chakra-ui/react";
import { StyledText } from "@/src/components";
import { UseFormRegisterReturn } from "react-hook-form";

export interface StyledPinInputProps {
  count: number;
  label?: string;
  error?: string;
  fieldProps?: UseFormRegisterReturn;
  bgColor?: string;
  borderRadius?: string;
  labelColor?: string;
  labelWeight?: string;
  disabled?: boolean;
  store?: ReturnType<typeof usePinInput>;
}

export const StyledPinInput = ({
  count,
  label,
  error,
  fieldProps,
  bgColor = "#F8F8F8",
  borderRadius = "4px",
  labelColor = "grey",
  labelWeight,
  disabled = false,
  store = usePinInput(),
  ...props
}: StyledPinInputProps) => {
  return (
    <Field.Root invalid={!!error} disabled={disabled} width="full">
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

      <PinInput.RootProvider value={store} w="full">
        <PinInput.Root {...props} invalid={!!error} {...fieldProps} w="full">
          <PinInput.HiddenInput />
          <PinInput.Control
            w="full"
            gap={{ base: 3, lg: 6 }}
            alignItems="center"
            flexDirection="column"
          >
            <Flex gap={{ base: 3, lg: 6 }}>
              {Array.from({ length: count }).map((_, index) => (
                <PinInput.Input
                  key={index}
                  index={index}
                  borderRadius={borderRadius}
                  bg={bgColor}
                  fontSize={{ base: "sm", md: "lg" }}
                  fontWeight={{ base: "medium", md: "normal" }}
                  width={{ base: "40px", md: "45px", lg: "50px" }}
                  height={{ base: "40px", md: "45px", lg: "50px" }}
                  border="2px solid #9BAB69"
                  _focus={{
                    outlineWidth: "2px",
                    border: "none",
                  }}
                  disabled={disabled}
                />
              ))}
            </Flex>
            <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500" mt={3}>
              {error}
            </Field.ErrorText>
          </PinInput.Control>
        </PinInput.Root>
      </PinInput.RootProvider>
    </Field.Root>
  );
};

export default StyledPinInput;
