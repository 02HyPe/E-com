import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../configs/mongoose.models";
import { asyncHandler } from "../middlewares/wrapper/asyncHandler";
import { createProductType, updateProductType } from "../schema/productSchema";
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

export const updateProduct = asyncHandler(
  async (
    req: Request<{}, {}, updateProductType>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.role !== "Admin") {
      throw next(new ErrorResponse(401, "not authorized"));
    }
    const { product_id, productName, price, stock } = req.body;
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: product_id },
      { productName: productName, price: price, stock: stock, $inc: { __v: 1 } }
    );
    if (!updatedProduct) {
      throw next(new ErrorResponse(500, "server Error"));
    }
    res.json({ msg: "product updated" });
  }
);
