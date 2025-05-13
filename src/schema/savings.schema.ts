import * as Yup from "yup";

export const quickSavingSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").min(1000),
});

export type QuickSavingValues = Yup.InferType<typeof quickSavingSchema>;
