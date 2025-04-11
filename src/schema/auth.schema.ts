import * as Yup from "yup";

export interface VerifyFormValue {
  email: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export const verifySchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email or phone number is required"),
  password: Yup.string().required("Password is required"),
});
