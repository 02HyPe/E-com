import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["Admin", "Customer"]),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const tokenSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(["Admin", "Customer"]),
});

export type signUpType = z.infer<typeof signUpSchema>;
export type signInType = z.infer<typeof signInSchema>;
export type tokenType = z.infer<typeof tokenSchema>;
