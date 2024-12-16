import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { errorHandler } from "./utils/errorHandler";
import userRoutes from "./routes/user";
import paymentRoutes from "./routes/payment";
import productRoutes from "./routes/product";

const app = express();

app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`error with connecting db :-${error}`);
    return;
  }
})();

app.use("/product", productRoutes);
app.use("/payment", paymentRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);
