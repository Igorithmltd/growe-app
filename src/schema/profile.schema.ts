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
  otp: string
}

export interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
  otp: Yup.string().required("OTP is required"),
});

export const changePasswordSchema: Yup.ObjectSchema<ChangePasswordValues> = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
