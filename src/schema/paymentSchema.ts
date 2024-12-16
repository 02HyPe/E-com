import { z } from "zod";

export const paymentSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type paymentType = z.infer<typeof paymentSchema>;
