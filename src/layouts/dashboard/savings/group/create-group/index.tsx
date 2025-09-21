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
import { BackIcon, GroupMark } from "@/public/svgs";
import { useEffect, useState } from "react";
import WeekModal from "../../modals/WeekModal";
import { useModal } from "@/src/contexts/ModalContext";
import MonthModal from "../../modals/MonthModal";
import InfoModal from "@/src/components/modals/InfoModal";
import ImageUploadField from "@/src/components/image-upload";
import { createGroupSchema, CreateGroupValues } from "@/src/schema/savings.schema";
import { useSavings } from "@/src/hooks/apis/mutation/dashboard/useSavings";
import useDuration from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";
import { useUploadImages } from "@/src/hooks/apis/mutation/dashboard/useFileUpload";

const CreateGroupLayout = () => {
  const router = useRouter();
  const { createSavingGroup, isCreatingGroup } = useSavings();
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadImages();
  const { setIsWeekOpen, setIsMonthOpen, setIsInfoOpen } = useModal();

  const [frequency, setFrequency] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [monthDay, setMonthDay] = useState("");
  const [isOnce, setIsOnce] = useState<boolean>(false);

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
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupValues>({
    resolver: yupResolver(createGroupSchema),
    defaultValues: {
      duration: "6 months",
      interestRate: 10,
      savingType: "group",
    },
  });

  const durationWatch = watch("duration");
  useEffect(() => {
    if (durationWatch && durations.length > 0) {
      const selected = durations.find((d) => d._id === durationWatch);
      if (selected) {
        setValue("interestRate", selected.interestPercentage);
      }
    }
  }, [durationWatch, durations, setValue]);

  const onSubmit = async (data: CreateGroupValues) => {
    if (!data.image) {
      throw new Error("Image is required");
    }

    const uploadResponse = await uploadImages({ file: data.image });

    const payload = {
      ...data,
      savingType: "group" as const,
      weeklyPaymentDay: data.weeklyPaymentDay?.toLowerCase(),
      groupImage: {
        imageUrl: uploadResponse.data.imageUrl,
        publicId: uploadResponse.data.publicId,
      },
    };

    createSavingGroup(payload, {
      onSuccess: () => {
        setIsInfoOpen(true);
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
    router.back();
  };

  console.log("errors", errors);

  return (
    <Box px={2} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
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

            <StyledField
              label="Description (optional)"
              placeholder="e.g Rent, Vacation..."
              labelColor="secondary"
              type="text"
              isTextarea
              fieldProps={register("groupDescription")}
              error={errors?.groupDescription?.message}
              {...commonProps}
            />

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
                  setValue("paymentInterval", null as any);
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
                    setValue("weeklyPaymentDay", undefined);
                    setIsWeekOpen(true);
                  }

                  if (val === "monthly") {
                    setWeekDay("");
                    setValue("weeklyPaymentDay", undefined);
                    setValue("monthlyPaymentDay", undefined);
                    setIsMonthOpen(true);
                  }

                  if (val === "daily") {
                    setWeekDay("");
                    setMonthDay("");
                    setValue("weeklyPaymentDay", undefined);
                    setValue("monthlyPaymentDay", undefined);
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

            <StyledField
              label="Members Limit (optional)"
              placeholder="e.g 2, 3, 50..."
              labelColor="secondary"
              type="number"
              fieldProps={register("memberLimit")}
              error={errors?.memberLimit?.message}
              {...commonProps}
            />

            <ImageUploadField
              fieldProps={register("image")}
              error={errors?.image?.message as string}
              label="Group savings photo"
              isUploading={isUploading}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting || isCreatingGroup}>
              Create Group
            </StyledButton>
          </VStack>

          <WeekModal
            value={weekDay}
            onChange={(val) => {
              setWeekDay(val);
              setValue("weeklyPaymentDay", val as CreateGroupValues["weeklyPaymentDay"]);
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
      <InfoModal
        message="Congratulations! 🎉 Your Savings Group Has Been Created!"
        hasButton={true}
        buttonText={"Go back to savings"}
        onButtonClick={() => router.push("/savings")}
        icon={<GroupMark />}
      />
    </Box>
  );
};

export default CreateGroupLayout;
