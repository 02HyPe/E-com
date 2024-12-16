import mongoose from "mongoose";
import { User, UserSchema } from "../models/User";
import { Session, SessionSchema } from "../models/Session";
import { Order, OrderSchema } from "../models/Order";
import { Product, ProductSchema } from "../models/Product";

export const UserModel = mongoose.model<User>("users", UserSchema, "users");
export const SessionModel = mongoose.model<Session>(
  "sessions",
  SessionSchema,
  "sessions"
);
export const OrderModel = mongoose.model<Order>(
  "orders",
  OrderSchema,
  "orders"
);
export const ProductModel = mongoose.model<Product>(
  "products",
  ProductSchema,
  "products"
);
