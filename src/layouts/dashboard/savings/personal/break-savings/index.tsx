"use client";

import { Box, VStack, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import {
  SelectInputBox,
  SelectOptionModal,
  StyledButton,
  StyledField,
  StyledText,
} from "@/src/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@/src/contexts/ModalContext";
import { withdrawalInfoSchema, WithdrawalInfoValues } from "@/src/schema/profile.schema";
import { useState } from "react";
import SavingsSummarySection from "./summary";

const banks = [
  "Access Bank",
  "Zenith Bank",
  "First Bank",
  "Guaranty Trust Bank",
  "United Bank Of Africa (UBA)",
  "Fidelity Bank",
  "Union Bank",
  "Sterling Bank",
  "Polaris Bank",
  "Wema Bank",
];

export default function BreakSavingsLayout() {
  const router = useRouter();
  const { setIsSelectOpen } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawalInfoValues>({
    resolver: yupResolver(withdrawalInfoSchema),
  });
  const [isFirstStep, setIsFirstStep] = useState(true);

  const onSubmit = (data: WithdrawalInfoValues) => {
    console.log(data);
  };

  const selectedBank = watch("bank");

  const handleBankSelect = (bankName: string) => {
    setValue("bank", bankName);
    setIsSelectOpen(false);
  };

  const handleBack = () => {
    router.back();
  };

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    borderRadius: "12px",
    _focus: {
      outline: "none",
      border: "2px solid #9BAB69",
    },
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      {/* Back button & title */}
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Break savings
        </StyledText>
      </Box>

      {isFirstStep ? (
        <SavingsSummarySection onClick={() => setIsFirstStep(false)} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch" mt={6}>
            {/* Amount */}
            <StyledField
              label="Amount you’ll recieve"
              placeholder="₦126,350"
              labelColor="secondary"
              type="text"
              readOnly
              {...commonProps}
            />

            {/* Bank */}
            <SelectInputBox
              label="What’s your bank"
              value={selectedBank}
              placeholder="Select bank"
              onClick={() => setIsSelectOpen(true)}
            />

            {/* Account Number */}
            <StyledField
              label="What’s your account number"
              placeholder="e.g 0123456789"
              labelColor="secondary"
              type="text"
              fieldProps={register("accountNumber")}
              error={errors?.accountNumber?.message}
              {...commonProps}
            />

            {/* Account Name */}
            <StyledField
              label="Account name"
              placeholder="e.g John Doe"
              labelColor="secondary"
              type="text"
              fieldProps={register("accountName")}
              error={errors?.accountName?.message}
              {...commonProps}
            />

            {/* OTP and Generate Button */}
            <VStack align="stretch" spaceY={4}>
              <StyledField
                label="Enter OTP. Tap action below to generate code"
                placeholder="Enter OTP"
                labelColor="secondary"
                type="text"
                fieldProps={register("otp")}
                error={errors?.otp?.message}
                {...commonProps}
              />
              <StyledText
                bg="#ECFAEAE5"
                color="#89C184"
                fontSize="sm"
                borderRadius="20px"
                py="4px"
                px="8px"
                textAlign="center"
                alignSelf="flex-end"
                mt={2}
                cursor="pointer"
              >
                Tap to generate OTP
              </StyledText>
            </VStack>

            {/* Save Button */}
            <StyledButton type="submit" w="full" mt={4} loading={isSubmitting} bg="#9BAB69">
              Continue
            </StyledButton>
          </VStack>
        </form>
      )}

      {/* Bank Selection Modal */}
      <SelectOptionModal
        options={banks}
        onSelect={handleBankSelect}
        getKey={(bank) => bank}
        render={(bank, isSelected) => (
          <HStack align="center" justify="space-between" w="full">
            <StyledText
              fontWeight={isSelected ? "bold" : "normal"}
              fontSize={{ base: "sm", md: "md" }}
              color={isSelected ? "primary" : "secondary"}
            >
              {bank}
            </StyledText>
          </HStack>
        )}
      />
    </Box>
  );
}
