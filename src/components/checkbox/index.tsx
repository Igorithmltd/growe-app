"use client";

import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

interface StyledCheckboxProps {
  label?: string;
  checked?: boolean;
  color?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const StyledCheckbox = ({
  label,
  checked,
  defaultChecked,
  color = "bfgrey",
  onChange,
}: StyledCheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isControlled = typeof checked === "boolean";
  const currentChecked = isControlled ? checked : internalChecked;

  const handleCheckedChange = (e: any) => {
    const newChecked = !!e?.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  return (
    <Checkbox.Root checked={currentChecked} size="lg" onCheckedChange={handleCheckedChange}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label color={color} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
        {label}
      </Checkbox.Label>
    </Checkbox.Root>
  );
};
