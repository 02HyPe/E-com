import mongoose from "mongoose";
import { number } from "zod";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

export const UserSchema = new mongoose.Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["Admin", "Customer"] },
  __v: { type: Number, required: true, default: 0 },
});

UserSchema.virtual("userName").get(function () {
  return this.firstName + " " + this.lastName;
});
