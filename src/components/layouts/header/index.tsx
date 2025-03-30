"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
import { motion, AnimatePresence } from "framer-motion"; // Using framer-motion for animation
import logo from "@/public/images/logo.webp";
import navLinks from "@/src/utils/constants";
import { StyledText } from "../../text";
import { StyledButton } from "../../button";
import { Close, Hamburger } from "@/public/svgs";

const Header = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { open, onToggle } = useDisclosure();

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }

      const handleScroll = () => {
        const scrollPosition = window.scrollY + 100;
        let foundSection = null;

        for (const link of navLinks) {
          if (link.href.startsWith("#")) {
            const section = document.getElementById(link.href.slice(1));
            if (section) {
              const { top, height } = section.getBoundingClientRect();
              const sectionTop = top + window.scrollY;
              const sectionBottom = sectionTop + height;

              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                foundSection = link.href;
                break;
              }
            }
          }
        }

        setActiveSection(foundSection);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === "/" && href.startsWith("#")) {
      setActiveSection(href);
      onToggle();
    } else if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("#home");
      onToggle();
    }
  };

  if (!isClient) return null;

  return (
    <Box
      as="header"
      bg="white"
      px={{ base: 4, lg: 12 }}
      py={4}
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={70}
    >
      <Container maxW="full">
        <Flex align="center" direction={{ base: "column", lg: "row" }}>
          <Flex w="full" align="center">
            <ChakraLink href="/" onClick={handleLinkClick("/")} w={{ base: "100px", lg: "auto" }}>
              <Image src={logo.src} alt="Grove logo" w="full" />
            </ChakraLink>

            <Spacer />

            <Box display={{ base: "none", lg: "block" }}>
              <HStack spaceX={8} p={5} border="1px solid" borderColor="border" borderRadius="10px">
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
                        activeSection === link.href ||
                        (link.href === "/" && activeSection === "#home")
                          ? "primary"
                          : "grey"
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
              </HStack>
            </Box>

            <Spacer display={{ base: "none", lg: "block" }} />

            <Box display={{ base: "none", lg: "block" }} ml={4}>
              <StyledButton type="button">Get Started</StyledButton>
            </Box>

            <Box display={{ base: "flex", lg: "none" }} onClick={onToggle}>
              {open ? <Close /> : <Hamburger />}
            </Box>
          </Flex>

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
                  spaceY={8}
                  align="flex-start"
                  w="full"
                  pt={4}
                  pb={6}
                  display={{ base: "flex", lg: "none" }}
                  mt={8}
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
                  <StyledButton type="button" w="145px" mt={6}>
                    Get Started
                  </StyledButton>
                </VStack>
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
