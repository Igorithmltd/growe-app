import { Spinner as CircularProgress, Flex } from "@chakra-ui/react";

export const Loader = ({
  size = "lg",
  borderWidth = "2px",
}: {
  size?: "lg" | "sm" | "md" | "xl";
  borderWidth?: string | number;
}) => {
  return (
    <Flex alignItems="center" justifyContent="center" height={400}>
      <CircularProgress
        animationDuration="0.8s"
        color="primary"
        size={size}
        borderWidth={borderWidth}
      />
    </Flex>
  );
};

export const Spinner = ({
  size = "lg",
  borderWidth = "2px",
}: {
  size?: "lg" | "sm" | "md" | "xl";
  borderWidth?: string | number;
}) => {
  return (
    <CircularProgress
      animationDuration="0.8s"
      color="primary"
      size={size}
      borderWidth={borderWidth}
    />
  );
};
