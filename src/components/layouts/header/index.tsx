"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link as ChakraLink,
  Spacer,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { StyledText, StyledButton } from "@/src/components";
import logo from "@/public/images/logo.webp";
import { navLinks } from "@/src/utils/constants";
import { Close, Hamburger } from "@/public/svgs";
import { useSectionStore } from "@/src/stores/active-section";
import { handleNavigationClick } from "@/src/utils/helpers";

const Header = () => {
  const { activeSection, setActiveSection } = useSectionStore();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { open, onToggle } = useDisclosure();

  const router = useRouter();

  const navigateGetStarted = () => {
    router.push("/onboarding");
  };

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100;
    let foundSection = null;

    // Check all sections
    for (const link of navLinks) {
      const sectionId = link.href.startsWith("/#")
        ? link.href.slice(2)
        : link.href.startsWith("#")
          ? link.href.slice(1)
          : null;

      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          const sectionBottom = sectionTop + height;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            foundSection = `#${sectionId}`;
            break;
          }
        }
      }
    }

    if (!foundSection && scrollPosition < 100) {
      foundSection = "#home";
    }

    setActiveSection(foundSection || "#home");
  }, [setActiveSection]);

  const handleLinkClick = useMemo(
    () => (href: string) =>
      handleNavigationClick(href, pathname, setActiveSection, open ? onToggle : undefined),
    [pathname, setActiveSection, open, onToggle]
  );

  if (!isClient) return null;

  return (
    <Box
      as="header"
      bg="#FDFDFD"
      px={{ base: 4, lg: 12 }}
      py={4}
      boxShadow="xs"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={70}
    >
      <Container maxW="full">
        <Flex align="center">
          <ChakraLink
            href="/"
            onClick={handleLinkClick("/")}
            w={{ base: "100px", lg: "auto" }}
            flexShrink={0} // Prevent logo from shrinking
          >
            <Image src={logo.src} alt="Grove logo" w="full" />
          </ChakraLink>

          <Spacer />

          <HStack
            spaceX={8}
            display={{ base: "none", lg: "flex" }}
            p={5}
            border="1px solid"
            borderColor="border"
            borderRadius="10px"
            flexShrink={0} // Prevent nav from shrinking
          >
            {navLinks.map((link) => (
              <ChakraLink
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                scrollBehavior="smooth"
                _hover={{ color: "primary", textDecoration: "none" }}
                _focus={{ outline: "none" }}
              >
                <StyledText
                  variant="p18-regular"
                  color={
                    activeSection === link.href || (link.href === "/" && activeSection === "#home")
                      ? "primary"
                      : "grey"
                  }
                  fontWeight={
                    activeSection === link.href || (link.href === "/" && activeSection === "#home")
                      ? "semibold"
                      : "normal"
                  }
                >
                  {link.name}
                </StyledText>
              </ChakraLink>
            ))}
          </HStack>

          <Spacer display={{ base: "none", lg: "block" }} />

          <Box display={{ base: "none", lg: "block" }} ml={4} flexShrink={0}>
            <StyledButton type="button" onClick={navigateGetStarted}>
              Get Started
            </StyledButton>
          </Box>

          <Box display={{ base: "flex", lg: "none" }} onClick={onToggle} ml={4}>
            {open ? <Close /> : <Hamburger />}
          </Box>
        </Flex>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: "100%", overflow: "hidden" }}
            >
              <VStack
                spaceY={4}
                align="flex-start"
                w="full"
                my={6}
                p={5}
                border="1px solid"
                borderColor="border"
                borderRadius="10px"
              >
                {navLinks.map((link) => (
                  <ChakraLink
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick(link.href)}
                    scrollBehavior="smooth"
                    _hover={{ color: "primary", textDecoration: "none" }}
                    _focus={{ outline: "none" }}
                    w="full"
                  >
                    <StyledText
                      smVariant="p16-regular"
                      color={
                        activeSection === link.href ||
                        (link.href === "/" && activeSection === "#home")
                          ? "primary"
                          : "secondary"
                      }
                      fontWeight={
                        activeSection === link.href ||
                        (link.href === "/" && activeSection === "#home")
                          ? "semibold"
                          : "normal"
                      }
                    >
                      {link.name}
                    </StyledText>
                  </ChakraLink>
                ))}
                <StyledButton type="button" onClick={navigateGetStarted} w="full" mt={4}>
                  Get Started
                </StyledButton>
              </VStack>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Header;
