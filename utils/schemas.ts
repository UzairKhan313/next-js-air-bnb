import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  // firstName:z.string().max(5,{message:"max length is 5."})
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "last name must be at least 3 characters long" }),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}
