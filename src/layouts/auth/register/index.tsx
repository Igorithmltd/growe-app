"use client";

import { Box, Link, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledField, StyledButton, StyledText, PasswordInput } from "@/src/components";
import { SignupFormValues, signupSchema } from "@/src/schema/auth.schema";
import { ROUTES } from "@/src/utils/constants";
import { useRegister } from "@/src/hooks/apis/mutation/useRegister";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfoModal from "@/src/components/modals/InfoModal";
import useShowToast from "@/src/hooks/useShowToast";
import { useModal } from "@/src/contexts/ModalContext";
import { InfoMark } from "@/public/svgs";

const SignupLayout = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const { setIsInfoOpen } = useModal();
  const [isVerify, setIsVerify] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue("email", storedEmail);
    }
  }, [setValue]);

  const onSubmit = (data: SignupFormValues) => {
    if (!data.email) {
      router.push(ROUTES.AUTH.VERIFY_EMAIL);
      return;
    }

    mutate(data, {
      onError: (error) => {
        if (error.response) {
          const errorData = error.response.data;

          if (
            errorData.statusCode === 400 &&
            errorData.message === "User does not exist. Please try again later"
          ) {
            showToast({
              title: "Error",
              description: "Email does not exist. Verify your email",
              status: "error",
            });

            setIsVerify(true);
            setIsInfoOpen(true);
            return;
          }

          console.log(errorData);
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
          description: "Registration in successfully.",
          status: "success",
        });
        reset();
        router.push(ROUTES.AUTH.LOGIN);
        localStorage.removeItem("email");
      },
    });
  };

  const handleButtonClick = () => {
    setIsRedirecting(true);
    if (isVerify) {
      router.push(ROUTES.AUTH.VERIFY_EMAIL);
    } else {
      router.push(ROUTES.AUTH.LOGIN);
    }
    setIsInfoOpen(false);
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
              label="Email"
              placeholder="Enter your verified email"
              labelColor="secondary"
              type="text"
              fieldProps={register("email")}
              error={errors?.email?.message}
              {...commonProps}
            />
            <StyledField
              label="First Name"
              placeholder="e.g John"
              labelColor="secondary"
              type="text"
              fieldProps={register("first_name")}
              error={errors?.first_name?.message}
              {...commonProps}
            />
            <StyledField
              label="Last Name"
              placeholder="e.g Doe"
              labelColor="secondary"
              type="text"
              fieldProps={register("last_name")}
              error={errors?.last_name?.message}
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
              fieldProps={register("phone_number")}
              error={errors?.phone_number?.message}
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
              fieldProps={register("referral_code")}
              error={errors?.referral_code?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting || isPending}>
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

      <InfoModal
        title={isVerify ? "Email does not exist" : "User with email exists"}
        message={
          isVerify
            ? "Email does not exist. Please verify your email"
            : "Please login to your account"
        }
        hasButton={true}
        buttonText={isVerify ? "Verify Email" : "Login"}
        isLoading={isRedirecting}
        onButtonClick={handleButtonClick}
        icon={<InfoMark />}
      />
    </Box>
  );
};

export default SignupLayout;
