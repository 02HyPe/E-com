import { Request, Response, NextFunction } from "express";
import { UserModel, SessionModel } from "../configs/mongoose.models";
import { asyncHandler } from "../middlewares/wrapper/asyncHandler";
import { ErrorResponse } from "../utils/errorHandler";
import { signUpType, signInType } from "../schema/userSchema";
import mongoose from "mongoose";
import { hash, genSalt, compare } from "bcryptjs";
import {
  accessTokenGen,
  refreshTokenGen,
  accessAndRefreshTokenGen,
} from "../utils/tokenGenerator";
import { decode, JwtPayload } from "jsonwebtoken";

export const signUp = asyncHandler(
  async (
    req: Request<{}, {}, signUpType>,
    res: Response,
    next: NextFunction
  ) => {
    const { firstName, lastName, email, password, role } = req.body;
    const alreadyExisted = await UserModel.findOne({ email: email });
    if (alreadyExisted?.email) {
      throw next(new ErrorResponse(409, "user already registered"));
    }
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    let accessToken, refreshToken;
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const userInfo = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: role,
      });
      await userInfo.save({ session });
      const tokens = accessAndRefreshTokenGen(firstName, lastName, email, role);
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      const sessionInfo = new SessionModel({
        user: userInfo._id,
        refreshToken: refreshToken,
      });
      await sessionInfo.save({ session });
    });
    res
      .cookie("accessToken", `Bearer ${accessToken}`)
      .cookie("refreshToken", `Bearer ${refreshToken}`)
      .json({ msg: "signup done" });
  }
);

export const signIn = asyncHandler(
  async (
    req: Request<{}, {}, signInType>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    let accessToken: string, refreshToken: string;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw next(new ErrorResponse(404, "user not found"));
    }
    const doMatch = await compare(password, user.password);
    if (!doMatch) {
      throw next(new ErrorResponse(401, "invalid credentials"));
    }
    const tokens = accessAndRefreshTokenGen(
      user.firstName,
      user.lastName,
      user.email,
      user.role
    );
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
    const sessionInfo = new SessionModel({
      user: user._id,
      refreshToken: refreshToken,
    });
    await sessionInfo.save();
    res
      .cookie("accessToken", `Bearer ${accessToken}`)
      .cookie("refreshToken", `Bearer ${refreshToken}`)
      .json({ msg: "signin successfully" });
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const token = refreshToken.split(` `)[1];
    const session = await SessionModel.findOne({ refreshToken: token });
    if (!session) {
      throw next(new ErrorResponse(401, "login expired"));
    }
    const { firstName, lastName, email, role } = decode(token) as JwtPayload;
    const newAccessToken = accessTokenGen(firstName, lastName, email, role);
    res
      .cookie("accessToken", `Bearer ${newAccessToken}`)
      .json({ msg: "access token refreshed" });
  }
);
