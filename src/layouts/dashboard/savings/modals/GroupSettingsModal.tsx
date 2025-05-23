import { Modal, StyledButton, StyledText, StyledField } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { QuickSavingValues } from "@/src/schema/savings.schema";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const JoinGroupModal = () => {
  const { isJoinSavingsOpen, setIsJoinSavingsOpen } = useModal();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    //   resolver: yupResolver(quickSavingSchema),
  });

  const onSubmit = (data: QuickSavingValues) => {
    console.log(data);
    setIsCorrect(true);
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
    <Modal
      isOpen={isJoinSavingsOpen}
      onClose={() => setIsJoinSavingsOpen(false)}
      maxWidth={{ md: "395px" }}
    >
      <VStack align="stretch" spaceY={6}>
        <StyledText fontSize={{ base: "md", md: "lg" }} color="secondary">
          Update Group Savings Title
        </StyledText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={8} align="stretch">
            <StyledField
              label="Title"
              placeholder="Educational Savings Group"
              labelColor="secondary"
              fieldProps={register("amount")}
              error={errors?.amount?.message}
              {...commonProps}
            />

            <StyledField
              label="Description (optional)"
              placeholder="Enter few Words about the savings"
              labelColor="secondary"
              fieldProps={register("amount")}
              error={errors?.amount?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Save changes
            </StyledButton>
          </VStack>
        </form>
      </VStack>
    </Modal>
  );
};

export default JoinGroupModal;
