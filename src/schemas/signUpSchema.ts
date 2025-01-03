import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(5, { message: "atleast 5 charaters should be given" })
  .max(20, { message: "Maximum limit is 20 Characters" })
  .regex(/^[a-zA-Z0-9_]+$/);

const passwordValidation = z
  .string()
  .min(8, { message: "atleast 8 characters needed" })
  .max(12, { message: "Maximum 12 characters allowed" })
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must include at least one letter, one number, and one special character"
  );
 const emailSchema = z
  .string()
  .email("Invalid email format")
  .regex(
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|protonmail\.com|icloud\.com)$/,
    "Email must be from a common provider (e.g., Gmail, Yahoo, Outlook, AppleMail, ProtonMail etc.)"
  );
export const signUpSchema = z.object({
  username: userNameValidation,
  email: emailSchema,
  password: passwordValidation,
});
