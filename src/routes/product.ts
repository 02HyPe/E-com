import express from "express";
import { createProduct } from "../controllers/products";
import { auth } from "../middlewares/auth";

const route = express.Router();

route.post("/addproduct", auth, createProduct);

export default route;
