import * as Yup from "yup";
import { phoneRegExp } from "../utils/helpers";

export const bvnSchema = Yup.object().shape({
  bvn: Yup.string()
    .required("BVN is required")
    .min(11, "BVN must be 11 digits")
    .max(11, "BVN must be 11 digits"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits"),
});

export const ninSchema = Yup.object().shape({
  nin: Yup.string()
    .required("NIN is required")
    .min(11, "NIN must be 11 digits")
    .max(11, "NIN must be 11 digits"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits"),
});

export type BVNFormValues = Yup.InferType<typeof bvnSchema>;
export type NINFormValues = Yup.InferType<typeof ninSchema>;
