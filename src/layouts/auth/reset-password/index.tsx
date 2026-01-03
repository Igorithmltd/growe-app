"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledButton, StyledText, PasswordInput } from "@/src/components";
import { ResetFormValues, resetSchema } from "@/src/schema/auth.schema";
import { useResetPassword } from "@/src/hooks/apis/mutation/auth/useResetPassword";
import { useEffect } from "react";
import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({
    resolver: yupResolver(resetSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue("email", storedEmail);
    }
  }, [setValue]);

  const onSubmit = (data: ResetFormValues) => {
    if (!data.email) {
      router.push(ROUTES.AUTH.FORGOT_PASSWORD);
      return;
    }

    resetPassword(data, {
      onSuccess: () => {
        reset();
        router.push(ROUTES.AUTH.LOGIN);
        localStorage.removeItem("email");
      },
    });
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
            Reset Password
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={2}>
            Create a new password to Login{" "}
          </StyledText>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <PasswordInput
              label="Password"
              placeholder="Enter your new password"
              labelColor="secondary"
              field={register("password")}
              error={errors?.password?.message}
              {...commonProps}
            />

            <PasswordInput
              label="Re-type Password"
              placeholder="Confirm your password"
              labelColor="secondary"
              field={register("confirmPassword")}
              error={errors?.confirmPassword?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting || isPending}>
              Submit
            </StyledButton>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default ResetPasswordForm;
