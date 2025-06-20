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
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, GroupMark } from "@/public/svgs";
import { useState } from "react";
import { useModal } from "@/src/contexts/ModalContext";

import InfoModal from "@/src/components/modals/InfoModal";
import { createGroupSchema, CreateGroupValues } from "@/src/schema/savings.schema";
import CalendarModal from "../../savings/modals/CalenderModal";

const CreateNoteLayout = () => {
  const router = useRouter();

  const { setIsCalendarOpen, setIsInfoOpen } = useModal();

  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupValues>({
    resolver: yupResolver(createGroupSchema),
  });

  const onSubmit = (data: CreateGroupValues) => {
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
          Create New Note
        </StyledText>
      </Box>

      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="What’s the title of your note?"
              placeholder="Enter your note title"
              labelColor="secondary"
              type="text"
              fieldProps={register("purpose")}
              error={errors?.purpose?.message}
              {...commonProps}
            />

            <AmountInput
              label="Amount (optional)"
              placeholder="Enter amount"
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

            {/* <SelectButtonGroup
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
            /> */}

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Save Note
            </StyledButton>
          </VStack>

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

export default CreateNoteLayout;
