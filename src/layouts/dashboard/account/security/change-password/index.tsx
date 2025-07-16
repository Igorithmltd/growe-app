"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledButton, StyledText, PasswordInput } from "@/src/components";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { changePasswordSchema, ChangePasswordValues } from "@/src/schema/profile.schema";

const ChangePasswordLayout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordValues) => {
    console.log(data);
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

  const handleBack = () => {
    router.back();
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Change Password
        </StyledText>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spaceY={4} align="stretch" mt={8}>
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            labelColor="secondary"
            field={register("currentPassword")}
            error={errors?.currentPassword?.message}
            {...commonProps}
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            labelColor="secondary"
            field={register("newPassword")}
            error={errors?.newPassword?.message}
            {...commonProps}
          />

          <PasswordInput
            label="Confrim Password"
            placeholder="Confirm new passowrd"
            labelColor="secondary"
            field={register("confirmPassword")}
            error={errors?.confirmPassword?.message}
            {...commonProps}
          />

          <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
            Update Password
          </StyledButton>
        </VStack>
      </form>
    </Box>
  );
};

export default ChangePasswordLayout;
