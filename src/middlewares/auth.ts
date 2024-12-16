import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorHandler";
import { asyncHandler } from "./wrapper/asyncHandler";

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw next(new ErrorResponse(401, "token not found"));
    }
    const token = accessToken.split(` `)[1];
    const verifiedToken = verify(
      token,
      process.env.ACCESS_JWT_KEY
    ) as JwtPayload;
    req.email = verifiedToken.email;
    req.role = verifiedToken.role;
    next();
  }
);
