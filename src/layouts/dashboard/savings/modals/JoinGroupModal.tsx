import { Modal, StyledButton, StyledText, StyledField, StyledSelect } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";
import { useSavings } from "@/src/hooks/apis/mutation/dashboard/useSavings";
import useBankInfo from "@/src/hooks/apis/queries/useBankInfo";
import { joinGroupSchema, JoinGroupValues } from "@/src/schema/savings.schema";
import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const JoinGroupModal = () => {
  const { isJoinSavingsOpen, setIsJoinSavingsOpen } = useModal();
  const { getBankList, getAccountName } = useBankInfo();
  const { joinSavingGroup, isJoiningGroup, verifyGroupInviteCode, isVerifying } = useSavings();

  const { data: bankResponse, isPending, isFetching, isError } = useQuery({
    queryKey: ["bank-list"],
    queryFn: getBankList,
  });
  const banks: Bank[] = bankResponse?.data.message ?? [];
  const loading = isPending || isFetching;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JoinGroupValues>({
    resolver: yupResolver(joinGroupSchema),
  });

  const accountNumber = watch("accountNumber");
  const bankCode = watch("bank");

  useEffect(() => {
    const fetchAccountName = async () => {
      if (accountNumber?.length === 10 && bankCode) {
        try {
          const response = await getAccountName({ accountNumber, bankCode });
          setValue("accountName", response.data.message.account_name);
        } catch (err) {
          console.error("Failed to fetch account name", err);
        }
      }
    };
    fetchAccountName();
  }, [accountNumber, bankCode, getAccountName, setValue]);

  const onSubmit = async (data: JoinGroupValues) => {
    try {
      // First verify the invite code
      await verifyGroupInviteCode({ groupRefferalCode: data.groupRefferalCode });
      // Then join the group
      joinSavingGroup(data, {
        onSuccess: () => {
          setIsJoinSavingsOpen(false);
        },
      });
    } catch (err) {
      console.error("Verification or joining failed", err);
    }
  };

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: { outlineWidth: "2px", border: "none" },
  };

  return (
    <Modal
      isOpen={isJoinSavingsOpen}
      onClose={() => setIsJoinSavingsOpen(false)}
      maxWidth={{ md: "395px" }}
    >
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
              label="Referral / Invite Code"
              placeholder="eg. Ref/2098Bvk"
              labelColor="secondary"
              fieldProps={register("groupRefferalCode")}
              error={errors?.groupRefferalCode?.message}
              {...commonProps}
            />

            <StyledField
              label="Recipient Code"
              placeholder="Enter recipient code"
              labelColor="secondary"
              fieldProps={register("recipientCode")}
              error={errors?.recipientCode?.message}
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

            <StyledSelect
              label="Bank"
              labelColor="secondary"
              options={banks.map((bank) => ({ label: bank.name, value: bank.code }))}
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

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting || isJoiningGroup || isVerifying}>
              Join Group
            </StyledButton>
          </VStack>
        </form>
      </VStack>
    </Modal>
  );
};

export default JoinGroupModal;