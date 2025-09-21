import { Modal, StyledButton, StyledText, StyledField, StyledSelect } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { useSavings } from "@/src/hooks/apis/mutation/dashboard/useSavings";
import useBankInfo from "@/src/hooks/apis/queries/useBankInfo";
import {
  joinGroupSchema,
  JoinGroupValues,
  verifyInviteSchema,
  VerifyInviteValues,
} from "@/src/schema/savings.schema";
import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const JoinGroupModal = () => {
  const { isJoinSavingsOpen, setIsJoinSavingsOpen } = useModal();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const { getBankList, getAccountName } = useBankInfo();

  // ✅ fetch banks
  const {
    data: bankResponse,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["bank-list"],
    queryFn: getBankList,
  });

  const banks: Bank[] = bankResponse?.data ?? [];
  const loading = isPending || isFetching;

  // ✅ Invite code form
  const {
    register: verify,
    handleSubmit: handleVerify,
    formState: { errors: verifyErrors, isSubmitting: isVerifyingCode },
  } = useForm<VerifyInviteValues>({
    resolver: yupResolver(verifyInviteSchema),
  });

  // ✅ Join group form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JoinGroupValues>({
    resolver: yupResolver(joinGroupSchema),
  });

  const { verifyGroupInviteCode, isVerifying, joinSavingGroup, isJoiningGroup } = useSavings();

  const onVerify = (data: VerifyInviteValues) => {
    verifyGroupInviteCode(data, {
      onSuccess: () => {
        setIsCorrect(true);
      },
    });
  };

  const onSubmit = (data: JoinGroupValues) => {
    joinSavingGroup(data, {
      onSuccess: () => {
        setIsJoinSavingsOpen(false);
      },
    });
  };

  const accountNumber = watch("accountNumber");
  const bankCode = watch("bank");

  useEffect(() => {
    const fetchAccountName = async () => {
      if (accountNumber?.length === 10 && bankCode) {
        try {
          const response = await getAccountName({
            accountNumber,
            bankCode,
          });
          setValue("accountName", response.data.account_name);
        } catch (err) {
          console.error("Failed to fetch account name", err);
        }
      }
    };
    fetchAccountName();
  }, [accountNumber, bankCode, getAccountName, setValue]);

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
                label="Account Number"
                placeholder="Enter account number"
                labelColor="secondary"
                fieldProps={register("accountNumber")}
                error={errors?.accountNumber?.message}
                {...commonProps}
              />

              <StyledSelect
                label="Bank"
                labelColor="secondary"
                options={banks.map((bank) => ({
                  label: bank.name,
                  value: bank.code,
                }))}
                disabled={loading || isError}
                fieldProps={register("bank")}
                error={errors?.bank?.message}
              />

              <StyledField
                label="Account Name"
                labelColor="secondary"
                readOnly
                fieldProps={register("accountName")}
                error={errors?.accountName?.message}
                {...commonProps}
              />

              <StyledButton type="submit" w="full" mt={2} loading={isSubmitting || isJoiningGroup}>
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
                fieldProps={verify("groupRefferalCode")}
                error={verifyErrors?.groupRefferalCode?.message}
                {...commonProps}
              />

              <StyledButton type="submit" w="full" mt={2} loading={isVerifyingCode || isVerifying}>
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
