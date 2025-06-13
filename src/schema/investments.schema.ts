import * as Yup from "yup";

export interface CreateInvestmentGroupValues {
  groupName: string;
  investment: string;
  targetAmount: number;
  minContribution: number;
  membersLimit?: number | null;
  description: string;
}

export interface JoinInvestmentGroupValues {
  inviteCode: string;
}

export const createInvestmentGroupSchema: Yup.ObjectSchema<CreateInvestmentGroupValues> =
  Yup.object().shape({
    groupName: Yup.string()
      .required("Group name is required")
      .min(2, "Group name must be at least 2 characters")
      .max(100, "Group name is too long"),

    investment: Yup.string().required("Investment selection is required"),

    targetAmount: Yup.number()
      .typeError("Target amount must be a number")
      .required("Target amount is required")
      .positive("Target amount must be greater than zero"),

    minContribution: Yup.number()
      .typeError("Minimum contribution must be a number")
      .required("Minimum contribution is required")
      .positive("Minimum contribution must be greater than zero"),

    membersLimit: Yup.number()
      .typeError("Members limit must be a number")
      .integer("Members limit must be a whole number")
      .positive("Members limit must be positive")
      .nullable()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .optional(),

    description: Yup.string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
  });

export const joinInvestmentGroupSchema: Yup.ObjectSchema<JoinInvestmentGroupValues> =
  Yup.object().shape({
    inviteCode: Yup.string()
      .required()
      .matches(/^([a-zA-Z0-9/_-]*)$/, "Referral code contains invalid characters")
      .max(50, "Referral code must be less than 50 characters"),
  });
