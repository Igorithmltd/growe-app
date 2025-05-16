"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledButton, StyledText } from "@/src/components";
import { useRouter } from "next/navigation";
import { quickSavingSchema, QuickSavingValues } from "@/src/schema/savings.schema";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, SuccessMark } from "@/public/svgs";
import InfoModal from "@/src/components/modals/InfoModal";

const QuickSavingLayout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    resolver: yupResolver(quickSavingSchema),
  });

  const onSubmit = (data: QuickSavingValues) => {
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

  return (
    <Box px={6} py={10} w={{ lg: "65%" }} mx="auto" mt={{ base: 6, lg: "unset" }}>
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        mt={{ base: 6, lg: "unset" }}
        cursor="pointer"
        onClick={() => router.back()}
      >
        <BackIcon />

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Quick Save
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Add money to your savings and watch your goals grow instantly!
      </StyledText>

      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={8} align="stretch">
            <AmountInput
              label="Amount"
              placeholder="Enter amount to save (Min: 1000)"
              labelColor="secondary"
              field={register("amount")}
              error={errors?.amount?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Save
            </StyledButton>
          </VStack>
        </form>
      </Box>

      <InfoModal
        message="Woohoo! 🎉 Your Transaction Was a Success!"
        hasButton={true}
        buttonText={"Go back to Quick Save"}
        icon={<SuccessMark />}
      />
    </Box>
  );
};

export default QuickSavingLayout;
