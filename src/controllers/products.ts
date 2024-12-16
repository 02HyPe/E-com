import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../configs/mongoose.models";
import { asyncHandler } from "../middlewares/wrapper/asyncHandler";
import { createProductType } from "../schema/product";
import { ErrorResponse } from "../utils/errorHandler";

export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, createProductType>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.role !== "Admin") {
      throw next(new ErrorResponse(401, "not authorized"));
    }
    const { productName, price, stock } = req.body;
    const product = new ProductModel({
      productName: productName,
      price: price,
      stock: stock,
    });
    await product.save();
    res.json({ msg: "product created" });
  }
);
