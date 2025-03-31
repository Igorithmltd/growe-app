// Core
import React, { ChangeEvent } from "react";
import { Input, InputProps, Textarea, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
//
import { StyledText } from "../text";

type InputPropsType = InputProps & {
  placeholder?: string;
  name: string;
  type: string;
  bgColor?: string;

  validate?: (value: string) => string | undefined;
  disabled?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  labelColor?: string;
  labelWeight?: string;
  isInput?: boolean;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  borderRadius?: string;
  max?: string;
};

export const StyledInput = ({
  name,
  bgColor = "grey3",
  placeholder = "Search",

  type,
  validate,
  disabled = false,
  value,
  onChange,
  label,
  labelColor,
  isInput = true,
  hasIcon = false,
  icon,
  max,
  ...props
}: InputPropsType) => {
  const commonStyles = {
    borderRadius: "4px",
    color: "grey_shade2",
    borderColor: "grey_tint3",
    focusBorderColor: "secondary",
    fontSize: { base: "sm", md: "lg" },
    fontWeight: { base: "medium", md: "normal" },
    fontFamily: "lato",
    _placeholder: {
      color: "grey_shade2",
      fontFamily: "lato",
      fontSizes: "xl",
      fontWeight: "normal",
    },
    _disabled: { color: "grey", bg: "grey_tint3", cursor: "not-allowed" },
  };
  const mergedProps = {
    ...props,
    ...commonStyles,
  };

  return (
    <>
      {label && (
        <StyledText
          py={2}
          fontFamily="lato"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight={{ base: "medium", md: "medium" }}
          color={labelColor || "grey_shade3"}
        >
          {label}
        </StyledText>
      )}
      {isInput ? (
        <InputGroup>
          <Field
            as={Input}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            padding={6}
            bgColor={bgColor}
            pr={hasIcon ? 14 : ""}
            validate={validate}
            onChange={onChange}
            disabled={disabled}
            max={max}
            {...mergedProps}
          />
          
        </InputGroup>
      ) : (
        <Field
          as={Textarea}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          bgColor={bgColor}
          validate={validate}
          onChange={onChange}
          disabled={disabled}
          {...mergedProps}
        />
      )}
    </>
  );
};

export default StyledInput;
