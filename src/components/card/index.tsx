/* eslint-disable react/prop-types */

import { Box, BoxProps } from "@chakra-ui/react";

interface ReusableCardProps extends BoxProps {
  children?: React.ReactNode;
}

export const ReuseableCard: React.FC<ReusableCardProps> = ({
  borderRadius = "md",
  children,
  ...props
}) => {
  return (
    <Box borderRadius={borderRadius} boxShadow="md" p={4} bg="white" {...props}>
      {children}
    </Box>
  );
};
