// components/footer/footer-copyright.tsx
import { Box, Text } from "@chakra-ui/react";

const FooterCopyright = () => {
  return (
    <Box borderTopWidth="1px" borderTopColor="gray.200" pt={8}>
      <Text color="gray.500" textAlign="center">
        © 2025 Growe. All rights reserved
      </Text>
    </Box>
  );
};

export default FooterCopyright;
