"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledField, StyledButton, StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, GroupMark } from "@/public/svgs";
import { useModal } from "@/src/contexts/ModalContext";
import InfoModal from "@/src/components/modals/InfoModal";

export interface QuickSavingValues {
  purpose: string;
  targetAmount: number;
  frequentAmount: number;
  frequency: string;
  duration: string;
  interestRate: number;
}

const CreateInvestmentGroupLayout = () => {
  const router = useRouter();

  const { setIsInfoOpen } = useModal();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    // resolver: yupResolver(quickSavingSchema),
  });

  const onSubmit = (data: QuickSavingValues) => {
    console.log(data);
    setIsInfoOpen(true);
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
        wealth together!{" "}
      </StyledText>

      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="Investment Group Name"
              placeholder="Enter name for investment group"
              labelColor="secondary"
              type="text"
              fieldProps={register("purpose")}
              error={errors?.purpose?.message}
              {...commonProps}
            />

            <AmountInput
              label="Investment target"
              placeholder="Enter investment target"
              labelColor="secondary"
              field={register("targetAmount")}
              error={errors?.targetAmount?.message}
              {...commonProps}
            />

            <AmountInput
              label="Minimum Contribution per Member"
              placeholder="Enter minimum contribution per member"
              labelColor="secondary"
              field={register("targetAmount")}
              error={errors?.targetAmount?.message}
              {...commonProps}
            />

            <StyledField
              label="Members Limit (optional)"
              placeholder="e.g 2, 3, 50..."
              labelColor="secondary"
              type="number"
              fieldProps={register("purpose")}
              error={errors?.purpose?.message}
              {...commonProps}
            />

            <StyledField
              label="What'sthis group about?"
              placeholder="Enter description"
              labelColor="secondary"
              type="text"
              isTextarea
              fieldProps={register("purpose")}
              error={errors?.purpose?.message}
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
        buttonText={"Go back to savings"}
        icon={<GroupMark />}
      />
    </Box>
  );
};

export default CreateInvestmentGroupLayout;
