import { Modal, StyledButton, StyledText, StyledField } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import {
  joinGroupStepOneSchema,
  JoinGroupStepOneValues,
  joinGroupStepTwoSchema,
  JoinGroupStepTwoValues,
} from "@/src/schema/savings.schema";
import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
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
  } = useForm<JoinGroupStepOneValues>({
    resolver: yupResolver(joinGroupStepOneSchema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    // reset,
    formState: { errors: errors2, isSubmitting: isSubmitting2 },
  } = useForm<JoinGroupStepTwoValues>({
    resolver: yupResolver(joinGroupStepTwoSchema),
  });

  const onSubmit = (data: JoinGroupStepOneValues) => {
    console.log(data);
    setIsCorrect(true);
  };

  const onSubmit2 = (data: JoinGroupStepTwoValues) => {
    console.log(data);
    setIsCorrect(true);
    setIsJoinSavingsOpen(false);
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
      {isCorrect ? (
        <VStack align="stretch" spaceY={6}>
          <StyledText fontSize={{ base: "md", md: "lg" }} color="secondary">
            Secure Your Payout And Provide Your Account Details{" "}
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} color="bfgrey">
            Your account details are required to ensure your funds are securely transferred to your
            preferred bank account. Please provide accurate information to avoid delays or failed
            transactions.
          </StyledText>

          <form onSubmit={handleSubmit2(onSubmit2)}>
            <VStack spaceY={8} align="stretch">
              <StyledField
                label="Account Name"
                placeholder="Enter account name"
                labelColor="secondary"
                fieldProps={register2("accountName")}
                error={errors2?.accountName?.message}
                {...commonProps}
              />

              <StyledField
                label="Account Number"
                placeholder="Enter account number"
                labelColor="secondary"
                fieldProps={register2("accountNumber")}
                error={errors2?.accountNumber?.message}
                {...commonProps}
              />

              <StyledField
                label="Bank"
                placeholder="Select bank"
                labelColor="secondary"
                fieldProps={register2("bank")}
                error={errors2?.bank?.message}
                {...commonProps}
              />

              <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
                Join Group
              </StyledButton>
            </VStack>
          </form>
        </VStack>
      ) : (
        <VStack align="stretch" spaceY={6}>
          <StyledText fontSize={{ base: "md", md: "lg" }} color="secondary">
            Join Education Savings Group
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} color="bfgrey">
            Save collectively with others for tuition, certifications, and educational goals. By
            joining, you contribute toward making education more affordable and achievable for
            everyone. Note: Early withdrawals will incur a 5% breaking fee. To avoid charges, ensure
            you complete the savings duration.
          </StyledText>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spaceY={8} align="stretch">
              <StyledField
                label="Enter Referral / invite code"
                placeholder="eg. Ref/2098Bvk"
                labelColor="secondary"
                fieldProps={register("inviteCode")}
                error={errors?.inviteCode?.message}
                {...commonProps}
              />

              <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
                Next
              </StyledButton>
            </VStack>
          </form>
        </VStack>
      )}
    </Modal>
  );
};

export default JoinGroupModal;
