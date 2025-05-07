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
import useShowToast from "@/src/hooks/useShowToast";
import { useModal } from "@/src/contexts/ModalContext";
import { InfoMark } from "@/public/svgs";
import InfoModal from "@/src/components/modals/InfoModal";

export const EmailVerificationForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();
  const { getQueryParams } = useQueryParams();
  const showToast = useShowToast();

  const { setIsInfoOpen } = useModal();

  const email = getQueryParams("email");

  const { mutate: getStarted, isPending } = useVerifyEmail();
  const { mutate: verifyOtp, isPending: isLoading } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useSendOtp();

  // Initial resend interval
  const [resendInterval, setResendInterval] = useState(30);
  const [countdown, setCountdown] = useState(resendInterval);
  const [canResend, setCanResend] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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
      onError: (error) => {
        if (error.response) {
          const errorData = error.response.data;

          if (errorData.statusCode === 400 && !errorData.user?.isVerified) {
            resendOtp(
              { email: data.email },
              {
                onSuccess: () => {
                  localStorage.setItem("email", data.email);
                  showToast({
                    title: "Success",
                    description: "Verification email sent successfully.",
                    status: "success",
                  });
                  router.replace(pathname + "?" + createQueryString("email", String(data.email)), {
                    scroll: false,
                  });
                  resetEmailForm();
                  setCountdown(30);
                  setCanResend(false);
                },
              }
            );
            router.replace(pathname + "?" + createQueryString("email", String(data.email)), {
              scroll: false,
            });
            return;
          }

          if (
            errorData.statusCode === 400 &&
            errorData.user?.isVerified &&
            !errorData.user?.firstName
          ) {
            localStorage.setItem("email", data.email);
            showToast({
              title: "Error",
              description: "Email already verified. Please complete sign up.",
              status: "error",
            });
            setIsRegister(true);
            setIsInfoOpen(true);
            return;
          }

          if (
            errorData.statusCode === 400 &&
            errorData.user?.isVerified &&
            errorData.user?.firstName
          ) {
            showToast({
              title: "Error",
              description: "User with email exists. Please login.",
              status: "error",
            });
            setIsInfoOpen(true);
            return;
          }

          showToast({
            title: "Error",
            description: errorData.message || "Something went wrong on the server",
            status: "error",
          });
        } else if (error.request) {
          showToast({
            title: "Network Error",
            description: "No response received from the server, try again",
            status: "warning",
          });
        } else {
          showToast({
            title: "Error",
            description: error.message || "An unknown error occurred",
            status: "error",
          });
        }
      },
      onSuccess: () => {
        showToast({
          title: "Success",
          description: "Verification email sent successfully.",
          status: "success",
        });
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
    if (!email) {
      showToast({
        title: "Error",
        description: "Email is missing. Please restart verification.",
        status: "error",
      });
      router.push(ROUTES.AUTH.VERIFY_EMAIL);
      return;
    }
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
          showToast({
            title: "Success",
            description: "Verification email sent successfully.",
            status: "success",
          });
          setCountdown(resendInterval * 2);
          setResendInterval(resendInterval * 2);
          setCanResend(false);
        },
      }
    );
  };

  const handleButtonClick = () => {
    setIsRedirecting(true);
    if (isRegister) {
      router.push(ROUTES.AUTH.SIGN_UP);
    } else {
      router.push(ROUTES.AUTH.LOGIN);
    }
    setIsInfoOpen(false);
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

      <InfoModal
        title={isRegister ? "Email already verified" : "User with email exists"}
        message={
          isRegister ? "Email verified, please complete sign up" : "Please login to your account"
        }
        hasButton={true}
        buttonText={isRegister ? "Sign Up" : "Login"}
        isLoading={isRedirecting}
        onButtonClick={handleButtonClick}
        icon={<InfoMark />}
      />
    </Box>
  );
};
