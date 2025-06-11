import * as Yup from "yup";

export const quickSavingSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").min(1000, "Minimum ammount is ₦1000"),
});

export const savingsGoalSchema = Yup.object().shape({
  purpose: Yup.string().required("Purpose is required"),
  targetAmount: Yup.number().required("Target amount is required"),
  frequentAmount: Yup.number()
    .required("Frequent amount is required")
    .min(1000, "Minimum ammount is ₦1000"),
  frequency: Yup.string().required("Payment frequency is required"),
  duration: Yup.string().required("Goal duration is required"),
  interestRate: Yup.string().required("Interest Rate must be generated"),
});

export type SavingsGoalValues = Yup.InferType<typeof savingsGoalSchema>;
export type QuickSavingValues = Yup.InferType<typeof quickSavingSchema>;
