import type { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod'; // Use AnyZodObject instead

export const validate = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: e.issues.map((issue) => ({
            // If path[1] is undefined, we fall back to the first path item
            field: issue.path[1] || issue.path[0], 
            message: issue.message
          }))
        });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  };