/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

//
import { StyledField, StyledFieldProps } from "../input";

interface AmountInputProps extends StyledFieldProps {
  field?: any;
  error?: string;
}

export const AmountInput = ({
  placeholder,
  field,
  fieldProps: _,
  error,
  ...props
}: AmountInputProps) => {
  return (
    <StyledField
      type="number"
      placeholder={placeholder}
      bgColor="white"
      error={error}
      fieldProps={field}
      {...props}
    />
  );
};
