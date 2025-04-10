"use client";

import { Box, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledField, StyledButton, StyledText } from "@/src/components";

interface FormValue {
  email: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
});

export const EmailVerificationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<FormValue>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log("Verifying email:", data);
    reset();
  };

  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: "unset" }}>
      <VStack spaceY={6} align="stretch">
        <Box>
          <StyledText
            fontSize={{ base: "16px", md: "21px", lg: "24px" }}
            color="secondary"
            fontWeight="semibold"
          >
            Verify Your Email to Get Started!
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
            Enter your Email for verification
          </StyledText>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="Email"
              labelColor="secondary"
              placeholder="Enter your email"
              type="text"
              fieldProps={register("email")}
              error={errors.email?.message}
              py="20px"
              bg="#F8F8F8"
              border="2px solid #9BAB69"
              _focus={{
                outlineWidth: "2px",
                border: "none",
              }}
            />
            <StyledButton type="submit" w="full" mt={4}>
              Submit
            </StyledButton>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};
