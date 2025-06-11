import * as Yup from "yup";

export interface SavingsGoalValues {
  purpose: string;
  targetAmount: number;
  frequentAmount?: number;
  frequency?: string;
  duration: string;
  interestRate: string;
  // isOnce?: boolean | null;
}

export interface CreateGroupValues {
  purpose: string;
  targetAmount: number;
  frequentAmount?: number;
  frequency?: string;
  duration: string;
  interestRate: string;
  membersLimit?: number | null;
  groupPhoto?: File | null;
  // isOnce?: boolean | null;
}

export interface EditGroupValues {
  title?: string;
  description?: string;
}

export interface JoinGroupStepOneValues {
  inviteCode: string;
}

export interface JoinGroupStepTwoValues {
  accountName: string;
  accountNumber: string;
  bank: string;
}

export const quickSavingSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").min(1000, "Minimum ammount is ₦1000"),
});

export const savingsGoalSchema: Yup.ObjectSchema<SavingsGoalValues> = Yup.object().shape({
  purpose: Yup.string().required("Purpose is required"),
  targetAmount: Yup.number().required("Target amount is required"),
  frequentAmount: Yup.number().when("isOnce", {
    is: false,
    then: (schema) =>
      schema.required("Frequent amount is required").min(1000, "Minimum amount is ₦1000"),
    otherwise: (schema) => schema.notRequired(),
  }),
  frequency: Yup.string().required("Payment frequency is required"),
  duration: Yup.string().required("Goal duration is required"),
  interestRate: Yup.string().required("Interest Rate must be generated"),
});

export const createGroupSchema: Yup.ObjectSchema<CreateGroupValues> = Yup.object().shape({
  purpose: Yup.string().required("Purpose is required"),
  targetAmount: Yup.number().required("Target amount is required"),
  frequentAmount: Yup.number().when("isOnce", {
    is: false,
    then: (schema) =>
      schema.required("Frequent amount is required").min(1000, "Minimum amount is ₦1000"),
    otherwise: (schema) => schema.notRequired(),
  }),
  frequency: Yup.string().when("isOnce", {
    is: false,
    then: (schema) => schema.required("Payment frequency is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  duration: Yup.string().required("Goal duration is required"),
  interestRate: Yup.string().required("Interest rate is required"),
  membersLimit: Yup.number().nullable().notRequired(),
  groupPhoto: Yup.mixed<File>().nullable().notRequired(),
  // isOnce: Yup.boolean().notRequired(),
});

export const editGroupSchema: Yup.ObjectSchema<EditGroupValues> = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
});

export const joinGroupStepOneSchema = Yup.object({
  inviteCode: Yup.string().required("Referral or invite code is required"),
});

export const joinGroupStepTwoSchema = Yup.object({
  accountName: Yup.string().required("Account name is required"),
  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^\d{10}$/, "Account number must be 10 digits"),
  bank: Yup.string().required("Bank is required"),
});

export type QuickSavingValues = Yup.InferType<typeof quickSavingSchema>;
