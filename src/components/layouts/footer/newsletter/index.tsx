import Link from "next/link";
import { Box, Button, Flex, Grid, HStack, Input, Spacer, Stack, VStack } from "@chakra-ui/react";
import { socialLinks } from "@/src/utils/constants";
import { StyledText, StyledButton, StyledInput } from "@/src/components";

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType; // Type for component
  bgColor?: string;
}

const SocialLink = ({ href, icon: Icon, bgColor = "#F8FBEB" }: SocialLinkProps) => {
  return (
    <Grid bg={bgColor} boxSize="48px" borderRadius="full" placeItems="center">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Icon /> {/* Render as component */}
      </Link>
    </Grid>
  );
};

export const FooterNewsletter = () => {
  return (
    <Box borderTopWidth="1px" borderTopColor="border" py={16}>
      <Stack
        maxW={{ md: "95%", lg: "90%" }}
        mx="auto"
        px={5}
        direction={{ base: "column", lg: "row" }}
        align="center"
        spaceY={3}
      >
        <HStack gap={4}>
          {socialLinks.map((link, index) => (
            <SocialLink href={link?.href} icon={link?.icon} key={index} />
          ))}
        </HStack>

        <Spacer />

        <VStack>
          <StyledText
            smVariant="p16-medium"
            mdVariant="p16-medium"
            variant="p21-medium"
            color="darkgrey"
          >
            Subscribe to Get financial tips & updates
          </StyledText>
          <Flex gap={4}>
            <StyledInput name="news" type="text"  />
            <StyledButton type="button">Subscribe</StyledButton>
          </Flex>
        </VStack>
      </Stack>
    </Box>
  );
};
