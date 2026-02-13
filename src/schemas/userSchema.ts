import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    email: z.string()
      .min(1, "Email is required") // Replaces required_error
      .email("Invalid email format"),
    password: z.string()
      .min(1, "Password is required") // Replaces required_error
      .min(6, "Password must be at least 6 characters long"),
  }),
});