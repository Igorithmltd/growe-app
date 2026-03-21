import * as Yup from "yup";

export const bvnSchema = Yup.object().shape({
  bvn: Yup.string()
    .required("BVN is required")
    .min(11, "BVN must be 11 digits")
    .max(11, "BVN must be 11 digits"),
});

export const ninSchema = Yup.object().shape({
  nin: Yup.string()
    .required("NIN is required")
    .min(11, "NIN must be 11 digits")
    .max(11, "NIN must be 11 digits"),
});

export type BVNFormValues = Yup.InferType<typeof bvnSchema>;
export type NINFormValues = Yup.InferType<typeof ninSchema>;
