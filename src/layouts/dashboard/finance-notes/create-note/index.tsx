/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Box, HStack, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsTag } from "react-icons/bs";
import { LiaCalendarWeekSolid } from "react-icons/lia";

import {
  StyledField,
  StyledButton,
  StyledText,
  SelectInputBox,
  SelectOptionModal,
} from "@/src/components";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, GroupMark } from "@/public/svgs";
import { useModal } from "@/src/contexts/ModalContext";
import CalendarModal from "../../savings/modals/CalenderModal";
import InfoModal from "@/src/components/modals/InfoModal";
import TagsModal from "../modal/TagsModal";
import { createNoteSchema, CreateNoteValues } from "@/src/schema/finance-notes.schema";
import { useFinanceNotes } from "@/src/hooks/apis/mutation/dashboard/useFinanceNotes";

const categoryOptions = ["Personal Savings", "Group Savings", "Goals", "Investments"];

const CreateNoteLayout = () => {
  const router = useRouter();
  const { createFinanceNote, isCreatingNote } = useFinanceNotes();

  const { setIsCalendarOpen, setIsInfoOpen, setIsSelectOpen, setIsTagsOpen } = useModal();

  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateNoteValues>({
    resolver: yupResolver(createNoteSchema),
  });

  const onSubmit = (data: CreateNoteValues) => {
    createFinanceNote(data, {
      onSuccess: () => {
        setIsInfoOpen(true);
        reset(); // Clear the form
      },
    });
  };

  const handleCategorySelect = (category: string) => {
    setValue("category", category);
    setIsSelectOpen(false);
  };

  const selectedCategory = watch("category");

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
              fieldProps={register("title")}
              error={errors?.title?.message}
              {...commonProps}
            />

            <SelectInputBox
              label="What is the category?"
              value={selectedCategory}
              placeholder="Choose a category"
              error={errors?.category?.message}
              onClick={() => setIsSelectOpen(true)}
            />

            <AmountInput
              label="Amount (optional)"
              placeholder="Enter amount"
              labelColor="secondary"
              field={register("amount")}
              error={errors?.amount?.message}
              {...commonProps}
            />

            <StyledField
              label="Description"
              placeholder="Enter Description"
              labelColor="secondary"
              type="text"
              fieldProps={register("description")}
              error={errors?.description?.message}
              isTextarea
              {...commonProps}
            />

            {/* Uncomment if tag or calendar functionality is to be enabled */}
            {/* 
            <HStack spaceX={4} mt={2} justify="space-between" align="center">
              <StyledButton
                variant="ghost"
                borderRadius="lg"
                border="1px solid #F0F0F0"
                fontWeight="normal"
                color="secondary"
                bg="#F4F4F4"
                onClick={() => setIsTagsOpen(true)}
              >
                <BsTag size="18px" color="#9BAB69" /> Add Tags
              </StyledButton>
              <StyledButton
                variant="ghost"
                borderRadius="lg"
                border="1px solid #F0F0F0"
                fontWeight="normal"
                color="secondary"
                onClick={() => setIsCalendarOpen(true)}
                bg="#F4F4F4"
              >
                <LiaCalendarWeekSolid size="18px" color="#9BAB69" /> Set Reminder
              </StyledButton>
            </HStack>
            */}

            <StyledButton type="submit" w="full" mt={2} loading={isCreatingNote}>
              Save Note
            </StyledButton>
          </VStack>

          <CalendarModal
            selectedDate={calendarDate}
            onSelect={(date) => setCalendarDate(date)}
            onClear={() => setCalendarDate(undefined)}
          />

          <TagsModal value={selectedTag} onChange={(val) => setSelectedTag(val)} />

          <SelectOptionModal
            options={categoryOptions}
            onSelect={handleCategorySelect}
            getKey={(option) => option}
            render={(option, isSelected) => (
              <HStack align="center" justify="space-between">
                <StyledText
                  fontWeight={isSelected ? "bold" : "normal"}
                  fontSize={{ base: "sm", md: "md" }}
                  color={isSelected ? "primary" : "secondary"}
                >
                  {option}
                </StyledText>
              </HStack>
            )}
          />
        </form>
      </Box>

      <InfoModal
        message="Congratulations! 🎉 Your Finance Note Has Been Created!"
        hasButton={true}
        buttonText={"Go back to notes"}
        icon={<GroupMark />}
      />
    </Box>
  );
};

export default CreateNoteLayout;
