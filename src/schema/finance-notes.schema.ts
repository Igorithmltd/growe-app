import * as Yup from "yup";

export interface CreateNoteValues {
  title: string;
  amount?: number;
  category?: string;
  description: string;
}

export const createNoteSchema: Yup.ObjectSchema<CreateNoteValues> = Yup.object({
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .transform((value, originalValue) => (String(originalValue).trim() === "" ? undefined : value))
    .optional(),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});
