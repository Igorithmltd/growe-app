"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
//
import {
  StyledField,
  StyledButton,
  StyledText,
  SelectButtonGroup,
  StyledCheckbox,
} from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, GroupMark } from "@/public/svgs";
import { useState } from "react";
import WeekModal from "../../modals/WeekModal";
import { useModal } from "@/src/contexts/ModalContext";
import MonthModal from "../../modals/MonthModal";
import CalendarModal from "../../modals/CalenderModal";
import InfoModal from "@/src/components/modals/InfoModal";

export interface QuickSavingValues {
  purpose: string;
  targetAmount: number;
  frequentAmount: number;
  frequency: string;
  duration: string;
  interestRate: number;
}

const CreateGroupLayout = () => {
  const router = useRouter();

  const { setIsWeekOpen, setIsMonthOpen, setIsCalendarOpen, setIsInfoOpen } = useModal();

  const [frequency, setFrequency] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [monthDay, setMonthDay] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [isOnce, setIsOnce] = useState<boolean>(false);

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
          Create Group
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Make saving fun! Create a public challenge and let everyone join the journey! 🌟
      </StyledText>

      <Box mt={14}>
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
              label="Amount"
              placeholder="Enter target amount"
              labelColor="secondary"
              field={register("targetAmount")}
              error={errors?.targetAmount?.message}
              {...commonProps}
            />

            <StyledField
              label="Description (optional)"
              placeholder="e.g Rent, Vacation..."
              labelColor="secondary"
              type="text"
              fieldProps={register("purpose")}
              error={errors?.purpose?.message}
              {...commonProps}
            />

            <StyledCheckbox
              label="Just this once"
              checked={isOnce}
              onChange={() => setIsOnce((prev) => !prev)}
            />

            {!isOnce && (
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
            )}
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
                if (val === "Let me choose") {
                  setIsCalendarOpen(true);
                }
              }}
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

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Create Group
            </StyledButton>
          </VStack>

          <WeekModal value={weekDay} onChange={(val) => setWeekDay(val)} />
          <MonthModal value={monthDay} onChange={(val) => setMonthDay(val)} />
          <CalendarModal
            selectedDate={calendarDate}
            onSelect={(date) => setCalendarDate(date)}
            onClear={() => setCalendarDate(undefined)}
          />
        </form>
      </Box>
      <InfoModal
        message="Congratulations! 🎉 Your Group Savings Has Been Created!"
        hasButton={true}
        buttonText={"Go back to savings"}
        icon={<GroupMark />}
      />
    </Box>
  );
};

export default CreateGroupLayout;
