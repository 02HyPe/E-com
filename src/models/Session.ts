import mongoose from "mongoose";

export interface Session {
  user?: mongoose.Types.ObjectId;
  refreshToken: string;
  createdAt?: Date;
}

export const SessionSchema = new mongoose.Schema<Session>({
  user: { type: String, ref: "users", required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});
