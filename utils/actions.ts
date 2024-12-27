"use server";
import { profileSchema } from "./schemas";

export const createProfileAction = async (
  _prevState: any,
  formData: FormData
) => {
  try {
    const rowData = Object.fromEntries(formData);
    const validateFields = profileSchema.parse(rowData);
    console.log(validateFields);
    return { message: "Profile created" };
  } catch (error: any) {
    return { message: "there was an Error" };
  }
};
