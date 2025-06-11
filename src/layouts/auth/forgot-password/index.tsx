"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledField, StyledButton, StyledText, StyledPinInput } from "@/src/components";
import { OtpFormValues, otpSchema, VerifyFormValue, verifySchema } from "@/src/schema/auth.schema";
import { usePathname, useRouter } from "next/navigation";
import { useQueryString } from "@/src/hooks/useQueryString";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import { useForgotPassword } from "@/src/hooks/apis/mutation/auth/useForgotPassword";
import { ROUTES } from "@/src/utils/constants";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();
  const { getQueryParams } = useQueryParams();

  const email = getQueryParams("email");

  const { forgotPassword, verifyPasswordOtp, isPending, isVerifying } = useForgotPassword();

  // Email form
  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    reset: resetEmailForm,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<VerifyFormValue>({
    resolver: yupResolver(verifySchema),
  });

  // OTP form
  const {
    register,
    handleSubmit: handleOtpSubmit,
    reset: resetOtpForm,
    formState: { errors: otpErrors, isSubmitting: isOtpSubmitting },
  } = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
  });

  const onSubmitEmail = (data: VerifyFormValue) => {
    forgotPassword(data, {
      onSuccess: () => {
        router.replace(pathname + "?" + createQueryString("email", String(data.email)), {
          scroll: false,
        });
        resetEmailForm();
      },
    });
  };

  const onSubmitOtp = (data: OtpFormValues) => {
    verifyPasswordOtp(
      { otp: data.code, email: email as string },
      {
        onSuccess: () => {
          localStorage.setItem("email", email as string);
          resetEmailForm();
          resetOtpForm();
          router.push(ROUTES.AUTH.RESET_PASSWORD);
        },
      }
    );
  };

  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: "120px" }}>
      {!email ? (
        <VStack spaceY={6} align="stretch">
          <Box>
            <StyledText
              fontSize={{ base: "16px", md: "21px", lg: "24px" }}
              color="secondary"
              fontWeight="semibold"
            >
              Forgot Your Password!
            </StyledText>
            <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
              No worries! we just need you to type your email address and we will send the
              verification code.
            </StyledText>
          </Box>

          <form onSubmit={handleEmailSubmit(onSubmitEmail)}>
            <VStack spaceY={4} align="stretch">
              <StyledField
                label="Email"
                labelColor="secondary"
                placeholder="Enter your email"
                type="text"
                fieldProps={emailRegister("email")}
                error={emailErrors.email?.message}
                py="20px"
                bg="#F8F8F8"
                border="2px solid #9BAB69"
              />
              <StyledButton type="submit" w="full" mt={4} loading={isEmailSubmitting || isPending}>
                Submit
              </StyledButton>
            </VStack>
          </form>
        </VStack>
      ) : (
        <VStack spaceY={6} align="stretch">
          <Box>
            <StyledText
              fontSize={{ base: "16px", md: "21px", lg: "24px" }}
              color="secondary"
              fontWeight="semibold"
            >
              Enter Verification Code
            </StyledText>
            <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
              We’ve sent a verification code to “{email}”. Please enter the code below.
            </StyledText>
          </Box>

          <form onSubmit={handleOtpSubmit(onSubmitOtp)}>
            <VStack spaceY={4} align="stretch">
              <StyledPinInput
                count={6}
                fieldProps={register("code")}
                error={otpErrors.code?.message}
              />

              <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                Didn’t receive the code?{" "}
                <Text as="span" fontWeight="semibold" color="secondary">
                  Resend
                </Text>{" "}
                in 30 seconds.
              </StyledText>

              <StyledButton type="submit" w="full" mt={4} loading={isOtpSubmitting || isVerifying}>
                Verify
              </StyledButton>
            </VStack>
          </form>
        </VStack>
      )}
    </Box>
  );
};
