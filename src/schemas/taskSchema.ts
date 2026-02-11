import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title is too long (max 100 chars)"),
  }),
});