import type { Request, Response, NextFunction } from 'express';
import { ZodObject<any, any>, ZodError } from 'zod';

export const validate = (schema: ZodObject<any, any>) => 
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
        // We use e.flatten() or check e.issues to be safer
        return res.status(400).json({
          status: "fail",
          errors: e.issues.map((issue) => ({
            field: issue.path[1], // This gets 'title'
            message: issue.message
          }))
        });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  };