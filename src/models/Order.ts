import mongoose from "mongoose";

export interface Order {
  user: mongoose.Types.ObjectId;
  products: object[];
  purchasedAt: Date;
  status: string;
  deliveredAt: Date;
  __v: number;
}

export const OrderSchema = new mongoose.Schema<Order>({
  products: { type: [Object], required: true },
  purchasedAt: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Placed"],
    required: true,
    default: "Pending",
  },
  deliveredAt: { type: Date, required: false },
});
