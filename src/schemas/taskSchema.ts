import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, "Title is required") // This replaces required_error and is more reliable
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title is too long (max 100 chars)"),
  }),
});