import { Modal, StyledButton, StyledText, StyledField } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import {
  joinGroupSchema,
  JoinGroupValues,
  verifyInviteSchema,
  VerifyInviteValues,
} from "@/src/schema/savings.schema";
import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const JoinGroupModal = () => {
  const { isJoinSavingsOpen, setIsJoinSavingsOpen } = useModal();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const {
    register: verify,
    handleSubmit: handleVerify,
    // reset,
    formState: { errors: verifyErrors, isSubmitting: isVerifying },
  } = useForm<VerifyInviteValues>({
    resolver: yupResolver(verifyInviteSchema),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinGroupValues>({
    resolver: yupResolver(joinGroupSchema),
  });

  const onVerify = (data: VerifyInviteValues) => {
    console.log(data);
    setIsCorrect(true);
  };

  const onSubmit = (data: JoinGroupValues) => {
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spaceY={8} align="stretch">
              <StyledField
                label="Account Name"
                placeholder="Enter account name"
                labelColor="secondary"
                fieldProps={register("accountName")}
                error={errors?.accountName?.message}
                {...commonProps}
              />

              <StyledField
                label="Account Number"
                placeholder="Enter account number"
                labelColor="secondary"
                fieldProps={register("accountNumber")}
                error={errors?.accountNumber?.message}
                {...commonProps}
              />

              <StyledField
                label="Bank"
                placeholder="Select bank"
                labelColor="secondary"
                fieldProps={register("bank")}
                error={errors?.bank?.message}
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

          <form onSubmit={handleVerify(onVerify)}>
            <VStack spaceY={8} align="stretch">
              <StyledField
                label="Enter Referral / invite code"
                placeholder="eg. Ref/2098Bvk"
                labelColor="secondary"
                fieldProps={verify("inviteCode")}
                error={verifyErrors?.inviteCode?.message}
                {...commonProps}
              />

              <StyledButton type="submit" w="full" mt={2} loading={isVerifying}>
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
