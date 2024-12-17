import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/wrapper/asyncHandler";
import { createOrderType } from "../schema/orderSchema";
import {
  OrderModel,
  ProductModel,
  UserModel,
} from "../configs/mongoose.models";
import { ErrorResponse } from "../utils/errorHandler";

export const createOrder = asyncHandler(
  async (
    req: Request<{}, {}, createOrderType>,
    res: Response,
    next: NextFunction
  ) => {
    const { products } = req.body;
    const email = req.email;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw next(new ErrorResponse(500, "error with user"));
    }
    const productDtls = await ProductModel.find({ _id: { $in: products } });
    const orders = new OrderModel({
      user: user._id,
      products: productDtls,
    });
    await orders.save();
    console.log(productDtls);

    res.json({ msg: " order created " });
  }
);
