import z from "zod";

export const createProductSchema = z.object({
  productName: z.string(),
  price: z.number(),
  stock: z.number(),
});

export type createProductType = z.infer<typeof createProductSchema>;
