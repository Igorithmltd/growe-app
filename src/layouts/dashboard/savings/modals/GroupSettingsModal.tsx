import { Modal, StyledButton, StyledText, StyledField } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { editGroupSchema, EditGroupValues } from "@/src/schema/savings.schema";
import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const GroupSettingsModal = () => {
  const { isGroupSettingsOpen, setIsGroupSettingsOpen } = useModal();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<EditGroupValues>({
    resolver: yupResolver(editGroupSchema),
  });

  const onSubmit = (data: EditGroupValues) => {
    console.log(data);
    setIsGroupSettingsOpen(false);
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
      isOpen={isGroupSettingsOpen}
      onClose={() => setIsGroupSettingsOpen(false)}
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
              fieldProps={register("title")} // <-- changed from "amount"
              error={errors?.title?.message}
              {...commonProps}
            />

            <StyledField
              label="Description (optional)"
              placeholder="Enter few Words about the savings"
              labelColor="secondary"
              fieldProps={register("description")} // <-- changed from "amount"
              error={errors?.description?.message}
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

export default GroupSettingsModal;
