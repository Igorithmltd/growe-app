"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledField, StyledButton, StyledText, StyledPinInput } from "@/src/components";
import { OtpFormValues, otpSchema, VerifyFormValue, verifySchema } from "@/src/schema/auth.schema";
import { usePathname, useRouter } from "next/navigation";
import { useQueryString } from "@/src/hooks/useQueryString";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import { useVerifyEmail } from "@/src/hooks/apis/mutation/useVerifyEmail";
import { useVerifyOtp } from "@/src/hooks/apis/mutation/useVerifyOtp";
import { ROUTES } from "@/src/utils/constants";
import { useState, useEffect } from "react";
import { useSendOtp } from "@/src/hooks/apis/mutation/useSendOtp";

export const EmailVerificationForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();
  const { getQueryParams } = useQueryParams();

  const email = getQueryParams("email");

  const { mutate: getStarted, isPending } = useVerifyEmail();
  const { mutate: verifyOtp, isPending: isLoading } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useSendOtp();

  // Initial resend interval
  const [resendInterval, setResendInterval] = useState(30);
  const [countdown, setCountdown] = useState(resendInterval);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

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
    getStarted(data, {
      onSuccess: () => {
        router.replace(pathname + "?" + createQueryString("email", String(data.email)), {
          scroll: false,
        });
        resetEmailForm();
        setCountdown(30);
        setCanResend(false);
      },
    });
  };

  const onSubmitOtp = (data: OtpFormValues) => {
    verifyOtp(
      { otp: data.code, email: email as string },
      {
        onSuccess: () => {
          localStorage.setItem("email", email as string);
          resetEmailForm();
          resetOtpForm();
          router.push(ROUTES.AUTH.SIGN_UP);
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (!email || !canResend) return;

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setCountdown(resendInterval * 2);
          setResendInterval(resendInterval * 2);
          setCanResend(false);
        },
        onError: (error) => {
          console.error("Failed to resend OTP:", error);
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
              Verify Your Email to Get Started!
            </StyledText>
            <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
              Enter your Email for verification
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
              We've sent a verification code to "{email}". Please enter the code below to complete
              your registration.
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
                Didn't receive the code?{" "}
                {canResend ? (
                  <Text
                    as="span"
                    fontWeight="semibold"
                    color="secondary"
                    cursor="pointer"
                    onClick={!isResending ? handleResendOtp : undefined}
                  >
                    {isResending ? "Sending..." : "Resend"}
                  </Text>
                ) : (
                  <Text as="span" fontWeight="semibold" color="secondary">
                    Resend in{" "}
                    {countdown >= 60
                      ? `${Math.floor(countdown / 60)}m ${countdown % 60}s`
                      : `${countdown}s`}
                  </Text>
                )}
              </StyledText>

              <StyledButton type="submit" w="full" mt={4} loading={isOtpSubmitting || isLoading}>
                Verify
              </StyledButton>
            </VStack>
          </form>
        </VStack>
      )}
    </Box>
  );
};
