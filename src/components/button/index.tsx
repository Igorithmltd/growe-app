import { ReactNode } from "react";

import { Button, ButtonProps } from "@chakra-ui/react";

type GlobalButtonProps = {
  colorScheme?: string;
  bgColor?: string;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "outline" | "solid" | "ghost" | "link";
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  icon?: React.ReactElement;
  className?: string;
  children: ReactNode;
  linear?: boolean;
} & ButtonProps;

export const StyledButton = ({
  size = "lg",
  loading = false,
  disabled = false,
  variant = "solid",
  color = "white",
  type = "button",
  bgColor = "primary",
  onClick,
  icon,
  className,
  colorScheme,
  linear = false,
  children,
  ...rest
}: GlobalButtonProps) => {
  return (
    <Button
      colorScheme={colorScheme}
      className={className}
      bg={linear ? "linear-gradient( #9BAB89 0%, #3F452A 100%)" : bgColor}
      borderRadius="10px"
      px="20px"
      py="20px"
      color={color}
      size={size}
      loading={loading}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      type={type}
      _hover={{
        bg: linear ? "linear-gradient(135deg, #8E9F7D 0%, #374024 100%)" : "primaryLight01",
      }}
      fontSize="16px"
      fontWeight="normal"
      display="flex"
      alignItems="center"
      gap={2}
      {...rest}
    >
      {icon && icon}
      {children}
    </Button>
  );
};
