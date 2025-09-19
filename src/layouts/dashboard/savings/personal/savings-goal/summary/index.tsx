import { TargetMark } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";
import { useSavings } from "@/src/hooks/apis/mutation/dashboard/useSavings";
import { SavingsGoalValues } from "@/src/schema/savings.schema";
import {
  calculateFutureAmount,
  calculateMaturityDate,
  capitalizeFirst,
  getOrdinalSuffix,
} from "@/src/utils/helpers";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SummaryLayout = ({ data }: { data: SavingsGoalValues }) => {
  const router = useRouter();

  const { setIsInfoOpen } = useModal();

  let frequency: string;

  switch (data.paymentInterval) {
    case "daily":
      frequency = "Daily";
      break;
    case "weekly":
      frequency = data.weeklyPaymentDay
        ? `Every ${capitalizeFirst(data.weeklyPaymentDay)}`
        : "Weekly";
      break;
    case "monthly":
      frequency = data.monthlyPaymentDay
        ? `Every ${data.monthlyPaymentDay}${getOrdinalSuffix(data.monthlyPaymentDay)}`
        : "Monthly";
      break;
    case "once":
      frequency = "Just this once";
      break;
    default:
      frequency = "N/A";
  }

  const formData = [
    { label: "Title", value: data.title },
    { label: "Target Amount", value: `${data.targetAmount.toLocaleString()}` },
    { label: "Interest Rate", value: `${data.interestRate}% p.a` },
    { label: "Maturity Date", value: calculateMaturityDate(data.duration) },
    { label: "Saving Frequency", value: frequency },
    {
      label: "Estimated Future Amount",
      value: `${calculateFutureAmount(data.targetAmount, data.duration, data.interestRate).toLocaleString()}`,
    },
  ];

  const { createSavingsGoal, isCreatingGoal } = useSavings();

  const onSubmit = () => {
    const payload = {
      ...data,
      weeklyPaymentDay: data.weeklyPaymentDay?.toLowerCase(),
    };

    createSavingsGoal(payload, {
      onSuccess: () => {
        setIsInfoOpen(true);
      },
    });
  };

  return (
    <Box>
      <VStack align="stretch" spaceY="2" mt={12}>
        {formData.map(({ label, value }, index) => (
          <HStack justify="space-between" key={label}>
            <StyledText
              mt={6}
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="normal"
              color="bfgrey"
            >
              {label}
            </StyledText>

            <StyledText
              mt={6}
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="normal"
              color={index === formData.length - 1 ? "primary" : "secondary"}
            >
              {value}
            </StyledText>
          </HStack>
        ))}
      </VStack>
      <StyledButton
        type="button"
        w="full"
        mt={14}
        loading={isCreatingGoal}
        onClick={() => onSubmit()}
      >
        Submit
      </StyledButton>

      <InfoModal
        message="Congratulations! 🎉 Your Goal is Set"
        hasButton={true}
        buttonText={"Go back to Savings"}
        onButtonClick={() => router.push("/savings")}
        icon={<TargetMark />}
      />
    </Box>
  );
};

export default SummaryLayout;
