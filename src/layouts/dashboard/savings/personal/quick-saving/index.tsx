"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledField, StyledButton, StyledText, PasswordInput } from "@/src/components";
import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { quickSavingSchema, QuickSavingValues } from "@/src/schema/savings.schema";

const LoginLayout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    resolver: yupResolver(quickSavingSchema),
  });

  const onSubmit = (data: QuickSavingValues) => {
    // login(data, {
    //   onSuccess: () => {
    //     reset();
    //     router.push(ROUTES.DASHBOARD.HOME);
    //   },
    // });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spaceY={4} align="stretch">
          <StyledField
            label="Amount"
            placeholder="Enter amount to save (Min: 1000)"
            labelColor="secondary"
            type="text"
            fieldProps={register("amount")}
            error={errors?.amount?.message}
            {...commonProps}
          />

          <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
            Save
          </StyledButton>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginLayout;
