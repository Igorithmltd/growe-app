import * as Yup from "yup";
import { MAX_FILE_SIZE } from "../utils/constants";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

type GroupImage = {
  imageUrl: string;
  publicId: string;
};

export interface SavingsGoalValues {
  title: string;
  targetAmount: number;
  frequentAmount?: number;
  frequentTime?: string;
  savingType: string;
  frequencyDuration?: string;
  groupDescription: string;
  dayToBePaid?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  memberLimit?: number;
  groupImage: File;
}

export interface CreateGroupValues {
  title: string;
  targetAmount: number;
  frequentAmount?: number;
  frequentTime?: string;
  savingType: string;
  frequencyDuration?: string;
  groupDescription?: string;
  memberLimit: number;
  groupImage: GroupImage;
  image: File;
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

const schemaWithoutType = Yup.object({
  title: Yup.string().required("Title is required"),
  targetAmount: Yup.number().required("Target amount is required"),

  frequentTime: Yup.string().notRequired(),

  frequencyDuration: Yup.string().notRequired(),
  groupDescription: Yup.string().notRequired(),

  memberLimit: Yup.number().notRequired(),

  image: Yup.mixed()
    .required("Group image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || !(value instanceof File)) return false;
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "Image must be less than 2MB", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= MAX_FILE_SIZE;
    }),
});

const savingsGoalSchemaWithoutType = Yup.object({
  title: Yup.string().required("Title is required"),
  targetAmount: Yup.number().required("Target amount is required"),

  frequentAmount: Yup.number().notRequired(),
  frequentTime: Yup.string().notRequired(),
  frequencyDuration: Yup.string().notRequired(),

  savingType: Yup.string().required("Saving type is required"),
  groupDescription: Yup.string().required("Group description is required"),

  dayToBePaid: Yup.mixed<
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  >()
    .oneOf(
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "Invalid day"
    )
    .notRequired(),

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
});

export const savingsGoalSchema: Yup.ObjectSchema<SavingsGoalValues> =
  savingsGoalSchemaWithoutType as Yup.ObjectSchema<SavingsGoalValues>;

export const quickSavingSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").min(1000, "Minimum ammount is ₦1000"),
});

// export const savingsGoalSchema: Yup.ObjectSchema<SavingsGoalValues> = Yup.object().shape({
//   title: Yup.string().required("Purpose is required"),
//   targetAmount: Yup.number().required("Target amount is required"),
//   frequentAmount: Yup.number().when("isOnce", {
//     is: false,
//     then: (schema) =>
//       schema.required("Frequent amount is required").min(1000, "Minimum amount is ₦1000"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
//   frequency: Yup.string().required("Payment frequency is required"),
//   duration: Yup.string().required("Goal duration is required"),
//   interestRate: Yup.string().required("Interest Rate must be generated"),
// });

export const createGroupSchema: Yup.ObjectSchema<CreateGroupValues> =
  schemaWithoutType as Yup.ObjectSchema<CreateGroupValues>;

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
