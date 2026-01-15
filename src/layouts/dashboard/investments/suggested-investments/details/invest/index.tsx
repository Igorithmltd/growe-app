"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledButton, StyledText } from "@/src/components";
import { useRouter } from "next/navigation";
import { quickSavingSchema, QuickSavingValues } from "@/src/schema/savings.schema";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, PendingMark } from "@/public/svgs";
import InfoModal from "@/src/components/modals/InfoModal";

const InvestForm = () => {
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
    <Box px={{lg:6}} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center">
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Invest Now
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Enter the amount you want to invest and take the next step toward growing your wealth. Start
        small or go big
      </StyledText>

      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={8} align="stretch">
            <AmountInput
              label="Amount"
              placeholder="Enter amount to invest"
              labelColor="secondary"
              field={register("amount")}
              error={errors?.amount?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Next
            </StyledButton>
          </VStack>
        </form>
      </Box>

      <InfoModal
        message="We’re reviewing your transaction, and it will be confirmed within 1-2 days. Thank you!"
        hasButton={true}
        buttonText={"Back to Investments"}
        icon={<PendingMark />}
      />
    </Box>
  );
};

export default InvestForm;
