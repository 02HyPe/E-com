import express from "express";
import {
  paymentGateway,
  paymentCancel,
  paymentSuccess,
} from "../controllers/payment";
import { auth } from "../middlewares/auth";

const route = express.Router();

route.post("/paymentgateway", auth, paymentGateway);
route.get("/success", auth, paymentSuccess);
route.get("/cancel", auth, paymentCancel);

export default route;
