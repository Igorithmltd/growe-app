import * as Yup from "yup";
import { phoneRegExp } from "../utils/helpers";

export interface UpdateProfileValues {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export const updateProfileSchema: Yup.ObjectSchema<UpdateProfileValues> = Yup.object().shape({
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  email: Yup.string().email("Invalid email").optional(),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid").optional(),
});
