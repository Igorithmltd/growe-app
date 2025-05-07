import * as Yup from "yup";
import { phoneRegExp } from "../utils/helpers";

export const verifySchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
});
export const otpSchema = Yup.object().shape({
  code: Yup.string()
    .required("OTP is required")
    .matches(/^\d+$/, "OTP must be numeric")
    .length(6, "OTP must be exactly 6 digits"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export type VerifyFormValue = Yup.InferType<typeof verifySchema>;
export type LoginFormValues = Yup.InferType<typeof loginSchema>;
export type OtpFormValues = Yup.InferType<typeof otpSchema>;

export interface SignupFormValues {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  referral_code?: string;
}

export interface ResetFormValues {
  email?: string;
  password: string;
  confirmPassword: string;
}

export const resetSchema: Yup.ObjectSchema<ResetFormValues> = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  email: Yup.string().optional(),
});

export const signupSchema: Yup.ObjectSchema<SignupFormValues> = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(8, "Username must be at least 8 characters"),
  phone_number: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11)
    .max(11),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  referral_code: Yup.string().optional(),
  email: Yup.string().email().required("Email is required"),
});
