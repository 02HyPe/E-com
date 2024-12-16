import { NextFunction, Request, Response } from "express";

export class ErrorResponse extends Error {
  constructor(private statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  error = new ErrorResponse(error.statusCode, error.message);
  res.status(error.statusCode || 500).json({
    error: {
      statusCode: error.statusCode,
      message: error.message,
    },
  });
};
