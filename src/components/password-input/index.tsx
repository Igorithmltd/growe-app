/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
//
import { StyledField, StyledFieldProps } from "../input";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface PasswordInputProps extends StyledFieldProps {
  field?: any;
  error?: string;
}

export const PasswordInput = ({
  placeholder,
  field,
  fieldProps: _,
  error,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledField
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      bgColor="white"
      error={error}
      fieldProps={field}
      icon={
        <IconButton
          h="full"
          w="full"
          bg="transparent"
          color="inherit"
          aria-label="Toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
          _hover={{
            bg: "transparent",
          }}
        >
          {showPassword ? (
            <MdOutlineVisibilityOff   />
          ) : (
            <MdOutlineVisibility   />
          )}
        </IconButton>
      }
      {...props}
    />
  );
};
