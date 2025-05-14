"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledField, StyledButton, StyledText, SelectButtonGroup } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon } from "@/public/svgs";
import { useState } from "react";
import WeekModal from "../../modals/WeekModal";
import { useModal } from "@/src/contexts/ModalContext";
import MonthModal from "../../modals/MonthModal";

export interface QuickSavingValues {
  purpose: string;
  targetAmount: number;
  frequentAmount: number;
  frequency: string;
  duration: string;
  interestRate: number;
}

const SavingGoalLayout = () => {
  const router = useRouter();

  const { setIsWeekOpen, setIsMonthOpen } = useModal();

  const [frequency, setFrequency] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [monthDay, setMonthDay] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    // resolver: yupResolver(quickSavingSchema),
  });

  const onSubmit = (data: QuickSavingValues) => {
    // login(data, {
    //   onSuccess: () => {
    //     reset();
    //     router.push(ROUTES.DASHBOARD.HOME);
    //   },
    // });
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
    <Box px={6} py={10} mt={{ base: 6, lg: "unset" }}>
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
          Saving Goal
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Create a goal, set a deadline, and start saving easily!{" "}
      </StyledText>

      <Box w={{ lg: "65%" }} mx="auto" mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="What are you saving for?"
              placeholder="e.g Rent, Vacation..."
              labelColor="secondary"
              type="text"
              fieldProps={register("purpose")}
              error={errors?.purpose?.message}
              {...commonProps}
            />

            <AmountInput
              label="Target Amount"
              placeholder="Enter target amount"
              labelColor="secondary"
              field={register("targetAmount")}
              error={errors?.targetAmount?.message}
              {...commonProps}
            />

            <AmountInput
              label="Frequent Amount"
              placeholder="Enter frequent amount to add to target"
              labelColor="secondary"
              field={register("frequentAmount")}
              error={errors?.frequentAmount?.message}
              {...commonProps}
            />

            <SelectButtonGroup
              label="Every"
              labelColor="secondary"
              options={["Day", "Week", "Month"]}
              value={frequency}
              error={errors?.frequency?.message}
              onChange={(val) => {
                setFrequency(val);
                setValue("frequency", val);
                if (val === "Week") {
                  setIsWeekOpen(true);
                } else if (val === "Month") {
                  setIsMonthOpen(true);
                }
              }}
            />

            <SelectButtonGroup
              isGrid
              label="For"
              labelColor="secondary"
              options={["6 months", "9 months", "1 year", "Let me choose"]}
              value={frequency}
              error={errors?.frequency?.message}
              onChange={(val) => {
                setFrequency(val);
                setValue("frequency", val);
              }}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Save
            </StyledButton>
          </VStack>

          <WeekModal value={weekDay} onChange={(val) => setWeekDay(val)} />
          <MonthModal value={monthDay} onChange={(val) => setMonthDay(val)} />
        </form>
      </Box>
    </Box>
  );
};

export default SavingGoalLayout;
