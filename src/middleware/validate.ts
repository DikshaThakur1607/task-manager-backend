import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod'; // Import 'z' instead of ZodSchema

// Use z.ZodTypeAny to be perfectly safe and non-deprecated
export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e: any) {
    if (e instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        errors: e.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message
        }))
      });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};