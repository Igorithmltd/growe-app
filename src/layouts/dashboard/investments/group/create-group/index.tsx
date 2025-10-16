"use client";

import { Box, VStack, HStack, Flex, Spinner } from "@chakra-ui/react";
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
import {
  createInvestmentGroupSchema,
  CreateInvestmentGroupValues,
} from "@/src/schema/investments.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { useQuery } from "@tanstack/react-query";

const CreateInvestmentGroupLayout = () => {
  const router = useRouter();
  const { setIsInfoOpen, setIsSelectOpen } = useModal();
  const { getAllInvestments } = useInvestments();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-investments"],
    queryFn: getAllInvestments,
  });

  const investments: InvestmentPlan[] = data?.data.message || [];
  const loading = isPending || isFetching;

  const investmentOptions = investments.map((inv) => ({
    _id: inv._id,
    name: inv.title,
    target: inv.minimumInvestmentAmount || 0,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateInvestmentGroupValues>({
    resolver: yupResolver(createInvestmentGroupSchema),
  });

  const selectedInvestment = watch("investmentId");

  const onSubmit = (data: CreateInvestmentGroupValues) => {
    console.log(data);
    setIsInfoOpen(true);
  };

  const handleInvestmentSelect = (investment: {
    _id: string;
    name: string;
    target: number;
  }) => {
    setValue("investmentId", investment._id);
    setValue("investmentTarget", investment.target);
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
    <Box px={{ lg: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      {/* Header */}
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        mt={{ base: 6, lg: "unset" }}
      >
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Create Investment Group
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Create a group investment with like-minded individuals to achieve bigger
        goals and grow wealth together!
      </StyledText>

      {/* Form */}
      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            {/* Group Title */}
            <StyledField
              label="Group Title"
              placeholder="Enter group title"
              labelColor="secondary"
              type="text"
              fieldProps={register("title")}
              error={errors?.title?.message}
              {...commonProps}
            />

            {/* Investment Selection */}
            <SelectInputBox
              label="Select Investment"
              value={selectedInvestment}
              placeholder={
                loading
                  ? "Loading investments..."
                  : error
                    ? "Failed to load investments"
                    : "Choose an investment"
              }
              onClick={() => !loading && !error && setIsSelectOpen(true)}
            />

            {/* Investment Target */}
            <AmountInput
              label="Investment Target"
              labelColor="secondary"
              placeholder="Enter target amount"
              field={register("investmentTarget")}
              readOnly
              {...commonProps}
            />

            {/* Minimum Member Contribution */}
            <AmountInput
              label="Minimum Contribution per Member"
              placeholder="Enter minimum contribution per member"
              labelColor="secondary"
              field={register("minimumMemberContribution")}
              error={errors?.minimumMemberContribution?.message}
              {...commonProps}
            />

            {/* Member Limit (optional) */}
            <StyledField
              label="Member Limit (optional)"
              placeholder="e.g 2, 3, 50..."
              labelColor="secondary"
              type="number"
              fieldProps={register("memberLimit")}
              error={errors?.memberLimit?.message}
              {...commonProps}
            />

            {/* Description */}
            <StyledField
              label="What's this group about?"
              placeholder="Enter description"
              labelColor="secondary"
              type="text"
              isTextarea
              bgColor="#F8F8F8"
              fieldProps={register("groupDescription")}
              error={errors?.groupDescription?.message}
              {...commonProps}
            />

            {/* Submit */}
            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Create Group
            </StyledButton>
          </VStack>
        </form>
      </Box>

      {/* Success Modal */}
      <InfoModal
        message="Congratulations! 🎉 Your Investment Group Has Been Created!"
        hasButton={true}
        buttonText="Go back to investments"
        icon={<GroupMark />}
      />

      {/* Investment Selection Modal */}
      <SelectOptionModal
        options={investmentOptions}
        onSelect={handleInvestmentSelect}
        getKey={(option) => option._id}
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
