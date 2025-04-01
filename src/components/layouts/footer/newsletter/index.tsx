"use client";

import Link from "next/link";
import { Box, HStack, Stack, Spacer, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { socialLinks } from "@/src/utils/constants";
import { StyledText, StyledButton, StyledField } from "@/src/components";

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType;
  bgColor?: string;
}

const SocialLink = ({ href, icon: Icon, bgColor = "#F8FBEB" }: SocialLinkProps) => {
  return (
    <Box
      bg={bgColor}
      boxSize="48px"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Icon />
      </Link>
    </Box>
  );
};

interface FormValue {
  email: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
});

export const FooterNewsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log("Form submitted with:", data);
    reset();
  };

  return (
    <Box borderTopWidth="1px" borderTopColor="border" py={16}>
      <Stack
        maxW={{ md: "95%", lg: "90%" }}
        mx="auto"
        px={5}
        direction={{ base: "column", lg: "row" }}
        align="center"
        gap={3}
      >
        <HStack gap={4}>
          {socialLinks.map((link, index) => (
            <SocialLink href={link?.href} icon={link?.icon} key={index} />
          ))}
        </HStack>

        <Spacer />

        <VStack align={{ base: "center", lg: "stretch" }}>
          <StyledText
            smVariant="p16-medium"
            mdVariant="p16-medium"
            variant="p21-medium"
            color="darkgrey"
          >
            Subscribe to Get financial tips & updates
          </StyledText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack align="center" gap={0} bg="#f9f9f9" py={2} borderRadius="lg">
              <StyledField
                placeholder="Enter your email"
                type="email"
                fontSize={{ base: "14px", md: "16px" }}
                w="full"
                fieldProps={register("email")}
                error={errors.email?.message}
                bgColor=""
                borderRadius="md"
                labelColor="darkgrey"
                py={6}
                border="none"
                outline="none"
              />

              <Spacer />

              <StyledButton type="submit">Subscribe</StyledButton>
            </HStack>
          </form>
        </VStack>
      </Stack>
    </Box>
  );
};
