"use client";

import { Box, VStack, HStack, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledField, StyledButton, StyledText, PasswordInput } from "@/src/components";
import { LoginFormValues, loginSchema } from "@/src/schema/auth.schema";
import { ROUTES } from "@/src/utils/constants";

const LoginLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    reset();
  };

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: "unset" }}>
      <VStack align="stretch" spaceY={6}>
        <Box>
          <StyledText
            fontSize={{ base: "18px", md: "21px", lg: "24px" }}
            fontWeight="semibold"
            color="secondary"
          >
            Welcome Back to Growe!
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={2}>
            Let’s get you back to saving, investing, and achieving your goals!
          </StyledText>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="Email"
              placeholder="Enter your email"
              labelColor="secondary"
              type="text"
              fieldProps={register("email")}
              error={errors?.email?.message}
              {...commonProps}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              labelColor="secondary"
              field={register("password")}
              error={errors?.password?.message}
              {...commonProps}
            />

            <HStack justify="flex-end">
              <Link
                href={ROUTES.AUTH.FORGOT_PASSWORD}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="secondary"
                _hover={{
                  textDecor: "none",
                }}
                _focus={{
                  outline: "none",
                }}
              >
                Forgot Password?
              </Link>
            </HStack>

            <StyledButton type="submit" w="full" mt={2}>
              Log In
            </StyledButton>
          </VStack>
        </form>

        <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
          New to Growe?{" "}
          <Link
            href={ROUTES.AUTH.SIGN_UP}
            fontWeight="semibold"
            color="secondary"
            _hover={{
              textDecor: "none",
            }}
            _focus={{
              outline: "none",
            }}
          >
            Create an Account
          </Link>
        </StyledText>
      </VStack>
    </Box>
  );
};

export default LoginLayout;
