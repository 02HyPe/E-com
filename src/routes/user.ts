import express from "express";
import { refreshAccessToken, signIn, signUp } from "../controllers/user";
import { validateData } from "../middlewares/validator/validateData";
import { auth } from "../middlewares/auth";
import { signUpSchema, signInSchema } from "../schema/userSchema";

const route = express.Router();
route.post("/signup", validateData(signUpSchema), signUp);
route.get("/signin", validateData(signInSchema), signIn);
route.get("/refreshaccesstoken", refreshAccessToken);

export default route;
