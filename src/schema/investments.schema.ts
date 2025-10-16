import * as Yup from "yup";

export interface CreateInvestmentGroupValues {
  title: string;
  investType?: string;
  investmentId: string;
  investmentTarget: number;
  minimumMemberContribution: number;
  memberLimit?: number | null;
  groupDescription: string;
}


export interface JoinInvestmentGroupValues {
  inviteCode: string;
}


export const createInvestmentGroupSchema: Yup.ObjectSchema<CreateInvestmentGroupValues> =
  Yup.object().shape({
    title: Yup.string()
      .required("Group title is required")
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title is too long"),

    investType: Yup.string()
      .required("Investment type is required")
      .oneOf(["group"], "Investment type must be 'group'"),

    investmentId: Yup.string().required("Investment selection is required"),

    investmentTarget: Yup.number()
      .typeError("Investment target must be a number")
      .required("Investment target is required")
      .positive("Investment target must be greater than zero"),

    minimumMemberContribution: Yup.number()
      .typeError("Minimum contribution must be a number")
      .required("Minimum contribution is required")
      .positive("Minimum contribution must be greater than zero"),

    memberLimit: Yup.number()
      .typeError("Member limit must be a number")
      .integer("Member limit must be a whole number")
      .positive("Member limit must be positive")
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .optional(),

    groupDescription: Yup.string()
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
