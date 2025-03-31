"use client";

import { usePathname } from "next/navigation";
import { StyledText } from "@/src/components";
import { footerLinks } from "@/src/utils/constants";
import { Grid, GridItem, Link, VStack } from "@chakra-ui/react";
import { useSectionStore } from "@/src/stores/active-section";
import { useMemo } from "react";
import { handleNavigationClick } from "@/src/utils/helpers";

interface FooterLinksProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const FooterLinks = ({ title, links }: FooterLinksProps) => {
  const pathname = usePathname();
  const { setActiveSection } = useSectionStore();

  const handleClick = useMemo(
    () => (href: string) => handleNavigationClick(href, pathname, setActiveSection),
    [pathname, setActiveSection]
  );

  return (
    <VStack align="flex-start" spaceY={5}>
      <StyledText smVariant="p16-medium" mdVariant="p16-medium"  variant="p18-medium" color="darkgrey">
        {title}
      </StyledText>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          onClick={handleClick(link.href)}
          color="grey" 
          fontSize={{ base: "14px", md: "16px" }}
          _hover={{ color: "primary", textDecoration: "none" }}
        >
          {link.label}
        </Link>
      ))}
    </VStack>
  );
};

const LinkGrid = () => {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={8}>
      {footerLinks.map((section) => (
        <GridItem key={section.title}>
          <FooterLinks title={section.title} links={section.links} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default LinkGrid;
