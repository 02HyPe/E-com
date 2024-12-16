import mongoose from "mongoose";

export interface Product {
  productName: string;
  price: number;
  stock: number;
  __v: number;
}

export const ProductSchema = new mongoose.Schema<Product>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
