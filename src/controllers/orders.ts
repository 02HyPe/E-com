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
    const { products, purchasedAt, status } = req.body;
    const email = req.email;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw next(new ErrorResponse(500, "error with user"));
    }
    const productDtls = await ProductModel.find({ $in: products });
    // let productDtls: object[] = [];
    // products.forEach(async (product) => {
    //   const productInfo = await ProductModel.findOne({ _id: product });
    //   if (!productInfo) {
    //     throw next(new ErrorResponse(404, "product availability error"));
    //   }
    //   productDtls.push({ productInfo });
    // });
    const orders = new OrderModel({
      products: productDtls,
    });
    console.log(productDtls);
  }
);
