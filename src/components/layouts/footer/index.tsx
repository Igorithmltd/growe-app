import { Box, Spacer, Stack, VStack } from "@chakra-ui/react";
import FooterHeader from "./header";
import FooterCopyright from "./copyright";
import { FooterNewsletter } from "./newsletter";
import LinkGrid from "./link-grid";

const Footer = () => {
  return (
    <Box as="footer" mt={"150px"}>
      <Box maxW={{ md: "95%", lg: "90%" }} mx="auto" px={5} py={12}>
        <VStack spaceY={12} align="stretch" py={12}>
          <Stack
            direction={{ base: "column", lg: "row" }}
            spaceY={5}
            align={{ base: "start", lg: "center" }}
          >
            <FooterHeader />
            <Spacer />
            <LinkGrid />
          </Stack>
        </VStack>
      </Box>
      <FooterNewsletter />
      <FooterCopyright />
    </Box>
  );
};

export default Footer;
