"use client";

import { Box, VStack, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  StyledField,
  StyledButton,
  StyledText,
  SelectOptionModal,
  SelectInputBox,
} from "@/src/components";
import { AmountInput } from "@/src/components/amount-input";
import { useRouter } from "next/navigation";
import { BackIcon, GroupMark } from "@/public/svgs";
import { useModal } from "@/src/contexts/ModalContext";
import InfoModal from "@/src/components/modals/InfoModal";
import { formatAmount } from "@/src/utils/helpers";

export interface CreateInvestmentGroupValues {
  groupName: string;
  investment: string;
  targetAmount: number;
  minContribution: number;
  membersLimit: number;
  description: string;
}

const investmentOptions = [
  { name: "Enviable Transport", target: 1000000 },
  { name: "Farmcrowdy Maize Farming", target: 5000000 },
  { name: "Nigeria Commodity Exchange (NCX)", target: 3000000 },
  { name: "Stanbic IBTC Money Market Fund", target: 1000000 },
];

const CreateInvestmentGroupLayout = () => {
  const router = useRouter();
  const { setIsInfoOpen, setIsSelectOpen } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateInvestmentGroupValues>();

  const selectedInvestment = watch("investment");
  // const targetAmount = watch("targetAmount");

  const onSubmit = (data: CreateInvestmentGroupValues) => {
    console.log(data);
    setIsInfoOpen(true);
  };

  const handleInvestmentSelect = (investment: { name: string; target: number }) => {
    setValue("investment", investment.name);
    setValue("targetAmount", investment.target);
    setIsSelectOpen(false);
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

  const handleBack = () => router.back();

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Create Investment Group
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Create a group investment with like-minded individuals to achieve bigger goals and grow
        wealth together!
      </StyledText>

      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="Investment Group Name"
              placeholder="Enter name for investment group"
              labelColor="secondary"
              type="text"
              fieldProps={register("groupName")}
              error={errors?.groupName?.message}
              {...commonProps}
            />

            <SelectInputBox
              label="Select Investment"
              value={selectedInvestment}
              placeholder="Choose an investment"
              onClick={() => setIsSelectOpen(true)}
            />

            <AmountInput
              label="Investment Target"
              labelColor="secondary"
              placeholder="Enter target amount"
              field={register("targetAmount")}
              readOnly
              {...commonProps}
            />

            <AmountInput
              label="Minimum Contribution per Member"
              placeholder="Enter minimum contribution per member"
              labelColor="secondary"
              field={register("minContribution")}
              error={errors?.minContribution?.message}
              {...commonProps}
            />

            <StyledField
              label="Members Limit (optional)"
              placeholder="e.g 2, 3, 50..."
              labelColor="secondary"
              type="number"
              fieldProps={register("membersLimit")}
              error={errors?.membersLimit?.message}
              {...commonProps}
            />

            <StyledField
              label="What's this group about?"
              placeholder="Enter description"
              labelColor="secondary"
              type="text"
              isTextarea
              bgColor="#F8F8F8"
              fieldProps={register("description")}
              error={errors?.description?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Create Group
            </StyledButton>
          </VStack>
        </form>
      </Box>

      <InfoModal
        message="Congratulations! 🎉 Your Investment Group Has Been Created!"
        hasButton={true}
        buttonText={"Go back to investments"}
        icon={<GroupMark />}
      />

      <SelectOptionModal
        options={investmentOptions}
        onSelect={handleInvestmentSelect}
        getKey={(option) => option.name}
        render={(option, isSelected) => (
          <HStack align="center" justify="space-between">
            <StyledText
              fontWeight={isSelected ? "bold" : "normal"}
              fontSize={{ base: "sm", md: "md" }}
              color={isSelected ? "primary" : "secondary"}
            >
              {option.name}
            </StyledText>

            <StyledText
              fontWeight={isSelected ? "bold" : "medium"}
              fontSize={{ base: "sm", md: "md" }}
              color={isSelected ? "primary" : "secondary"}
            >
              {formatAmount(option.target)}
            </StyledText>
          </HStack>
        )}
      />
    </Box>
  );
};

export default CreateInvestmentGroupLayout;
