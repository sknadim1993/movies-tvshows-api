import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors?.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync(req.query);
      req.query = validated as any;
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors?.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  };
};
