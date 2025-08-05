"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import {
  StyledField,
  StyledButton,
  StyledText,
  SelectButtonGroup,
  StyledCheckbox,
} from "@/src/components";
import { useRouter } from "next/navigation";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon } from "@/public/svgs";
import { useState } from "react";
import WeekModal from "../../modals/WeekModal";
import { useModal } from "@/src/contexts/ModalContext";
import MonthModal from "../../modals/MonthModal";
import SummaryLayout from "./summary";
import CalendarModal from "../../modals/CalenderModal";
import { savingsGoalSchema, SavingsGoalValues } from "@/src/schema/savings.schema";
import { useSavings } from "@/src/hooks/apis/mutation/dashboard/useSavings";

const SavingGoalLayout = () => {
  const router = useRouter();
  const { createSavingsGoal } = useSavings();

  const { setIsWeekOpen, setIsMonthOpen, setIsCalendarOpen } = useModal();

  const [frequency, setFrequency] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [monthDay, setMonthDay] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isOnce, setIsOnce] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SavingsGoalValues>({
    resolver: yupResolver(savingsGoalSchema),
  });

  const onSubmit = (data: SavingsGoalValues) => {
    const payload = {
      ...data,
      savingType: "goal",
      frequentAmount: 20000,
    };

    createSavingsGoal(payload, {
      onSuccess: () => {
        reset();
      },
    });
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
    if (isCompleted) {
      setIsCompleted(false);
    } else {
      router.back();
    }
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          {isCompleted ? "Summary" : "Saving Goal"}
        </StyledText>
      </Box>

      {isCompleted ? (
        <SummaryLayout />
      ) : (
        <>
          <StyledText
            mt={6}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontWeight="normal"
            color="bfgrey"
          >
            Create a goal, set a deadline, and start saving easily!
          </StyledText>

          <Box mt={14}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spaceY={4} align="stretch">
                <StyledField
                  label="What are you saving for?"
                  placeholder="e.g Rent, Vacation..."
                  labelColor="secondary"
                  type="text"
                  fieldProps={register("title")}
                  error={errors?.title?.message}
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

                <StyledCheckbox
                  label="Just this once"
                  checked={isOnce}
                  onChange={() => {
                    setIsOnce((prev) => !prev);
                    setValue("frequentTime", undefined);
                  }}
                />

                {!isOnce && (
                  <SelectButtonGroup
                    label="Every"
                    labelColor="secondary"
                    options={["Day", "Week", "Month"]}
                    value={frequency}
                    error={errors?.frequentTime?.message}
                    onChange={(val) => {
                      setFrequency(val);
                      setValue("frequentTime", val);
                      if (val === "Week") setIsWeekOpen(true);
                      if (val === "Month") setIsMonthOpen(true);
                    }}
                  />
                )}

                <SelectButtonGroup
                  isGrid
                  label="For"
                  labelColor="secondary"
                  options={["6 months", "9 months", "1 year", "Let me choose"]}
                  value={frequency}
                  error={errors?.frequencyDuration?.message}
                  onChange={(val) => {
                    setFrequency(val);
                    setValue("frequencyDuration", val);
                    if (val === "Let me choose") setIsCalendarOpen(true);
                  }}
                />

                {/* <StyledField
                  label="Interest Rate"
                  labelColor="secondary"
                  type="text"
                  readOnly
                  fieldProps={register("interestRate")}
                  error={errors?.interestRate?.message}
                  {...commonProps}
                /> */}

                <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
                  Save
                </StyledButton>
              </VStack>

              <WeekModal
                value={weekDay}
                onChange={(val) => {
                  setWeekDay(val);
                  setValue("dayToBePaid", val as SavingsGoalValues["dayToBePaid"]);
                }}
              />

              <MonthModal
                value={monthDay}
                onChange={(val) => {
                  setMonthDay(val);
                  setValue("dayToBePaid", val as SavingsGoalValues["dayToBePaid"]);
                }}
              />

              <CalendarModal
                selectedDate={calendarDate}
                onSelect={(date) => {
                  setCalendarDate(date);
                  setValue("frequencyDuration", date?.toISOString() ?? "");
                }}
                onClear={() => setCalendarDate(undefined)}
              />
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SavingGoalLayout;
