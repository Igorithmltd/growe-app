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

const banks = [
  "Access Bank",
  "Zenith Bank",
  "First Bank",
  "Guaranty Trust Bank",
  "UBA",
  "Fidelity Bank",
  "Union Bank",
  "Sterling Bank",
  "Polaris Bank",
  "Wema Bank",
];

export default function WithdrawFundsLayout() {
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
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Withdraw Funds
        </StyledText>
      </Box>

      <StyledText fontSize="sm" color="bfgrey" mt={2}>
        When you withdraw, your saved funds in the Growe app are securely sent to your linked bank
        account — quick, easy, and reliable!
      </StyledText>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spaceY={4} align="stretch" mt={6}>
          <SelectInputBox
            label="What is your bank?"
            value={selectedBank}
            placeholder="Choose a bank"
            onClick={() => setIsSelectOpen(true)}
          />

          <StyledField
            label="What’s your account number"
            placeholder="e.g 0123456789"
            labelColor="secondary"
            type="text"
            fieldProps={register("accountNumber")}
            error={errors?.accountNumber?.message}
            {...commonProps}
          />

          <StyledField
            label="Account Name"
            placeholder="e.g John Doe"
            labelColor="secondary"
            type="text"
            fieldProps={register("accountName")}
            error={errors?.accountName?.message}
            {...commonProps}
          />

          <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
            Save Changes
          </StyledButton>
        </VStack>
      </form>

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
