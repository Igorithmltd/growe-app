"use client";

import { Box, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledField, StyledButton } from "@/src/components";

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
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log("Verifying email:", data);
    reset();
  };

  return (
    <Box px={6} py={10} mx="auto">
      <VStack spaceY={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Verify Your Email to Get Started!
        </Text>
        <Text color="gray.500">Enter your Email for verification</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="Email"
              placeholder="Enter your email"
              type="email"
              fieldProps={register("email")}
              error={errors.email?.message}
              defaultValue="JohnDoe@gmail.com"
            />
            <StyledButton type="submit" w="full">
              Submit
            </StyledButton>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};
