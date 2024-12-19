import express from "express";
import { auth } from "../middlewares/auth";
import { createOrder, paymentUpdate } from "../controllers/orders";
import { validateData } from "../middlewares/validator/validateData";
import { createOrderSchema } from "../schema/orderSchema";

const route = express.Router();

route.post("/createorder", auth, validateData(createOrderSchema), createOrder);
route.post(
  "/paymentupdate",
  express.raw({ type: "application/json" }),
  paymentUpdate
);

export default route;
