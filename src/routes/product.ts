import express from "express";
import { createProduct, updateProduct } from "../controllers/products";
import { auth } from "../middlewares/auth";

const route = express.Router();

route.post("/addproduct", auth, createProduct);
route.put("/updateproduct", auth, updateProduct);

export default route;
