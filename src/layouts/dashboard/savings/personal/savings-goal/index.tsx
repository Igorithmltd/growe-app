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
  StyledSelect,
} from "@/src/components";
import { useRouter } from "next/navigation";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon } from "@/public/svgs";
import { useEffect, useState } from "react";
import WeekModal from "../../modals/WeekModal";
import { useModal } from "@/src/contexts/ModalContext";
import MonthModal from "../../modals/MonthModal";
import SummaryLayout from "./summary";
import { savingsGoalSchema, SavingsGoalValues } from "@/src/schema/savings.schema";
import useDuration from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";

const SavingGoalLayout = () => {
  const router = useRouter();
  const { setIsWeekOpen, setIsMonthOpen } = useModal();

  const [frequency, setFrequency] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [monthDay, setMonthDay] = useState("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isOnce, setIsOnce] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<SavingsGoalValues | null>(null);

  const { getSavingDurations } = useDuration();

  const {
    data: durationResponse,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["saving-durations"],
    queryFn: getSavingDurations,
  });

  const durations: Duration[] = durationResponse?.data?.message ?? [];
  const loading = isPending || isFetching;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SavingsGoalValues>({
    resolver: yupResolver(savingsGoalSchema),
    defaultValues: {
      duration: "6 months",
      interestRate: 10,
      savingType: "personal",
    },
  });

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  const selectProps = {
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

  const durationWatch = watch("duration");
  useEffect(() => {
    if (durationWatch && durations.length > 0) {
      const selected = durations.find((d) => d._id === durationWatch);
      if (selected) {
        setValue("interestRate", selected.interestPercentage);
      }
    }
  }, [durationWatch, durations, setValue]);

  const onSubmit = (values: SavingsGoalValues) => {
    setSummaryData(values);
    setIsCompleted(true);
  };

  console.log(errors);

  return (
    <Box px={2} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          {isCompleted ? "Summary" : "Saving Goal"}
        </StyledText>
      </Box>

      {isCompleted ? (
        <SummaryLayout data={summaryData as SavingsGoalValues} />
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

                {/* Just once checkbox */}
                <StyledCheckbox
                  label="Just this once"
                  checked={isOnce}
                  onChange={() => {
                    const newVal = !isOnce;
                    setIsOnce(newVal);
                    if (newVal) {
                      setFrequency("");
                      setWeekDay("");
                      setMonthDay("");
                      setValue("paymentInterval", "once");
                      setValue("weeklyPaymentDay", undefined);
                      setValue("monthlyPaymentDay", undefined);
                    } else {
                      setValue("paymentInterval", null);
                    }
                  }}
                />

                {!isOnce && (
                  <SelectButtonGroup
                    label="Every"
                    labelColor="secondary"
                    options={["daily", "weekly", "monthly"]}
                    value={frequency}
                    error={errors?.paymentInterval?.message}
                    onChange={(val) => {
                      setFrequency(val);
                      setValue("paymentInterval", val as any);

                      if (val === "weekly") {
                        setMonthDay("");
                        setValue("monthlyPaymentDay", undefined);
                        setIsOnce(false);
                        setValue("weeklyPaymentDay", undefined);
                        setIsWeekOpen(true);
                      }

                      if (val === "monthly") {
                        setWeekDay("");
                        setValue("weeklyPaymentDay", undefined);
                        setIsOnce(false);
                        setValue("monthlyPaymentDay", undefined);
                        setIsMonthOpen(true);
                      }

                      if (val === "daily") {
                        setWeekDay("");
                        setMonthDay("");
                        setValue("weeklyPaymentDay", undefined);
                        setValue("monthlyPaymentDay", undefined);
                        setIsOnce(false);
                      }
                    }}
                  />
                )}

                <StyledSelect
                  label="Duration"
                  labelColor="secondary"
                  options={durations.map((d) => ({
                    label: d.duration,
                    value: d._id,
                  }))}
                  disabled={loading || isError}
                  fieldProps={register("duration")}
                  error={errors?.duration?.message}
                  {...selectProps}
                />

                <StyledField
                  label="Interest Rate (%)"
                  labelColor="secondary"
                  type="text"
                  readOnly
                  fieldProps={register("interestRate")}
                  error={errors?.interestRate?.message}
                  {...commonProps}
                />

                <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
                  Save
                </StyledButton>
              </VStack>

              <WeekModal
                value={weekDay}
                onChange={(val) => {
                  setWeekDay(val);
                  setValue("weeklyPaymentDay", val as SavingsGoalValues["weeklyPaymentDay"]);
                }}
              />

              <MonthModal
                value={monthDay}
                onChange={(val) => {
                  setMonthDay(val);
                  setValue("monthlyPaymentDay", Number(val));
                }}
              />
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SavingGoalLayout;
