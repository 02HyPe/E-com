import express from "express";
import { auth } from "../middlewares/auth";
import { createOrder } from "../controllers/orders";
import { validateData } from "../middlewares/validator/validateData";
import { createOrderSchema } from "../schema/orderSchema";

const route = express.Router();

route.post("/createorder", auth, validateData(createOrderSchema), createOrder);

export default route;
