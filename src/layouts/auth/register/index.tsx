"use client";

import { Box, Link, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledField, StyledButton, StyledText, PasswordInput } from "@/src/components";
import { SignupFormValues, signupSchema } from "@/src/schema/auth.schema";
import { ROUTES } from "@/src/utils/constants";

const SignupLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log("Signup data:", data);
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
    <Box px={6} py={10} mx="auto">
      <VStack align="stretch" spaceY={6}>
        <Box>
          <StyledText
            fontSize={{ base: "18px", md: "21px", lg: "24px" }}
            fontWeight="semibold"
            color="secondary"
          >
            Let’s get started
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={2}>
            Join <strong>Growe</strong> to start saving and investing smarter today!
          </StyledText>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="First Name"
              placeholder="e.g John"
              labelColor="secondary"
              type="text"
              fieldProps={register("firstName")}
              error={errors?.firstName?.message}
              {...commonProps}
            />
            <StyledField
              label="Last Name"
              placeholder="e.g Doe"
              labelColor="secondary"
              type="text"
              fieldProps={register("lastName")}
              error={errors?.lastName?.message}
              {...commonProps}
            />

            <StyledField
              label="Username"
              placeholder="Enter username"
              labelColor="secondary"
              type="text"
              fieldProps={register("username")}
              error={errors?.username?.message}
              {...commonProps}
            />

            <StyledField
              label="Phone Number"
              placeholder="Enter Phone Number"
              labelColor="secondary"
              type="tel"
              fieldProps={register("phone")}
              error={errors?.phone?.message}
              {...commonProps}
            />

            <PasswordInput
              label="Create a password"
              placeholder="Enter Password"
              labelColor="secondary"
              field={register("password")}
              error={errors?.password?.message}
              {...commonProps}
            />

            <PasswordInput
              label="Re-type password"
              placeholder="Enter Password"
              labelColor="secondary"
              field={register("confirmPassword")}
              error={errors?.confirmPassword?.message}
              {...commonProps}
            />

            <StyledField
              label="Referral code"
              placeholder="Enter Referral Code (optional)"
              labelColor="secondary"
              type="text"
              fieldProps={register("referralCode")}
              error={errors?.referralCode?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2}>
              Create Account
            </StyledButton>

            <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
              Have an account?{" "}
              <Link
                href={ROUTES.AUTH.LOGIN}
                fontWeight="semibold"
                color="secondary"
                _hover={{
                  textDecor: "none",
                }}
                _focus={{
                  outline: "none",
                }}
              >
                Sign in
              </Link>
            </StyledText>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default SignupLayout;
