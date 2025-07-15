import * as Yup from "yup";
import { phoneRegExp } from "../utils/helpers";

export interface UpdateProfileValues {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface WithdrawalInfoValues {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export const updateProfileSchema: Yup.ObjectSchema<UpdateProfileValues> = Yup.object().shape({
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  email: Yup.string().email("Invalid email").optional(),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid").optional(),
});

export const withdrawalInfoSchema: Yup.ObjectSchema<WithdrawalInfoValues> = Yup.object().shape({
  bank: Yup.string().required("Bank is required"),
  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^\d{10}$/, "Account number must be exactly 10 digits"),
  accountName: Yup.string().required("Account name is required"),
});
