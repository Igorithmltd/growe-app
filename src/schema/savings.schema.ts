import * as Yup from "yup";
import { MAX_FILE_SIZE } from "../utils/constants";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

export interface SavingsGoalValues {
  title: string;
  savingType: string;
  targetAmount: number;
  paymentInterval: "daily" | "weekly" | "monthly" | "once" | null;
  duration: string;
  interestRate: number;
  weeklyPaymentDay?: string;
  monthlyPaymentDay?: number;
}

export interface CreateGroupValues {
  title: string;
  savingType: "group" | "personal";
  targetAmount: number;
  paymentInterval: "daily" | "weekly" | "monthly" | "once";
  weeklyPaymentDay?: string
  monthlyPaymentDay?: number;
  duration: string;
  interestRate?: number;
  groupRefferalCode?: string;
  memberLimit?: number;
  groupImage?: {
    imageUrl: string;
    publicId: string;
  };
  groupDescription?: string;
}

export interface EditGroupValues {
  title?: string;
  description?: string;
}

export interface VerifyInviteValues {
  inviteCode: string;
}

export interface JoinGroupValues {
  accountName: string;
  accountNumber: string;
  bank: string;
}

export interface BreakSavings {
  savingId: string;
}

export const savingsGoalSchemaWithoutType = Yup.object({
  title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),

  savingType: Yup.string()
    .oneOf(["group", "personal"], "Invalid saving type")
    .required("Saving type is required"),

  targetAmount: Yup.number()
    .typeError("Target amount must be a number")
    .positive("Target amount must be greater than zero")
    .required("Target amount is required"),

  paymentInterval: Yup.mixed<"daily" | "weekly" | "monthly" | "once">()
    .oneOf(["daily", "weekly", "monthly", "once"], "Invalid payment interval")
    .nullable()
    .required("Payment interval is required"),

  duration: Yup.string().required("Duration is required"),

  interestRate: Yup.number()
    .typeError("Interest rate must be a number")
    .min(0, "Interest rate cannot be negative")
    .required("Interest rate is required"),

  weeklyPaymentDay: Yup.string().notRequired(),

  monthlyPaymentDay: Yup.number()
    .min(1, "Day must be at least 1")
    .max(31, "Day must be at most 31")
    .notRequired(),
});

export const savingsGoalSchema: Yup.ObjectSchema<SavingsGoalValues> =
  savingsGoalSchemaWithoutType as Yup.ObjectSchema<SavingsGoalValues>;

const schemaWithoutType = Yup.object({
  title: Yup.string().required("Title is required"),
  savingType: Yup.mixed<"group" | "personal">()
    .oneOf(["group", "personal"], "Invalid saving type")
    .required("Saving type is required"),
  targetAmount: Yup.number().required("Target amount is required"),
  paymentInterval: Yup.mixed<"daily" | "weekly" | "monthly" | "once">()
    .oneOf(["daily", "weekly", "monthly", "once"], "Invalid payment interval")
    .required("Payment interval is required"),

  weeklyPaymentDay: Yup.string().notRequired(),

  monthlyPaymentDay: Yup.number().notRequired(),
  duration: Yup.string().required("Duration is required"),
  interestRate: Yup.number().notRequired(),
  groupRefferalCode: Yup.string().notRequired(),
  memberLimit: Yup.number().notRequired(),

  groupImage: Yup.mixed()
    .required("Group image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || !(value instanceof File)) return false;
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "Image must be less than 2MB", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= MAX_FILE_SIZE;
    }),

  groupDescription: Yup.string().notRequired(),
});

export const createGroupSchema: Yup.ObjectSchema<CreateGroupValues> =
  schemaWithoutType as Yup.ObjectSchema<CreateGroupValues>;

export const quickSavingSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").min(1000, "Minimum ammount is ₦1000"),
});

export const editGroupSchema: Yup.ObjectSchema<EditGroupValues> = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
});

export const verifyInviteSchema = Yup.object({
  inviteCode: Yup.string().required("Referral or invite code is required"),
});

export const joinGroupSchema = Yup.object({
  accountName: Yup.string().required("Account name is required"),
  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^\d{10}$/, "Account number must be 10 digits"),
  bank: Yup.string().required("Bank is required"),
});

export type QuickSavingValues = Yup.InferType<typeof quickSavingSchema>;
