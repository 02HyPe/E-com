import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../wrapper/asyncHandler";
import { z } from "zod";

export const validateData = (schema: z.ZodObject<any, any>) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      schema.parse(req.body);
      next();
    }
  );
};
