"use client";

import {
  Modal,
  StyledButton,
  StyledText,
  StyledField,
  SelectInputBox,
  SelectOptionModal,
} from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { createNoteSchema, CreateNoteValues } from "@/src/schema/finance-notes.schema";
import { AmountInput } from "@/src/components/amount-input";
import { useFinanceNotes } from "@/src/hooks/apis/mutation/dashboard/useFinanceNotes";
import { useQueryClient } from "@tanstack/react-query";

const categoryOptions = ["Personal Savings", "Group Savings", "Goals", "Investments"];

const EditNotesModal = ({ note }: { note: any }) => {
  const { isEditNoteOpen, setIsEditNoteOpen, setIsSelectOpen } = useModal();
  const { editFinanceNote, isEditingNote } = useFinanceNotes();

  const queryClient = useQueryClient();

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

  // ✅ PREFILL
  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        description: note.description,
        amount: note.amount,
        category: note.category,
      });
    }
  }, [note, reset]);

  const selectedCategory = watch("category");

  const onSubmit = (data: CreateNoteValues) => {
    if (!note?._id) return;

    editFinanceNote(
      { id: note._id, data },
      {
        onSuccess: () => {
          setIsEditNoteOpen(false);
          queryClient.invalidateQueries({ queryKey: ["all-finance-notes"] });
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isEditNoteOpen}
      onClose={() => setIsEditNoteOpen(false)}
      maxWidth={{ md: "395px" }}
    >
      <VStack spaceY={6}>
        <StyledText>Edit Note</StyledText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4}>
            <StyledField
              label="Title"
              fieldProps={register("title")}
              error={errors?.title?.message}
            />

            <SelectInputBox
              label="Category"
              value={selectedCategory}
              onClick={() => setIsSelectOpen(true)}
            />

            <AmountInput field={register("amount")} />

            <StyledField label="Description" fieldProps={register("description")} isTextarea />

            <StyledButton type="submit" loading={isEditingNote}>
              Save Changes
            </StyledButton>
          </VStack>
        </form>

        <SelectOptionModal
          options={categoryOptions}
          onSelect={(val) => {
            setValue("category", val);
            setIsSelectOpen(false);
          }}
          getKey={(o) => o}
          render={(o) => <StyledText>{o}</StyledText>}
        />
      </VStack>
    </Modal>
  );
};

export default EditNotesModal;
